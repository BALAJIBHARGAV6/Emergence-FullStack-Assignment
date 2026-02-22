import logging
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete

from db.database import get_db
from db.models import ChatSession, ChatMessage
from schemas.chat_schema import ChatRequest, ChatResponse
from services.ai_service import get_ai_response

logger = logging.getLogger(__name__)
router = APIRouter()


async def _ensure_session(session_id: str, db: AsyncSession) -> None:
    """Create session if it doesn't exist."""
    result = await db.execute(
        select(ChatSession).where(ChatSession.id == session_id)
    )
    if result.scalar_one_or_none() is None:
        db.add(ChatSession(id=session_id))
        await db.commit()


@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest, db: AsyncSession = Depends(get_db)):
    """Process a chat message and return AI response."""
    await _ensure_session(request.session_id, db)

    # Fetch last 10 messages for context
    result = await db.execute(
        select(ChatMessage)
        .where(ChatMessage.session_id == request.session_id)
        .order_by(ChatMessage.created_at.desc())
        .limit(10)
    )
    history_rows = list(reversed(result.scalars().all()))
    history = [{"role": row.role, "content": row.content} for row in history_rows]

    # Get AI response
    ai_response = await get_ai_response(request.message, history)

    # Save both messages
    db.add(ChatMessage(
        session_id=request.session_id,
        role="user",
        content=request.message,
    ))
    db.add(ChatMessage(
        session_id=request.session_id,
        role="assistant",
        content=ai_response,
    ))
    await db.commit()

    return ChatResponse(response=ai_response, session_id=request.session_id)


@router.get("/chat/history/{session_id}")
async def get_history(session_id: str, db: AsyncSession = Depends(get_db)):
    """Get all messages for a session."""
    result = await db.execute(
        select(ChatMessage)
        .where(ChatMessage.session_id == session_id)
        .order_by(ChatMessage.created_at.asc())
    )
    messages = result.scalars().all()
    return [
        {
            "id": msg.id,
            "role": msg.role,
            "content": msg.content,
            "created_at": msg.created_at.isoformat() if msg.created_at else None,
        }
        for msg in messages
    ]


@router.delete("/chat/history/{session_id}")
async def clear_history(session_id: str, db: AsyncSession = Depends(get_db)):
    """Clear all messages for a session."""
    await db.execute(
        delete(ChatMessage).where(ChatMessage.session_id == session_id)
    )
    await db.execute(
        delete(ChatSession).where(ChatSession.id == session_id)
    )
    await db.commit()
    return {"status": "cleared", "session_id": session_id}

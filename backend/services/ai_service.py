import os
import logging
import asyncio
from typing import Optional

import httpx
from dotenv import load_dotenv

from utils.prompts import build_system_prompt

load_dotenv()
logger = logging.getLogger(__name__)

GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")
GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"

# Groq free models ordered by preference
MODELS = [
    "llama-3.3-70b-versatile",
    "llama-3.1-8b-instant",
    "gemma2-9b-it",
    "mixtral-8x7b-32768",
]

SYSTEM_PROMPT = build_system_prompt()


async def get_ai_response(
    user_message: str,
    history: list[dict[str, str]],
) -> str:
    """Call Groq API with model fallback chain."""
    messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    messages.extend(history)
    messages.append({"role": "user", "content": user_message})

    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json",
    }

    for model in MODELS:
        response = await _try_model(model, messages, headers)
        if response is not None:
            return response

    return "I'm having trouble connecting right now. Please use the contact form to reach out directly!"


async def _try_model(
    model: str,
    messages: list[dict[str, str]],
    headers: dict[str, str],
    retries: int = 1,
) -> Optional[str]:
    """Attempt a model with retry logic."""
    payload = {
        "model": model,
        "messages": messages,
        "temperature": 0.7,
        "max_tokens": 500,
    }

    for attempt in range(retries + 1):
        try:
            async with httpx.AsyncClient(timeout=30.0) as client:
                resp = await client.post(
                    GROQ_API_URL,
                    json=payload,
                    headers=headers,
                )

                if resp.status_code == 200:
                    data = resp.json()
                    content = data["choices"][0]["message"]["content"]
                    logger.info(f"Success with model: {model}")
                    return content.strip()

                if resp.status_code == 429:
                    logger.warning(f"Rate limited on {model}, attempt {attempt + 1}")
                    if attempt < retries:
                        await asyncio.sleep(1)
                        continue
                    return None

                logger.warning(f"Model {model} returned {resp.status_code}: {resp.text[:200]}")
                return None

        except httpx.TimeoutException:
            logger.warning(f"Timeout on {model}, attempt {attempt + 1}")
            if attempt < retries:
                await asyncio.sleep(1)
                continue
        except Exception as e:
            logger.error(f"Error with model {model}: {e}")
            return None

    return None

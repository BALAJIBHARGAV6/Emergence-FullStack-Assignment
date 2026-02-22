import { create } from 'zustand';
import axios from 'axios';
import { siteConfig } from '../config/site';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatState {
  isOpen: boolean;
  messages: ChatMessage[];
  isLoading: boolean;
  sessionId: string;
  error: string | null;
  toggleChat: () => void;
  openChat: () => void;
  closeChat: () => void;
  sendMessage: (content: string) => Promise<void>;
  clearChat: () => void;
  addGreeting: () => void;
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function generateSessionId(): string {
  return crypto.randomUUID ? crypto.randomUUID() : generateId();
}

export const useChatStore = create<ChatState>((set, get) => ({
  isOpen: false,
  messages: [],
  isLoading: false,
  sessionId: generateSessionId(),
  error: null,

  toggleChat: () => {
    const { isOpen, messages } = get();
    if (!isOpen && messages.length === 0) {
      get().addGreeting();
    }
    set({ isOpen: !isOpen });
  },

  openChat: () => {
    const { messages } = get();
    if (messages.length === 0) {
      get().addGreeting();
    }
    set({ isOpen: true });
  },

  closeChat: () => set({ isOpen: false }),

  addGreeting: () => {
    const greetingMessage: ChatMessage = {
      id: generateId(),
      role: 'assistant',
      content: `Hi! I'm Balaji Bhargav's AI assistant. Ask me anything about his skills, experience, or projects! 👋`,
      timestamp: new Date(),
    };
    set({ messages: [greetingMessage] });
  },

  sendMessage: async (content: string) => {
    const { sessionId, messages } = get();

    const userMessage: ChatMessage = {
      id: generateId(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    set({
      messages: [...messages, userMessage],
      isLoading: true,
      error: null,
    });

    try {
      const response = await axios.post(`${siteConfig.apiUrl}/chat`, {
        message: content,
        session_id: sessionId,
      });

      const assistantMessage: ChatMessage = {
        id: generateId(),
        role: 'assistant',
        content: response.data.response,
        timestamp: new Date(),
      };

      set((state) => ({
        messages: [...state.messages, assistantMessage],
        isLoading: false,
      }));
    } catch {
      const errorMessage: ChatMessage = {
        id: generateId(),
        role: 'assistant',
        content: `I'm having trouble connecting right now. Please try again or contact ${siteConfig.name} directly at ${siteConfig.email}.`,
        timestamp: new Date(),
      };

      set((state) => ({
        messages: [...state.messages, errorMessage],
        isLoading: false,
        error: 'Failed to get response',
      }));
    }
  },

  clearChat: () => {
    const sessionId = get().sessionId;
    axios
      .delete(`${siteConfig.apiUrl}/chat/history/${sessionId}`)
      .catch(() => {});
    set({
      messages: [],
      sessionId: generateSessionId(),
      error: null,
    });
  },
}));

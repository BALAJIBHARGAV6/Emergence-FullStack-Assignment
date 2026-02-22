import { useState, useRef, useEffect, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Send } from 'lucide-react';
import { useChatStore } from '../../store/chatStore';
import { siteConfig } from '../../config/site';
import { isWebGLAvailable } from '../three/WebGLErrorBoundary';

function ChatButtonIconFallback() {
  return (
    <div className="relative w-7 h-7 flex items-center justify-center">
      {/* Animated AI brain/sparkle icon */}
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        {/* Chat bubble */}
        <path
          d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="rgba(255,255,255,0.15)"
        />
        {/* AI sparkle dots */}
        <circle cx="9" cy="12" r="1.2" fill="white" className="animate-pulse" />
        <circle cx="12" cy="12" r="1.2" fill="white" className="animate-pulse" style={{ animationDelay: '0.2s' }} />
        <circle cx="15" cy="12" r="1.2" fill="white" className="animate-pulse" style={{ animationDelay: '0.4s' }} />
      </svg>
    </div>
  );
}

const ChatButtonIcon = lazy(() =>
  import('../three/ChatButtonIcon').then((m) => ({
    default: m.ChatButtonIcon,
  }))
);

const suggestedQuestions = [
  "What's your tech stack?",
  'Tell me about your experience',
  'What projects have you built?',
  'Are you available for hire?',
];

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 bg-primary/40 rounded-full"
          animate={{ y: [0, -6, 0] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.15,
          }}
        />
      ))}
    </div>
  );
}

export function ChatWidget() {
  const {
    isOpen,
    messages,
    isLoading,
    toggleChat,
    closeChat,
    sendMessage,
    clearChat,
  } = useChatStore();

  const [input, setInput] = useState('');
  const [buttonHovered, setButtonHovered] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSend = () => {
    const text = input.trim();
    if (!text || isLoading) return;
    setInput('');
    sendMessage(text);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestion = (q: string) => {
    sendMessage(q);
  };

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleChat}
            onMouseEnter={() => setButtonHovered(true)}
            onMouseLeave={() => setButtonHovered(false)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-blue-lg"
            aria-label="Open AI Chat"
          >
            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-full animate-ping border-2 border-primary/20" />
            {/* Online dot */}
            <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-accent-green rounded-full border-2 border-white" />
            {isWebGLAvailable() ? (
              <Suspense fallback={<ChatButtonIconFallback />}>
                <ChatButtonIcon hovered={buttonHovered} />
              </Suspense>
            ) : (
              <ChatButtonIconFallback />
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed bottom-6 right-6 z-50 w-[380px] h-[520px] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-4rem)] flex flex-col bg-white rounded-2xl shadow-2xl border border-border overflow-hidden"
            role="dialog"
            aria-label="AI Chat Assistant"
          >
            {/* Header */}
            <div className="bg-primary px-5 py-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold text-white">
                  AI
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">
                    Chat with {siteConfig.name}&apos;s Resume
                  </h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-green" />
                    <span className="text-[10px] text-white/70">Online</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={clearChat}
                  className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                  aria-label="Clear chat"
                  title="Clear chat"
                >
                  <Trash2 size={16} className="text-white/70" />
                </button>
                <button
                  onClick={closeChat}
                  className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                  aria-label="Close chat"
                >
                  <X size={18} className="text-white" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50/50">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{
                    opacity: 0,
                    x: msg.role === 'assistant' ? -20 : 20,
                  }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${
                    msg.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-primary text-white rounded-br-md'
                        : 'bg-accent-green-light text-text-primary rounded-bl-md border border-accent-green/10'
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {/* Suggested Questions (show after greeting only) */}
              {messages.length === 1 &&
                messages[0].role === 'assistant' &&
                !isLoading && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {suggestedQuestions.map((q) => (
                      <button
                        key={q}
                        onClick={() => handleSuggestion(q)}
                        className="px-3 py-1.5 bg-white border border-border rounded-full text-xs font-medium text-text-secondary hover:border-primary hover:text-primary transition-all"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                )}

              {/* Typing Indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-accent-green-light rounded-2xl rounded-bl-md border border-accent-green/10">
                    <TypingIndicator />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-border bg-white shrink-0">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything about my experience..."
                  disabled={isLoading}
                  className="flex-1 px-4 py-2.5 bg-gray-50 border border-border rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all disabled:opacity-50"
                  aria-label="Chat message input"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="p-2.5 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label="Send message"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

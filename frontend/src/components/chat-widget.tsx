"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { siteConfig, suggestedPrompts } from "@/data/site-config";
import { sendChatMessage } from "@/services/chatApi";
import { ChatInput } from "./chat-input";
import { ChatMessage, type ChatMessageData } from "./chat-message";
import { Magnetic } from "./magnetic";

const GREETING: ChatMessageData = {
  id: "greeting",
  role: "assistant",
  content: `Hi! I'm ${siteConfig.name}'s AI portfolio assistant. Ask me about their background, skills, projects, or experience.`,
};

const FALLBACK_REPLY =
  "I couldn't reach the assistant just now. Please try again shortly, or use the contact section below.";

function createId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessageData[]>([GREETING]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, loading, open]);

  const handleSend = async (content: string) => {
    setMessages((prev) => [
      ...prev,
      { id: createId(), role: "user", content },
    ]);
    setLoading(true);

    try {
      const reply = await sendChatMessage(content);
      setMessages((prev) => [
        ...prev,
        { id: createId(), role: "assistant", content: reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: createId(), role: "assistant", content: FALLBACK_REPLY },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const showSuggestions = messages.length === 1 && !loading;

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-24 right-6 z-50 flex h-[32rem] w-[22rem] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-3xl border border-border bg-background shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <div>
                <p className="text-sm font-medium text-foreground">
                  Portfolio Assistant
                </p>
                <p className="text-xs text-muted">Ask me anything</p>
              </div>
              <button
                type="button"
                aria-label="Close chat"
                onClick={() => setOpen(false)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-foreground/60 transition-colors hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1 rounded-2xl border border-border bg-card px-4 py-3">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted [animation-delay:-0.3s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted [animation-delay:-0.15s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted" />
                  </div>
                </div>
              )}

              {showSuggestions && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {suggestedPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => handleSend(prompt)}
                      className="rounded-full border border-border px-3 py-1.5 text-left text-xs text-foreground/70 transition-colors hover:border-accent hover:text-accent"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            <ChatInput onSend={handleSend} disabled={loading} />
          </motion.div>
        )}
      </AnimatePresence>

      <Magnetic strength={0.3} className="fixed bottom-6 right-6 z-50">
        <motion.button
          type="button"
          aria-label={open ? "Close chat" : "Open chat"}
          onClick={() => setOpen((v) => !v)}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.6, ease: "backOut" }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          className="relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-xl"
        >
          {!open && (
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/50" />
          )}
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={open ? "close" : "chat"}
              initial={{ opacity: 0, rotate: -45, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 45, scale: 0.5 }}
              transition={{ duration: 0.2 }}
              className="relative flex"
            >
              {open ? (
                <X className="h-5 w-5" />
              ) : (
                <MessageCircle className="h-5 w-5" />
              )}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </Magnetic>
    </>
  );
}

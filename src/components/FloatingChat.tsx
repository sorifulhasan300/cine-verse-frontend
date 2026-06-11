/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Send, X, Loader2, Film, Sparkles, Bot } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "@tanstack/react-form";
import { cn } from "@/lib/utils";

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<
    Array<{ role: string; content: string }>
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const form = useForm({
    defaultValues: {
      message: "",
    },
    onSubmit: async ({ value }) => {
      const userMessage = value.message.trim();
      if (!userMessage) return;

      setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
      setIsLoading(true);

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/chat`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              messages: [...messages, { role: "user", content: userMessage }],
            }),
          }
        );

        if (!res.ok) throw new Error("Failed to send message");

        const data = await res.text();
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data },
        ]);
      } catch (error) {
        console.error("Chat error:", error);
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "Sorry, I encountered an error." },
        ]);
      } finally {
        setIsLoading(false);
        form.reset();
      }
    },
  });

  // Automatically scroll to bottom when messages or loading state change
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <>
      {/* ── Floating Action Trigger Button ── */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="icon"
          className="h-14 w-14 rounded-full bg-red-600 hover:bg-red-700 shadow-2xl transition-colors duration-150 border border-red-500/20"
        >
          {isOpen ? <X className="h-5 w-5 text-white" /> : <Bot className="h-6 w-6" />}
        </Button>
      </motion.div>

      {/* ── Chat Window Box ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="fixed bottom-24 right-6 z-50 w-[360px] h-[520px] bg-[#11111c] border border-slate-800 rounded-xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header Area */}
            <div className="p-4 bg-[#0d0d1a] border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 bg-red-600 rounded-md flex items-center justify-center flex-shrink-0">
                  <Film className="w-3.5 h-3.5 text-white" />
                </div>
                <div>
                  <p className="text-[14px] font-medium text-white leading-none">CineVerse AI</p>
                  <p className="text-[9px] text-slate-500 tracking-[1px] uppercase mt-0.5">
                    Cinematic Assistant
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-500 hover:text-slate-300 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Body Window Space */}
            <div className="relative flex-1 overflow-y-auto p-4 space-y-4 bg-[#11111c]">

              {/* Central Background Watermark Logo Layout */}
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-[0.02] pointer-events-none select-none z-0">
                <Film className="w-40 h-40 text-white mb-2" />
                <span className="text-2xl font-bold tracking-[6px] text-white uppercase">CineVerse</span>
              </div>

              {/* Messages Map Render */}
              <div className="relative z-10 space-y-4">
                {messages.length === 0 && (
                  <div className="text-center pt-8 px-4 pointer-events-none">
                    <Sparkles className="w-5 h-5 text-red-500/40 mx-auto mb-2" />
                    <p className="text-[13px] text-slate-600">
                      Welcome to CineVerse! Ask me anything about movies, actors, directors, or showtimes.
                    </p>
                  </div>
                )}

                {messages.map((m, index) => (
                  <div
                    key={index}
                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={cn(
                        "max-w-[85%] p-3 rounded-xl text-[13px] leading-relaxed shadow-sm break-words",
                        m.role === "user"
                          ? "bg-red-600 text-white rounded-tr-none"
                          : "bg-[#0d0d1a] border border-slate-800 text-slate-300 rounded-tl-none"
                      )}
                    >
                      {m.content}
                    </div>
                  </div>
                ))}

                {/* AI Processing Bubble Loader */}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="p-3 rounded-xl rounded-tl-none bg-[#0d0d1a] border border-slate-800 text-slate-500">
                      <Loader2 className="h-4 w-4 animate-spin text-red-500" />
                    </div>
                  </div>
                )}

                {/* Scroll Target Element */}
                <div ref={messagesContainerRef} />
              </div>
            </div>

            {/* Bottom Form Control Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
              }}
              className="p-3 bg-[#0d0d1a] border-t border-slate-800"
            >
              <form.Field name="message">
                {({ state, handleChange, handleBlur }) => (
                  <div className="relative flex items-center">
                    <Input
                      value={state.value}
                      onChange={(e) => handleChange(e.target.value)}
                      onBlur={handleBlur}
                      placeholder="Ask CineVerse..."
                      className="w-full pl-3 pr-10 py-5 bg-[#11111c] border-slate-800 text-slate-300 placeholder-slate-700 text-[13px] focus:border-red-600 focus-visible:ring-0 rounded-lg"
                      disabled={isLoading}
                    />
                    <button
                      type="submit"
                      className="absolute right-2.5 p-1.5 text-slate-500 hover:text-red-500 disabled:opacity-40 transition-colors duration-150"
                      disabled={isLoading || !state.value.trim()}
                    >
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                )}
              </form.Field>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
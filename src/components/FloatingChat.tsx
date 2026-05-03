/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, X, Loader2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "@tanstack/react-form";

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<
    Array<{ role: string; content: string }>
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
          },
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

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="icon"
          className="h-14 w-14 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 shadow-2xl"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
        </Button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 right-6 z-50 w-[350px] h-[500px] bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl flex flex-col"
          >
            <div className="p-4 bg-zinc-900 border-b border-zinc-800 flex items-center gap-3">
              <Bot className="h-5 w-5 text-purple-400" />
              <h3 className="text-sm font-bold text-zinc-100">CineVerse AI</h3>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((m, index) => (
                <div
                  key={index}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`p-3 text-white rounded-2xl text-sm ${m.role === "user" ? "bg-purple-600" : "bg-zinc-900"}`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="p-3 rounded-2xl text-sm bg-zinc-900">
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
              }}
              className="p-4 bg-zinc-900/50"
            >
              <form.Field name="message">
                {({ state, handleChange, handleBlur }) => (
                  <div className="relative">
                    <Input
                      value={state.value}
                      onChange={(e) => handleChange(e.target.value)}
                      onBlur={handleBlur}
                      placeholder="Ask CineVerse..."
                      className="bg-zinc-950 border-zinc-800 text-white"
                      disabled={isLoading}
                    />
                    <button
                      type="submit"
                      className="absolute right-2 top-2 text-purple-500"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <Send className="h-5 w-5" />
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

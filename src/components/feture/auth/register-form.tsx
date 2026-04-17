"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Eye, EyeOff, Film } from "lucide-react";
import { POSTER_COLORS, POSTER_TITLES } from "@/components/style/style";
import Link from "next/link";
import { registerSchema } from "@/zod/auth.validation";

type RegisterValues = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  async function onSubmit(values: RegisterValues) {
    try {
      console.log("Form Values:", values);
      toast.success("Welcome to the Verse!");
    } catch {
      toast.error("Something went wrong.");
    }
  }

  return (
    <div className="flex min-h-screen bg-[#080810] text-slate-200 overflow-hidden font-sans">
      {/* --- LEFT PANEL (Desktop Only) --- */}
      <div className="hidden lg:block relative w-1/2 overflow-hidden border-r border-white/5">
        {/* Poster Grid */}
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-4 gap-1 transform -rotate-6 scale-125 -translate-y-4">
          {POSTER_COLORS.map(([from, to], i) => (
            <div
              key={i}
              className={`relative rounded bg-gradient-to-br ${from} ${to} flex flex-col items-center justify-end pb-4 border border-white/5 overflow-hidden`}
            >
              <div className="w-7 h-[2px] bg-white/20 rounded mb-2" />
              <span className="text-[10px] tracking-[3px] text-white/30 font-bold">
                {POSTER_TITLES[i]}
              </span>
              <div className="absolute inset-0 bg-[repeating-linear-gradient(180deg,transparent,transparent_3px,rgba(0,0,0,0.1)_3px,rgba(0,0,0,0.1)_4px)] pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#080810]/40 to-[#080810]" />

        {/* Content */}
        <div className="absolute inset-0 p-12 flex flex-col justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-red-600 to-red-900 rounded-lg shadow-[0_0_20px_rgba(220,38,38,0.5)]">
              <Film size={24} className="text-white" />
            </div>
            <span className="text-2xl font-bold tracking-[4px] text-white uppercase">
              CineVerse
            </span>
          </div>

          <div className="max-w-md">
            <h1 className="text-6xl font-black leading-none text-white tracking-tighter mb-4 uppercase">
              Your Universe <br /> of{" "}
              <span className="text-red-600">Cinema</span> <br /> Awaits.
            </h1>
            <p className="text-slate-400 text-sm mb-8">
              Thousands of films, originals, and series — all in one place. Join
              now and never miss a frame.
            </p>
            <div className="flex gap-8">
              {["10K+", "Titles", "4K", "Quality", "2M+", "Members"].map(
                (text, i) =>
                  i % 2 === 0 ? (
                    <div key={i} className="flex flex-col">
                      <span className="text-xl font-bold text-white">
                        {text}
                      </span>
                      <span className="text-[10px] uppercase tracking-widest text-slate-500">
                        {
                          ["10K+", "Titles", "4K", "Quality", "2M+", "Members"][
                            i + 1
                          ]
                        }
                      </span>
                    </div>
                  ) : null,
              )}
            </div>
          </div>
        </div>
      </div>

      {/* --- RIGHT PANEL (Form) --- */}
      <div className="flex-1 flex items-center justify-center p-6 relative">
        <div className="absolute w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[100px] -z-10" />

        <div className="w-full max-w-[400px] bg-white/5 backdrop-blur-3xl border border-white/10 p-8 rounded-3xl shadow-2xl">
          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-white uppercase">
              Join the Verse
            </h2>
            <p className="text-slate-400 text-xs mt-1">
              Create your free account and start streaming today.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
                      Full Name
                    </label>
                    <FormControl>
                      <input
                        className="w-full h-11 bg-white/5 border border-white/10 rounded-xl px-4 text-sm focus:outline-none focus:border-red-600/50 transition-all"
                        placeholder="John Doe"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-[10px] text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
                      Email
                    </label>
                    <FormControl>
                      <input
                        className="w-full h-11 bg-white/5 border border-white/10 rounded-xl px-4 text-sm focus:outline-none focus:border-red-600/50 transition-all"
                        placeholder="you@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-[10px] text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="w-full h-11 bg-white/5 border border-white/10 rounded-xl px-4 text-sm focus:outline-none focus:border-red-600/50 transition-all"
                        placeholder="••••••••"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                    </div>
                    <FormMessage className="text-[10px] text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirm ? "text" : "password"}
                        className="w-full h-11 bg-white/5 border border-white/10 rounded-xl px-4 text-sm focus:outline-none focus:border-red-600/50 transition-all"
                        placeholder="••••••••"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                      >
                        {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    <FormMessage className="text-[10px] text-red-500" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="w-full h-12 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-white font-bold tracking-widest rounded-xl transition-all shadow-[0_10px_20px_rgba(220,38,38,0.2)]"
              >
                {form.formState.isSubmitting ? "SYNCING..." : "GET STARTED"}
              </Button>
            </form>
          </Form>

          <p className="text-center text-xs text-slate-500 mt-6">
            Already a member?{" "}
            <Link href="/login" className="text-red-500 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

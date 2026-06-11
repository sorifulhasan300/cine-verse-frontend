"use client";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  Film,
  Lock,
  Mail,
  ArrowLeft,
  Play,
  Shield,
  User,
} from "lucide-react";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { loginSchema } from "@/zod/auth.validation";
import { FieldError } from "@/components/ui/field";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Signing in...");
      try {
        const { error } = await authClient.signIn.email(value);
        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }
        toast.success("Welcome back!", { id: toastId });
        router.push("/");
      } catch {
        toast.error("Something went wrong", { id: toastId });
      }
    },
  });

  return (
    <div
      className={cn(
        "w-full max-w-4xl mx-auto flex rounded-xl overflow-hidden border border-slate-800 shadow-2xl",
        className
      )}
      {...props}
    >
      {/* ── Left cinematic panel ── */}
      <div className="relative hidden md:flex flex-col justify-end flex-[1.1] min-w-0 bg-[#0d0d14] overflow-hidden">
        {/* Film-strip grid background */}
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-4 gap-[2px] opacity-55 pointer-events-none">
          {[
            "from-[#1a0a2e] to-[#3d1a5c]",
            "from-[#1a0000] to-[#5c0a0a]",
            "from-[#001a0a] to-[#0a3d1a]",
            "from-[#1a1000] to-[#3d2a00]",
            "from-[#001030] to-[#0a1a5c]",
            "from-[#2a001a] to-[#5c0030]",
            "from-[#001a1a] to-[#0a3d3d]",
            "from-[#1a1a00] to-[#3d3d0a]",
            "from-[#100020] to-[#2a0050]",
            "from-[#001a10] to-[#0a3d20]",
            "from-[#1a0808] to-[#4a1010]",
            "from-[#0a0a20] to-[#1a1a50]",
          ].map((g, i) => (
            <div key={i} className={`bg-gradient-to-br ${g}`} />
          ))}
        </div>

        {/* Vertical film-strip lines */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to right, transparent, transparent 48px, rgba(0,0,0,0.55) 48px, rgba(0,0,0,0.55) 52px)",
          }}
        />

        {/* Sprocket holes — top */}
        <div className="absolute top-0 left-0 right-0 flex gap-4 px-3 py-2 z-10" aria-hidden="true">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="w-[18px] h-3 bg-black/70 rounded-[3px] flex-shrink-0" />
          ))}
        </div>

        {/* Sprocket holes — bottom */}
        <div className="absolute bottom-0 left-0 right-0 flex gap-4 px-3 py-2 z-10" aria-hidden="true">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="w-[18px] h-3 bg-black/70 rounded-[3px] flex-shrink-0" />
          ))}
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d14] via-[#0d0d14]/40 to-[#0d0d14]/10 z-10 pointer-events-none" />

        {/* Red spotlight */}
        <div className="absolute -top-16 -left-16 w-72 h-72 rounded-full bg-red-700/15 pointer-events-none z-10" />

        {/* Panel content */}
        <div className="relative z-20 px-7 pb-8 pt-4">
          {/* Now streaming badge */}
          <div className="flex items-center gap-3 bg-red-900/20 border border-red-700/30 rounded-lg px-3 py-2 mb-5 w-fit">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse flex-shrink-0" />
            <div>
              <p className="text-[10px] text-slate-500 leading-none mb-0.5">Now streaming</p>
              <p className="text-[13px] text-slate-200 font-medium leading-none">Dune: Part Two</p>
            </div>
            <div className="ml-4 text-right">
              <p className="text-amber-400 text-[12px] leading-none">★★★★★</p>
              <p className="text-[10px] text-slate-500 mt-0.5">8.8 / 10</p>
            </div>
          </div>

          {/* Rating */}
          <div className="inline-flex items-center gap-1.5 bg-red-900/20 border border-red-700/30 rounded-full px-3 py-1 text-[11px] text-red-400 mb-3">
            <Film className="w-3 h-3" />
            PG-13 · 2h 46m
          </div>

          <h2 className="text-[22px] font-medium text-white leading-snug mb-2">
            Your cinema,<br />your universe.
          </h2>
          <p className="text-[13px] text-slate-500 mb-4">
            Stream thousands of films. Discover what moves you.
          </p>

          <div className="flex flex-wrap gap-2">
            {["Action", "Drama", "Sci-Fi", "Thriller"].map((g) => (
              <span
                key={g}
                className="text-[11px] px-2.5 py-1 rounded-full border border-white/10 text-slate-400"
              >
                {g}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right form panel ── */}
      <div className="flex-1 bg-[#11111c] border-l border-slate-800 px-7 py-8 flex flex-col justify-between min-w-0">
        <div>
          {/* Top row: logo + home exit */}
          <div className="flex items-start justify-between mb-7">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Film className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-[15px] font-medium text-white leading-none">CineVerse</p>
                <p className="text-[9px] text-slate-600 tracking-[2px] uppercase mt-0.5">
                  Stream · Discover
                </p>
              </div>
            </div>

            <Link
              href="/"
              className="flex items-center gap-1.5 text-[12px] text-slate-600 hover:text-red-400 transition-colors mt-0.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Home
            </Link>
          </div>

          <h1 className="text-[20px] font-medium text-white mb-1">Welcome back</h1>
          <p className="text-[13px] text-slate-600 mb-6">Sign in to continue watching</p>

          <form
            id="login-form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <div className="flex flex-col gap-4 mb-5">
              {/* Email */}
              <form.Field name="email">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor={field.name}
                        className="text-[12px] text-slate-500"
                      >
                        Email address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 pointer-events-none" />
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="you@example.com"
                          autoComplete="email"
                          className="pl-10 bg-[#0d0d1a] border-slate-800 text-slate-300 placeholder-slate-700 focus:border-red-600 focus-visible:ring-0"
                        />
                      </div>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </div>
                  );
                }}
              </form.Field>

              {/* Password */}
              <form.Field name="password">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor={field.name}
                          className="text-[12px] text-slate-500"
                        >
                          Password
                        </label>
                        <Link
                          href="/forgot-password"
                          className="text-[11px] text-red-500 hover:text-red-400 transition-colors"
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 pointer-events-none" />
                        <Input
                          id={field.name}
                          type="password"
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="••••••••"
                          autoComplete="current-password"
                          className="pl-10 bg-[#0d0d1a] border-slate-800 text-slate-300 placeholder-slate-700 focus:border-red-600 focus-visible:ring-0"
                        />
                      </div>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </div>
                  );
                }}
              </form.Field>
            </div>

            {/* Submit */}
            <button
              form="login-form"
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white text-[14px] font-medium py-2.5 rounded-lg transition-colors duration-150 mb-4"
            >
              <Play className="w-4 h-4 fill-white" />
              Sign in
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-slate-800" />
            <span className="text-[11px] text-slate-700">quick demo</span>
            <div className="flex-1 h-px bg-slate-800" />
          </div>

          {/* Demo buttons */}
          <div className="flex gap-2 mb-2">
            <button
              type="button"
              onClick={() => {
                form.setFieldValue("email", "sorifullhasan310@gmail.com");
                form.setFieldValue("password", "sorifullhasan310@gmail.com");
              }}
              className="flex-1 flex items-center justify-center gap-1.5 bg-transparent border border-slate-800 hover:border-red-700/50 hover:text-red-400 text-slate-600 text-[12px] py-2 rounded-lg transition-colors duration-150"
            >
              <User className="w-3.5 h-3.5" />
              Demo User
            </button>
            <button
              type="button"
              onClick={() => {
                form.setFieldValue("email", "sorifullhasan300@gmail.com");
                form.setFieldValue("password", "sorifullhasan300@gmail.com");
              }}
              className="flex-1 flex items-center justify-center gap-1.5 bg-transparent border border-slate-800 hover:border-red-700/50 hover:text-red-400 text-slate-600 text-[12px] py-2 rounded-lg transition-colors duration-150"
            >
              <Shield className="w-3.5 h-3.5" />
              Demo Admin
            </button>
          </div>
        </div>

        {/* Bottom: sign up link */}
        <p className="text-center text-[12px] text-slate-600 mt-6">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-red-500 hover:text-red-400 transition-colors cursor-pointer "
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
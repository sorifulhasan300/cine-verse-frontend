"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import z from "zod";
import { Film, Mail, ArrowLeft, KeyRound } from "lucide-react";
import { authService } from "@/services/auth.service";
import { FieldError } from "@/components/ui/field";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Sending reset request...");
      try {
        await authService.requestPasswordReset(value.email);
        toast.success("Reset link sent to your email", { id: toastId });
        router.push("/reset-password");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message || "Something went wrong";
        toast.error(errorMessage, { id: toastId });
      }
    },
  });

  return (
    <div
      className={cn(
        "w-full max-w-md mx-auto bg-[#11111c] border border-slate-800 rounded-xl px-7 py-8 flex flex-col justify-between min-w-0 shadow-2xl",
        className
      )}
      {...props}
    >
      <div>
        {/* Top row: logo + back exit */}
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
            href="/login"
            className="flex items-center gap-1.5 text-[12px] text-slate-600 hover:text-red-400 transition-colors mt-0.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Login
          </Link>
        </div>

        <h1 className="text-[20px] font-medium text-white mb-1">Forgot Password</h1>
        <p className="text-[13px] text-slate-600 mb-6">
          Enter your email to receive a password reset OTP
        </p>

        <form
          id="forgot-password-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <div className="flex flex-col gap-4 mb-5">
            {/* Email Field */}
            <form.Field name="email">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor={field.name} className="text-[12px] text-slate-500">
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
          </div>

          {/* Submit Button */}
          <button
            form="forgot-password-form"
            type="submit"
            className="w-full cursor-pointer flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white text-[14px] font-medium py-2.5 rounded-lg transition-colors duration-150"
          >
            <KeyRound className="w-4 h-4" />
            Send Reset OTP
          </button>
        </form>
      </div>

      {/* Bottom links */}
      <p className="text-center text-[12px] text-slate-600 mt-6">
        Remember your password?{" "}
        <Link
          href="/login"
          className="text-red-500 hover:text-red-400 transition-colors cursor-pointer"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
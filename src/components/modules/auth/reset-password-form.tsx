"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import z from "zod";
import { Film, Key, Lock, Mail, ArrowLeft, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { authService } from "@/services/auth.service";
import { FieldError } from "@/components/ui/field";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  otp: z.string().min(6, "OTP must be 6 digits").max(6, "OTP must be 6 digits"),
  password: z.string().min(5, "Password must be at least 5 characters"),
});

export function ResetPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
      otp: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Resetting password...");
      try {
        await authService.resetPassword(value.email, value.otp, value.password);
        toast.success("Password reset successfully", { id: toastId });
        router.push("/login");
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

        <h1 className="text-[20px] font-medium text-white mb-1">Reset Password</h1>
        <p className="text-[13px] text-slate-600 mb-6">
          Enter the OTP from your email and your new password
        </p>

        <form
          id="reset-password-form"
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
                        type="email"
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

            {/* OTP Field */}
            <form.Field name="otp">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor={field.name} className="text-[12px] text-slate-500">
                      One-Time Password (OTP)
                    </label>
                    <div className="relative">
                      <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 pointer-events-none" />
                      <Input
                        id={field.name}
                        type="text"
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Enter 6-digit code"
                        className="pl-10 bg-[#0d0d1a] border-slate-800 text-slate-300 placeholder-slate-700 focus:border-red-600 focus-visible:ring-0 tracking-wide"
                      />
                    </div>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </div>
                );
              }}
            </form.Field>

            {/* New Password Field */}
            <form.Field name="password">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor={field.name} className="text-[12px] text-slate-500">
                      New Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 pointer-events-none" />
                      <Input
                        id={field.name}
                        type={showPassword ? "text" : "password"}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="••••••••"
                        autoComplete="new-password"
                        className="pl-10 pr-10 bg-[#0d0d1a] border-slate-800 text-slate-300 placeholder-slate-700 focus:border-red-600 focus-visible:ring-0"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-400 transition-colors"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
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
            form="reset-password-form"
            type="submit"
            className="w-full flex cursor-pointer items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white text-[14px] font-medium py-2.5 rounded-lg transition-colors duration-150"
          >
            <CheckCircle2 className="w-4 h-4" />
            Reset Password
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
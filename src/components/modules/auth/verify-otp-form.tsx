"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { verifyOtpSchema } from "@/zod/auth.validation";
import { Film, ArrowLeft, ShieldCheck, Mail } from "lucide-react";
import { authService } from "@/services/auth.service";
import { FieldError } from "@/components/ui/field";

export function VerifyOtpForm({
  className,
  email,
  ...props
}: React.ComponentProps<"div"> & { email?: string }) {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      otp: "",
      email: email || "",
    },
    validators: {
      onSubmit: verifyOtpSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Verifying email...");
      try {
        await authService.verifyEmail(value.otp, value.email);
        localStorage.removeItem("pendingVerificationEmail");
        toast.success("Email verified successfully", { id: toastId });
        router.push("/login");
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Verification failed",
          { id: toastId }
        );
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

        <h1 className="text-[20px] font-medium text-white mb-1">Verify Your Email</h1>
        <p className="text-[13px] text-slate-600 mb-6">
          Enter the 6-digit OTP sent to your email address
        </p>

        <form
          id="verify-otp-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <div className="flex flex-col gap-4 mb-5">
            {/* Email Field (Disabled or pre-filled for safety) */}
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
                      <Input
                        id={field.name}
                        type="text"
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="000000"
                        maxLength={6}
                        className="text-center tracking-[6px] text-[16px] font-semibold bg-[#0d0d1a] border-slate-800 text-slate-300 placeholder-slate-700 focus:border-red-600 focus-visible:ring-0"
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
            form="verify-otp-form"
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white text-[14px] font-medium py-2.5 rounded-lg transition-colors duration-150"
          >
            <ShieldCheck className="w-4 h-4" />
            Verify Email
          </button>
        </form>
      </div>

      {/* Bottom Footer Text */}
      <p className="text-center text-[12px] text-slate-600 mt-6">
        Didn&lsquo;t receive the code?{" "}
        <button
          type="button"
          onClick={() => toast.info("Resending OTP feature coming soon!")}
          className="text-red-500 hover:text-red-400 transition-colors cursor-pointer bg-transparent border-none p-0 inline font-medium"
        >
          Resend Code
        </button>
      </p>
    </div>
  );
}

export default VerifyOtpForm;
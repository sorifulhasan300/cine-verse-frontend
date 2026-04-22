"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { verifyOtpSchema } from "@/zod/auth.validation";
import { verifyEmail } from "@/services/verify-email.service";
import { ShieldCheck } from "lucide-react";

export function VerifyOtpForm({
  className,
  email,
  ...props
}: React.ComponentProps<"div"> & { email?: string }) {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      otp: "",
    },
    validators: {
      onSubmit: verifyOtpSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Verifying email...");
      try {
        await verifyEmail(value.otp, email as string);
        localStorage.removeItem("pendingVerificationEmail");
        toast.success("Email verified successfully", { id: toastId });
        router.push("/login");
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Verification failed",
          { id: toastId },
        );
      }
    },
  });

  return (
    <div className={cn("w-full max-w-md mx-auto", className)} {...props}>
      <Card className="max-w-4xl w-full border border-red-500 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-slate-700 shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-white flex items-center justify-center gap-2">
            <ShieldCheck className="w-6 h-6 text-red-500" />
            Verify Your Email
          </CardTitle>
          <CardDescription className="text-slate-300">
            Enter the 6-digit OTP sent to your email
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            id="verify-otp-form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup className="space-y-4">
              <form.Field name="otp">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <div className="relative">
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="Enter 6-digit OTP"
                          maxLength={6}
                          className="text-center text-lg bg-slate-800 border-slate-600 text-white placeholder-slate-400"
                        />
                      </div>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button
            form="verify-otp-form"
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            <ShieldCheck className="w-4 h-4 mr-2" />
            Verify Email
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default VerifyOtpForm;

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
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Film, Lock, Mail, User } from "lucide-react";

import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import z from "zod";
const formSchema = z.object({
  password: z.string().min(5, "password must be at least 5 characters."),
  email: z.string().email("Invalid email address"),
});
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
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("login...");
      try {
        const { error } = await authClient.signIn.email(value);
        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }
        toast.success("Login Successfully", { id: toastId });
        router.push("/");
      } catch {
        toast.error("Something was wrong", { id: toastId });
      }
    },
  });
  return (
    <div className={cn("w-full max-w-md mx-auto", className)} {...props}>
      <Card className="max-w-4xl w-full border border-red-500 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-slate-700 shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-white flex items-center justify-center gap-2">
            <Film className="w-6 h-6 text-red-500" />
            Welcome to CineVerse
          </CardTitle>
          <CardDescription className="text-slate-300">
            Enter your credentials to unlock the cinematic experience
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            id="login-form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup className="space-y-4">
              <form.Field name="email">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name} className="text-white">
                        Email
                      </FieldLabel>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />

                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="Email"
                          autoComplete="email"
                          className="pl-10 bg-slate-800 border-slate-600 text-white placeholder-slate-400"
                        />
                      </div>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>
              <form.Field name="password">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name} className="text-white">
                        Password
                      </FieldLabel>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />

                        <Input
                          id={field.name}
                          type="password"
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="Password"
                          autoComplete="current-password"
                          className="pl-10 bg-slate-800 border-slate-600 text-white placeholder-slate-400"
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
            form="login-form"
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            <Film className="w-4 h-4 mr-2" />
            Login
          </Button>
          <FieldDescription className="text-center text-slate-300">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-red-400 hover:text-red-300 underline"
            >
              Sign up
            </Link>
          </FieldDescription>
        </CardFooter>
      </Card>
    </div>
  );
}

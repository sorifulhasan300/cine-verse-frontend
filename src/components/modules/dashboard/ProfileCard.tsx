"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import { authService } from "@/services/auth.service";
import { User, Edit3, Save, X, Shield } from "lucide-react";

const updateProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  image: z
    .string()
    .refine((val) => val === "" || z.string().url().safeParse(val).success, {
      message: "Must be a valid URL or empty",
    }),
});

interface ProfileCardProps {
  user: {
    id: string;
    name: string;
    email: string;
    role?: string;
    image?: string;
  };
  variant?: "user" | "admin";
}

function ProfileCard({ user, variant = "user" }: ProfileCardProps) {
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm({
    defaultValues: {
      name: user.name || "",
      image: user.image || "",
    },
    validators: {
      onSubmit: updateProfileSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Updating profile...");
      try {
        const response = await authService.updateUserProfile({
          name: value.name,
          image: value.image || undefined,
        });

        if (response.error) {
          toast.error("Failed to update profile", {
            description: response.error.message,
            id: toastId,
          });
          return;
        }

        toast.success("Profile updated successfully", { id: toastId });
        setIsEditing(false);
        // Refresh the page to get updated data
        window.location.reload();
      } catch (error) {
        toast.error("Something went wrong", { id: toastId });
      }
    },
  });

  const isAdmin = variant === "admin";
  const Icon = isAdmin ? Shield : User;
  const title = isAdmin ? "Admin Profile" : "My Profile";
  const description = isAdmin
    ? "Manage your administrator account information"
    : "Manage your account information";

  return (
    <Card className="max-w-2xl w-full border border-red-500 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-slate-700 shadow-2xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold text-white flex items-center gap-2">
              <Icon className="w-6 h-6 text-red-500" />
              {title}
            </CardTitle>
            <CardDescription className="text-slate-300">
              {description}
            </CardDescription>
          </div>
          {!isEditing && (
            <Button
              onClick={() => setIsEditing(true)}
              variant="outline"
              size="sm"
              className="border-red-500 text-red-400 hover:bg-slate-200 cursor-pointer"
            >
              <Edit3 className="w-4 h-4 mr-2" />
              Edit
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {!isEditing ? (
          <div className="space-y-6">
            <div className="flex items-center space-x-6">
              <div className="relative w-20 h-20">
                <Image
                  src={user.image || "/default-avatar.png"}
                  alt={user.name}
                  fill
                  className="rounded-full object-cover border-2 border-red-500/50"
                />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-white">
                  {user.name}
                </h2>
                <p className="text-slate-300">{user.email}</p>
                <span className="inline-block bg-red-500/20 text-red-300 text-sm px-3 py-1 rounded-full border border-red-500/30">
                  {user.role || (variant === "admin" ? "ADMIN" : "USER")}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className="space-y-6"
          >
            <FieldGroup className="space-y-4">
              <form.Field name="name">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name} className="text-white">
                        Full Name
                      </FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Enter your full name"
                        className="bg-slate-800 border-slate-600 text-white placeholder-slate-400"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              <form.Field name="image">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name} className="text-white">
                        Profile Image URL
                      </FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="https://example.com/image.jpg"
                        className="bg-slate-800 border-slate-600 text-white placeholder-slate-400"
                      />
                      <FieldDescription className="text-slate-400">
                        Enter a URL for your profile picture
                      </FieldDescription>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>
            </FieldGroup>

            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                className="bg-red-600 cursor-pointer hover:bg-red-700 text-white "
                disabled={form.state.isSubmitting}
              >
                <Save className="w-4 h-4 mr-2" />
                {form.state.isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsEditing(false);
                  form.reset();
                }}
                className="border-slate-600 text-white cursor-pointer hover:bg-slate-700"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
}

export default ProfileCard;

"use client";

import { resetPasswordAction } from "@/app/reset-password/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import {
  IconAlertCircleFilled,
  IconCircleCheckFilled,
} from "@tabler/icons-react";

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

type ResetPasswordFormProps = React.ComponentProps<"div">;

type DialogState = {
  open: boolean;
  type: "success" | "error";
  title: string;
  message: string;
};

export function ResetPasswordForm({
  className,
  ...props
}: ResetPasswordFormProps) {
  const [isPending, startTransition] = React.useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const [dialog, setDialog] = React.useState<DialogState>({
    open: false,
    type: "success",
    title: "",
    message: "",
  });

  const form = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(input: ResetPasswordSchema) {
    if (!token) {
      setDialog({
        open: true,
        type: "error",
        title: "Error",
        message: "Invalid reset link. Please request a new password reset.",
      });
      return;
    }

    startTransition(async () => {
      try {
        const result = await resetPasswordAction(token, input.password);

        if (!result.success) {
          setDialog({
            open: true,
            type: "error",
            title: "Error",
            message: result.message || "An error occurred. Please try again.",
          });
          return;
        }

        setDialog({
          open: true,
          type: "success",
          title: "Success",
          message:
            result.message || "Your password has been reset successfully.",
        });
        form.reset();
      } catch (err) {
        console.error("Reset password error:", err);
        setDialog({
          open: true,
          type: "error",
          title: "Error",
          message: "An error occurred. Please try again.",
        });
      }
    });
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Reset your password</CardTitle>
          <CardDescription>
            Enter your new password below. Make sure it's strong and secure.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="password">New Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your new password"
                  {...form.register("password")}
                  disabled={isPending}
                />
                {form.formState.errors.password && (
                  <p className="text-sm text-red-600">
                    {form.formState.errors.password.message}
                  </p>
                )}
              </div>

              <div className="grid gap-3">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your new password"
                  {...form.register("confirmPassword")}
                  disabled={isPending}
                />
                {form.formState.errors.confirmPassword && (
                  <p className="text-sm text-red-600">
                    {form.formState.errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending && (
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {isPending ? "Resetting..." : "Reset Password"}
                </Button>
              </div>

              <div className="text-center">
                <a
                  href="/login"
                  className="text-sm underline-offset-4 hover:underline"
                >
                  Back to login
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      <Dialog
        open={dialog.open}
        onOpenChange={(open) => setDialog({ ...dialog, open })}
      >
        <DialogContent className="text-center" showCloseButton={false}>
          <DialogHeader className="flex flex-col items-center gap-4">
            <div>
              {dialog.type === "success" ? (
                <IconCircleCheckFilled className="mx-auto h-12 w-12 text-green-600" />
              ) : (
                <IconAlertCircleFilled className="mx-auto h-12 w-12 text-red-600" />
              )}
            </div>
            <DialogTitle
              className={
                dialog.type === "success" ? "text-green-600" : "text-red-600"
              }
            >
              {dialog.title}
            </DialogTitle>
            <DialogDescription>{dialog.message}</DialogDescription>
          </DialogHeader>
          <div className="flex justify-center">
            {dialog.type === "success" ? (
              <Button
                onClick={() => {
                  setDialog({ ...dialog, open: false });
                  router.push("/login");
                }}
              >
                Go to Login
              </Button>
            ) : (
              <Button onClick={() => setDialog({ ...dialog, open: false })}>
                Close
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

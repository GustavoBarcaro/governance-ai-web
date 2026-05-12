import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Check, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

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
import { Separator } from "@/components/ui/separator";
import { InlineError } from "@/shared/components/common/inline-error";
import { SurfaceCard } from "@/shared/components/common/surface/card";
import { authApi } from "@/shared/lib/api";

const optionalNameSchema = z.preprocess((value) => {
  if (typeof value !== "string") return value;
  const trimmed = value.trim();
  return trimmed === "" ? undefined : trimmed;
}, z.string().min(2).optional());

const signupPasswordRules = [
  {
    label: "Minimum 8 characters",
    test: (value: string) => value.length >= 8,
  },
  {
    label: "At least 1 special character",
    test: (value: string) => /[^A-Za-z0-9]/.test(value),
  },
  {
    label: "At least 1 number",
    test: (value: string) => /\d/.test(value),
  },
  {
    label: "At least 1 uppercase letter",
    test: (value: string) => /[A-Z]/.test(value),
  },
];

const loginSchema = z.object({
  name: optionalNameSchema,
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
});

const signupSchema = z
  .object({
    name: optionalNameSchema,
    email: z.string().email(),
    password: z
      .string()
      .min(1, "Password is required")
      .refine(
        (value) => signupPasswordRules.every((rule) => rule.test(value)),
        {
          message:
            "Password must have at least 8 characters, 1 special character, 1 number, and 1 uppercase letter.",
        },
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type AuthFormValues = z.infer<typeof loginSchema> &
  Partial<z.infer<typeof signupSchema>>;

interface AuthFormProps {
  mode: "login" | "signup";
}

export function AuthForm({ mode }: AuthFormProps) {
  const navigate = useNavigate();
  const isSignup = mode === "signup";
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormValues>({
    resolver: zodResolver(isSignup ? signupSchema : loginSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const password = watch("password") ?? "";
  const confirmPassword = watch("confirmPassword") ?? "";
  const passwordMismatch =
    isSignup && confirmPassword.length > 0 && password !== confirmPassword;
  const authMutation = useMutation({
    mutationFn: (values: AuthFormValues) =>
      isSignup
        ? authApi.signUp({
            email: values.email,
            password: values.password,
            confirmPassword: values.confirmPassword ?? "",
            name: values.name,
          })
        : authApi.login({
            email: values.email,
            password: values.password,
          }),
  });

  const onSubmit = async (values: AuthFormValues) => {
    await authMutation.mutateAsync(values);
    navigate("/topics");
  };

  return (
    <SurfaceCard className="w-full max-w-md">
      <CardHeader className="pb-5">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground/50">
          {isSignup ? "Create account" : "Sign in"}
        </p>
        <CardTitle className="font-serif text-3xl font-semibold tracking-tight">
          {isSignup ? "Get started." : "Welcome back."}
        </CardTitle>
        <CardDescription className="mt-1">
          {isSignup
            ? "Start organizing your governance domains and consulting regulations with AI."
            : "Continue your governance consultations and pick up where you left off."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {isSignup && (
            <div className="space-y-1.5">
              <Label htmlFor="name" className="font-mono text-xs font-bold uppercase tracking-wide text-muted-foreground/70">Name</Label>
              <Input placeholder="Your name" {...register("name")} />
              <InlineError message={errors.name?.message} />
            </div>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="email" className="font-mono text-xs font-bold uppercase tracking-wide text-muted-foreground/70">Email</Label>
            <Input
              id="email"
              placeholder="user@company.com"
              {...register("email")}
            />
            <InlineError message={errors.email?.message} />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password" className="font-mono text-xs font-bold uppercase tracking-wide text-muted-foreground/70">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register("password")}
            />
            <InlineError message={errors.password?.message} />
            {isSignup && (
              <div className="space-y-1 pt-1">
                {signupPasswordRules.map((rule) => {
                  const isValid = rule.test(password);
                  const Icon = isValid ? Check : X;

                  return (
                    <div
                      key={rule.label}
                      className="flex items-center gap-2 text-xs"
                    >
                      <Icon
                        className={
                          isValid
                            ? "h-3.5 w-3.5 text-emerald-400"
                            : "h-3.5 w-3.5 text-muted-foreground/40"
                        }
                      />
                      <span
                        className={
                          isValid
                            ? "text-foreground/70"
                            : "text-muted-foreground/50"
                        }
                      >
                        {rule.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {isSignup && (
            <div className="space-y-1.5">
              <Label htmlFor="confirmPassword" className="font-mono text-xs font-bold uppercase tracking-wide text-muted-foreground/70">
                Confirm password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                {...register("confirmPassword")}
              />
              <InlineError
                message={
                  passwordMismatch
                    ? "Passwords do not match"
                    : errors.confirmPassword?.message
                }
              />
            </div>
          )}

          <Button
            className="w-full"
            size="lg"
            type="submit"
            disabled={isSubmitting}
          >
            {isSignup ? "Create account" : "Sign in"}
            <ArrowRight className="h-4 w-4" />
          </Button>
          <InlineError message={authMutation.error?.message} />
        </form>

        <Separator className="my-6 opacity-40" />

        <p className="text-sm text-muted-foreground/60">
          {isSignup ? "Already have an account?" : "Need an account?"}{" "}
          <Link
            className="font-semibold text-primary hover:text-primary/80"
            to={isSignup ? "/login" : "/signup"}
          >
            {isSignup ? "Sign in" : "Create one"}
          </Link>
        </p>
      </CardContent>
    </SurfaceCard>
  );
}

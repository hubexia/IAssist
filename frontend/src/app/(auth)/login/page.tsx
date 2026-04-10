"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { LoginFormData, loginSchema } from "@/lib/schemas/auth.schema";
import AuthLayout from "@/components/AuthLayout";
import FormInput from "@/components/ui/FormInput";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    console.log("Login", data);
  };

  return (
    <>
      <AuthLayout
        title={" Welcome back"}
        subTitle={
          "Enter your email and password to access your account and continue managing requests, offers, and active connections."
        }
      >
        <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            label="Email"
            type="email"
            {...register("email")}
            placeholder="you@example.com"
            errorMessage={errors.email?.message}
          />

          <FormInput
            label={"Password"}
            type="password"
            placeholder="Create a password"
            errorMessage={errors.password?.message}
            {...register("password")}
          />

          <Link
            href="/"
            className="text-(--primary) text-xs block hover:underline text-right"
          >
            Forgot Password?
          </Link>

          <Button type="submit" className="w-full">
            Log In
          </Button>
        </form>

        <p className="text-center mt-3 text-xs">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-(--primary) hover:underline">
            Create Account
          </Link>
        </p>
      </AuthLayout>
    </>
  );
}

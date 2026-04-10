"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { RegisterFormData, registerSchema } from "@/lib/schemas/auth.schema";
import Link from "next/link";
import AuthLayout from "@/components/AuthLayout";
import FormInput from "@/components/ui/FormInput";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: "client",
    },
  });

  const submitForm = (data: RegisterFormData) => {
    // Replace with actual registration logic
    console.log("Register", data);
  };

  return (
    <AuthLayout
      title={"Create your account"}
      subTitle={
        " Start matching with clients and assistants through a streamlined platform built for speed and clarity."
      }
     
    >
      <form className="space-y-6" onSubmit={handleSubmit(submitForm)}>
        <FormInput
          label="First Name"
          type="firstName"
          {...register("firstName")}
          errorMessage={errors.firstName?.message}
        />
        <FormInput
          label="Last Name"
          type="lastName"
          {...register("lastName")}
          errorMessage={errors.lastName?.message}
        />

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

        <div>
          <p className="text-sm font-medium text-(--muted) mb-2">I am a</p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Client", value: "client" },
              { label: "Assistant", value: "assistant" },
            ].map((option) => (
              <label
                key={option.label}
                htmlFor={option.value}
                className="flex cursor-pointer items-center gap-3 rounded-xl border focus-within:bg-primary/20 focus-within:border-primary border-[rgba(113,128,150,0.2)] bg-white/90 p-3 text-(--foreground) transition hover:border-primary"
              >
                <input
                  type="radio"
                  id={option.value}
                  value={option.value}
                  className="h-4 w-4 accent-primary"
                  {...register("role")}
                />
                <span>{option.label}</span>
              </label>
            ))}
            {errors.role && (
              <p className="mt-2 text-xs text-red-600">{errors.role.message}</p>
            )}
          </div>
        </div>

        <Button type="submit" className="w-full mt-5">
          Create Account
        </Button>
      </form>

      <p className="text-center mt-3 text-xs">
        Have an account?{" "}
        <Link href="/login" className="text-(--primary) hover:underline">
          Sign In
        </Link>
      </p>
    </AuthLayout>
  );
}

import React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "default" | "outline" | "ghost" | "secondary";
type ButtonSize = "default" | "sm" | "lg";

const baseStyles =
  "inline-flex items-center justify-center rounded-xl cursor-pointer font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

const variantStyles: Record<ButtonVariant, string> = {
  default: "bg-primary text-white hover:bg-primary-dark",
  outline:
    "border border-primary bg-transparent text-primary hover:bg-primary hover:text-white",
  ghost: "bg-transparent text-(--foreground) hover:bg-[rgba(26,54,93,0.08)]",
  secondary:
    "bg-(--surface) text-(--foreground) hover:bg-[rgba(113,128,150,0.12)]",
};

const sizeStyles: Record<ButtonSize, string> = {
  default: "h-12 px-6 text-base",
  sm: "h-10 px-4 text-sm",
  lg: "h-14 px-8 text-lg",
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

export function Button({
  className,
  variant = "default",
  size = "default",
  type = "button",
  ...props
}: ButtonProps) {
  const classes = cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    className,
  );

  return <button type={type} className={classes} {...props} />;
}

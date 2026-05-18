"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg" | "xl";
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      icon,
      iconPosition = "left",
      fullWidth = false,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const base =
      "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap";

    const variants = {
      primary:
        "bg-teal-500 text-white hover:bg-teal-600 active:bg-teal-700 focus-visible:ring-teal-500 shadow-md hover:shadow-lg hover:-translate-y-0.5",
      secondary:
        "bg-navy-950 text-white hover:bg-navy-900 active:bg-navy-800 focus-visible:ring-navy-500 shadow-md hover:shadow-lg hover:-translate-y-0.5",
      outline:
        "border-2 border-teal-500 text-teal-600 hover:bg-teal-500 hover:text-white focus-visible:ring-teal-500 hover:-translate-y-0.5",
      ghost:
        "text-navy-700 hover:bg-navy-50 hover:text-navy-900 focus-visible:ring-navy-300",
      danger:
        "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500 shadow-md hover:shadow-lg",
    };

    const sizes = {
      sm: "text-sm px-4 py-2 h-9",
      md: "text-sm px-5 py-2.5 h-10",
      lg: "text-base px-6 py-3 h-12",
      xl: "text-base px-8 py-4 h-14",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          base,
          variants[variant],
          sizes[size],
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {loading ? (
          <Loader2 className="animate-spin" size={16} />
        ) : (
          icon && iconPosition === "left" && <span>{icon}</span>
        )}
        {children}
        {!loading && icon && iconPosition === "right" && <span>{icon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";

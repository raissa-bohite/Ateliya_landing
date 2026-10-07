import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-white shadow-[0_8px_24px_-6px_rgba(12,94,63,0.45)] hover:bg-primary-dark hover:shadow-[0_10px_28px_-6px_rgba(12,94,63,0.55)] hover:-translate-y-0.5",
        gold: "bg-gold text-primary-dark shadow-[0_8px_24px_-6px_rgba(232,150,10,0.45)] hover:bg-gold-light hover:-translate-y-0.5",
        outline:
          "border border-border bg-transparent text-text hover:border-primary hover:text-primary",
        ghost: "text-text hover:bg-primary-light/60",
      },
      size: {
        md: "h-11 px-6",
        lg: "h-13 px-8 text-base",
        sm: "h-9 px-4 text-xs",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string;
}

export function Button({
  className,
  variant,
  size,
  href,
  ...props
}: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size, className }));

  if (href) {
    return (
      <Link href={href} className={classes}>
        {props.children}
      </Link>
    );
  }

  return <button className={classes} {...props} />;
}

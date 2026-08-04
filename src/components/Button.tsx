import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md";
  children: ReactNode;
};

const base =
  "btn-transition inline-flex items-center justify-center gap-2 rounded-md font-medium tracking-[0.01em] disabled:opacity-40 disabled:pointer-events-none";

const variants: Record<string, string> = {
  primary:
    "bg-primary text-on-primary hover:bg-[var(--color-hover-charcoal)] active:scale-[0.98]",
  secondary:
    "bg-transparent text-on-surface border border-primary hover:bg-primary hover:text-on-primary active:scale-[0.98]",
  ghost:
    "bg-transparent text-on-surface hover:bg-surface-container active:scale-[0.98]",
};

const sizes: Record<string, string> = {
  sm: "px-4 py-2 text-[13px]",
  md: "px-6 py-3.5 text-[15px]",
};

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

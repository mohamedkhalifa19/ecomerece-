"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import Button from "@/components/Button";

function Field({
  label,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[13px] font-medium text-on-surface">{label}</span>
      <input
        {...rest}
        required
        className="rounded-md border border-[var(--color-hairline)] bg-[var(--color-surface-container-lowest)] px-4 py-3 text-[14px] text-on-surface outline-none transition-colors focus:border-primary"
      />
    </label>
  );
}

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const { login, register } = useAuth();
  const router = useRouter();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") || "");
    const password = String(form.get("password") || "");
    if (mode === "login") {
      login(email, password);
    } else {
      register(String(form.get("name") || ""), email, password);
    }
    router.push("/account");
  }

  return (
    <div className="container-editorial py-16 md:py-24">
      <div className="mx-auto w-full max-w-[420px]">
        <h1 className="text-center text-[28px] font-semibold tracking-[-0.01em] text-on-surface">
          {mode === "login" ? "Welcome Back" : "Create an Account"}
        </h1>
        <p className="mt-2 text-center text-[14px] text-on-surface-variant">
          {mode === "login"
            ? "Sign in to view your orders and saved details."
            : "Join for early access to new arrivals and order tracking."}
        </p>

        <div className="mt-8 flex rounded-md bg-[var(--color-surface-container-low)] p-1">
          <button
            onClick={() => setMode("login")}
            className={`btn-transition flex-1 rounded-md py-2.5 text-[13px] font-medium ${
              mode === "login"
                ? "bg-[var(--color-surface-container-lowest)] text-on-surface shadow-[0px_10px_40px_rgba(0,0,0,0.04)]"
                : "text-on-surface-variant"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setMode("register")}
            className={`btn-transition flex-1 rounded-md py-2.5 text-[13px] font-medium ${
              mode === "register"
                ? "bg-[var(--color-surface-container-lowest)] text-on-surface shadow-[0px_10px_40px_rgba(0,0,0,0.04)]"
                : "text-on-surface-variant"
            }`}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
          {mode === "register" && (
            <Field label="Full Name" name="name" placeholder="Amina Farouk" />
          )}
          <Field
            label="Email"
            name="email"
            type="email"
            placeholder="you@example.com"
          />
          <Field
            label="Password"
            name="password"
            type="password"
            placeholder="••••••••"
            minLength={4}
          />
          {mode === "login" && (
            <div className="text-right -mt-2">
              <button
                type="button"
                className="text-[13px] text-on-surface-variant hover:text-on-surface"
              >
                Forgot password?
              </button>
            </div>
          )}
          <Button type="submit" className="w-full mt-2">
            {mode === "login" ? "Sign In" : "Create Account"}
          </Button>
          <p className="text-center text-[12px] text-on-surface-variant">
            This is a demo — any email and password will work.
          </p>
        </form>
      </div>
    </div>
  );
}

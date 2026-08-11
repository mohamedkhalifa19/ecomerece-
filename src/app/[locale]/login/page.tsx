"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import Register from "@/components/Register";
import Login from "@/components/Login";

export default function LoginPage() {
  const t = useTranslations("Login");
  const [mode, setMode] = useState<"login" | "register">("login");
  const router = useRouter();

  return (
    <div className="container-editorial py-16 md:py-24">
      <div className="mx-auto w-full max-w-105">
        <h1 className="text-center text-[28px] font-semibold tracking-[-0.01em] text-on-surface">
          {mode === "login" ? t("login.title") : t("register.title")}
        </h1>

        <p className="mt-2 text-center text-[14px] text-on-surface-variant">
          {mode === "login"
            ? t("login.description")
            : t("register.description")}
        </p>

        <div className="mt-8 flex rounded-md bg-surface-container-low p-1">
          <button
            type="button"
            onClick={() => setMode("login")}
            className={`btn-transition flex-1 rounded-md py-2.5 text-[13px] font-medium ${
              mode === "login"
                ? "bg-(--color-surface-container-lowest) text-on-surface shadow-[0px_10px_40px_rgba(0,0,0,0.04)]"
                : "text-on-surface-variant"
            }`}
          >
            {t("tabs.signIn")}
          </button>

          <button
            type="button"
            onClick={() => setMode("register")}
            className={`btn-transition flex-1 rounded-md py-2.5 text-[13px] font-medium ${
              mode === "register"
                ? "bg-(--color-surface-container-lowest) text-on-surface shadow-[0px_10px_40px_rgba(0,0,0,0.04)]"
                : "text-on-surface-variant"
            }`}
          >
            {t("tabs.register")}
          </button>
        </div>
        {mode === "login" ? <Login /> : <Register />}
      </div>
    </div>
  );
}

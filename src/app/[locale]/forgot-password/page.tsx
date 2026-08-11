"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { resetPassword } from "@/lib/server-actions";
import Field from "@/components/Feild";
import Button from "@/components/Button";

export default function ForgotPasswordForm() {
  const t = useTranslations("ForgotPassword");
  const t2 = useTranslations("errors");

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setError("");
    setMessage("");

    try {
      await resetPassword(email);
      setMessage(t("success"));
    } catch (err) {
      if (err instanceof Error && err.message === "emailNotFound") {
        setError(t2("emailNotFound"));
      } else setError(t("error"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container-editorial py-16">
      <div className="mx-auto max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold">{t("title")}</h1>

          <p className="mt-2 text-sm text-on-surface-variant">
            {t("description")}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Field
            label={t("fields.email")}
            name="email"
            type="email"
            placeholder={t("fields.emailPlaceholder")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {error && <p className="text-sm text-red-600">{error}</p>}

          {message && <p className="text-sm text-green-600">{message}</p>}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? t("sending") : t("button")}
          </Button>
        </form>
      </div>
    </main>
  );
}

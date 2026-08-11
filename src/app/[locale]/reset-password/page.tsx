"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Field from "@/components/Feild";
import Button from "@/components/Button";
import { updatePassword, resetPassword } from "@/lib/server-actions";
import { Link } from "@/i18n/navigation";

type Props = {
  email: string;
};

export default function ResetPasswordForm({ email }: Props) {
  const t = useTranslations("ResetPassword");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [sessionExpired, setSessionExpired] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setError("");
    setMessage("");
    setSessionExpired(false);

    if (password !== confirmPassword) {
      setError(t("passwordsDoNotMatch"));
      setLoading(false);
      return;
    }

    try {
      await updatePassword(password);

      setMessage(t("success"));
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error(err);
      // Your server action should throw this error
      // when the recovery session has expired.
      if (err instanceof Error && err.message === "SESSION_EXPIRED") {
        setSessionExpired(true);
        setError(t("sessionExpired"));
      } else {
        setError(t("error"));
      }
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
            label={t("fields.password")}
            name="password"
            type="password"
            placeholder={t("fields.passwordPlaceholder")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />

          <Field
            label={t("fields.confirmPassword")}
            name="confirmPassword"
            type="password"
            placeholder={t("fields.confirmPasswordPlaceholder")}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={6}
          />

          {error && <p className="text-sm text-red-600">{error}</p>}

          {message && <p className="text-sm text-green-600">{message}</p>}

          <div className="flex gap-3">
            {" "}
            <Button
              type="submit"
              className="w-full"
              disabled={loading || resending}
            >
              {loading ? t("updating") : t("button")}
            </Button>
            {
              <Link
                href={"/forgot-password"}
                className="w-full bg-transparent! flex justify-center items-center rounded-md text-black! cursor-pointer hover:bg-black! hover:text-white! border"
              >
                {resending ? t("resending") : t("resend")}
              </Link>
            }
          </div>
        </form>
      </div>
    </main>
  );
}

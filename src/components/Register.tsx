"use client";
import { register } from "@/lib/server-actions";
import Button from "./Button";
import Field from "./Feild";
import { useLocale, useTranslations } from "next-intl";
import Login from "./Login";
import { toast } from "sonner";
import { useState } from "react";

function Register() {
  const t = useTranslations("Login");
  const t2 = useTranslations("auth");
  const t3 = useTranslations("ResetPassword");
  const t4 = useTranslations("errors");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const locale = useLocale();
  const handleRegister = async (formData: FormData) => {
    if (
      password.trim().toLowerCase() !== confirmPassword.trim().toLowerCase()
    ) {
      setError(t3("passwordsDoNotMatch"));
      return;
    }
    const { requiresEmailConfirmation, error } = await register(formData);
    if (error) {
      setError(t4(error));
      return;
    }
    if (requiresEmailConfirmation) {
      toast(
        <h1
          className={`text-green-900 font-display ${locale === "ar" && "font-cairo"}`}
        >
          {t2("confirmEmail")}
        </h1>,
      );
      //   return <Login />;
    }
  };
  return (
    <form action={handleRegister} className="mt-8 flex flex-col gap-5">
      <Field
        label={t("fields.fullName")}
        name="name"
        placeholder={t("fields.fullNamePlaceholder")}
      />
      <Field
        label={t("fields.email")}
        name="email"
        type="email"
        placeholder={t("fields.emailPlaceholder")}
      />

      <Field
        label={t("fields.password")}
        name="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder={t("fields.passwordPlaceholder")}
        minLength={4}
      />

      <Field
        label={t("fields.confirmPassword")}
        name="confirmPassword"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder={t("fields.confirmPasswordPlaceholder")}
        minLength={4}
      />

      <Field
        label={t("fields.address")}
        name="address"
        type="text"
        placeholder={t("fields.addressPlaceholder")}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}

      <Button type="submit" className="w-full mt-2">
        {t("register.button")}
      </Button>

      <p className="text-center text-[12px] text-on-surface-variant">
        {t("demo")}
      </p>
    </form>
  );
}

export default Register;

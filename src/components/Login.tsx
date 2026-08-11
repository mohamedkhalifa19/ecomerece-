"use client";
import { login } from "@/lib/server-actions";
import Field from "./Feild";
import Button from "./Button";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useState } from "react";

function Login() {
  const t = useTranslations("Login");
  const t2 = useTranslations("errors");

  const [error, setError] = useState("");
  const handelLogin = async (formData: FormData) => {
    const result = await login(formData);
    if (!result.success) {
      setError(t2(result.error));
    }
  };
  return (
    <form action={handelLogin} className="mt-8 flex flex-col gap-5">
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
        placeholder={t("fields.passwordPlaceholder")}
        minLength={4}
      />

      <div className="text-right -mt-2">
        <Link
          href="/forgot-password"
          className="text-[13px] text-on-surface-variant hover:text-on-surface"
        >
          {t("forgotPassword")}
        </Link>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}

      <Button type="submit" className="w-full mt-2">
        {t("login.button")}
      </Button>

      <p className="text-center text-[12px] text-on-surface-variant">
        {t("demo")}
      </p>
    </form>
  );
}

export default Login;

"use client";

import { LoginError } from "@/lib/types";
import { useTranslations } from "next-intl";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("errors");
  const tabs = useTranslations("Login.tabs");
  console.log(error.message);
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-semibold">{t("somethingWentWrong")}</h2>

      <p className="text-red-500">{t(error.message as LoginError)}</p>

      <button
        onClick={() => reset()}
        className="rounded-md bg-black px-4 py-2 text-white"
      >
        {tabs("tryagain")}
      </button>
    </div>
  );
}

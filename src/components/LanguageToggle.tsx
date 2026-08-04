"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";

export default function LanguageToggle() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  function toggleLanguage() {
    const nextLocale = locale === "en" ? "ar" : "en";
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <button
      onClick={toggleLanguage}
      className="rounded-md hidden md:block border border-hairline px-2.5 py-1 text-xs font-medium text-on-surface transition hover:bg-surface"
    >
      {locale === "en" ? "AR" : "EN"}
    </button>
  );
}

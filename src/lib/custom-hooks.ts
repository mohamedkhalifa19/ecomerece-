"use client";

import { useLocale } from "next-intl";

export function useLanguage(): "ar" | "en" {
  const locale = useLocale();

  return locale === "ar" ? "ar" : "en";
}

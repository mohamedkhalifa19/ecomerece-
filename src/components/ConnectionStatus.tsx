"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export default function ConnectionStatus() {
  const t = useTranslations("Connection");

  useEffect(() => {
    const handleOffline = () => {
      toast.error(t("offline"), {
        style: { color: "red" },
      });
    };

    const handleOnline = () => {
      toast.success(t("online"), {
        style: {
          color: "green",
        },
      });
    };

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, [t]);

  return null;
}

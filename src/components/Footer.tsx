"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

const columns = [
  {
    title: "shop",
    links: [
      { label: "products", href: "/products" },
      { label: "newArrivals", href: "/products?category=New" },
      { label: "bestSellers", href: "/products?category=Best" },
      { label: "sale", href: "/products?category=Sale" },
    ],
  },
  {
    title: "company",
    links: [
      { label: "about", href: "/about" },
      { label: "contact", href: "/contact" },
      { label: "careers", href: "/careers" },
    ],
  },
  {
    title: "support",
    links: [
      { label: "faq", href: "/faq" },
      { label: "shipping", href: "/shipping" },
      { label: "returns", href: "/returns" },
    ],
  },
] as const;

export default function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="mt-[80px] border-t border-hairline bg-surface-container-low">
      <div className="container-editorial grid grid-cols-2 gap-10 py-16 md:grid-cols-5">
        <div className="col-span-2">
          <p className="font-display text-[20px] font-semibold text-on-surface">
            {t("brand")}
          </p>

          <p className="mt-3 max-w-70 text-[14px] leading-relaxed text-on-surface-variant">
            {t("description")}
          </p>
        </div>

        {columns.map((column) => (
          <div key={column.title}>
            <p className="text-[12px] font-semibold uppercase tracking-wider text-on-surface-variant">
              {t(column.title)}
            </p>

            <ul className="mt-4 flex flex-col gap-3">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[14px] text-on-surface transition-colors hover:text-on-surface-variant"
                  >
                    {t(link.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}

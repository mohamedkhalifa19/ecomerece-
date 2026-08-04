"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

import { useCart } from "@/lib/cart-context";
import { getProduct, formatPrice, products } from "@/lib/products";
import Button from "@/components/Button";

export default function CartPage() {
  const t = useTranslations("Cart");

  const locale = useLocale();
  const language: "en" | "ar" = locale === "ar" ? "ar" : "en";

  const { lines, removeItem, updateQuantity, subtotal } = useCart();

  const getColor = (id: string, color: string) => {
    const product = products.find((p) => p.id === id);
    return product?.colors.find((c) => c.hex === color);
  };

  if (lines.length === 0) {
    return (
      <div className="container-editorial py-24 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-product-surface">
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M6 8h12l-1 12H7L6 8Z" />
            <path d="M9 8V6a3 3 0 0 1 6 0v2" />
          </svg>
        </div>

        <h1 className="text-[24px] font-semibold text-on-surface">
          {t("emptyTitle")}
        </h1>

        <p className="mt-2 text-[15px] text-on-surface-variant">
          {t("emptyDescription")}
        </p>

        <Link href="/products" className="inline-block mt-8">
          <Button>{t("shopCollection")}</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container-editorial py-10 md:py-14">
      <h1 className="mb-10 text-[32px] font-semibold tracking-[-0.01em] text-on-surface md:text-[40px]">
        {t("title")}
      </h1>

      <div className="grid gap-12 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          {lines.map((line) => {
            const product = getProduct(line.productId);

            if (!product) return null;

            return (
              <div
                key={`${line.productId}-${line.size}-${line.color}`}
                className="flex gap-4 border-b border-hairline pb-6"
              >
                <Link
                  href={`/products/${product.id}`}
                  className="h-28 w-24 shrink-0 overflow-hidden rounded-md bg-product-surface"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name[language]}
                    className="h-full w-full object-cover"
                  />
                </Link>

                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link
                        href={`/products/${product.id}`}
                        className="text-[15px] font-semibold text-on-surface hover:underline"
                      >
                        {product.name[language]}
                      </Link>

                      <p className="mt-1 text-[13px] text-on-surface-variant">
                        {getColor(product.id, line.color)?.name[language]} ·{" "}
                        {t("size")} {line.size}
                      </p>
                    </div>

                    <p className="whitespace-nowrap text-[15px] text-on-surface">
                      {formatPrice(product.price * line.quantity)}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center rounded-md border border-hairline">
                      <button
                        onClick={() =>
                          updateQuantity(
                            line.productId,
                            line.size,
                            line.color,
                            line.quantity - 1,
                          )
                        }
                        aria-label={t("decreaseQuantity")}
                        className="px-3 py-1.5 text-on-surface hover:bg-surface-container-low"
                      >
                        −
                      </button>

                      <span className="w-7 text-center text-[13px] text-on-surface">
                        {line.quantity}
                      </span>

                      <button
                        onClick={() =>
                          updateQuantity(
                            line.productId,
                            line.size,
                            line.color,
                            line.quantity + 1,
                          )
                        }
                        aria-label={t("increaseQuantity")}
                        className="px-3 py-1.5 text-on-surface hover:bg-surface-container-low"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() =>
                        removeItem(line.productId, line.size, line.color)
                      }
                      className="text-[13px] text-on-surface-variant transition-colors hover:text-error"
                    >
                      {t("remove")}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-md bg-surface-container-low p-6">
            <h2 className="mb-4 text-[16px] font-semibold text-on-surface">
              {t("orderSummary")}
            </h2>

            <div className="mb-2 flex justify-between text-[14px] text-on-surface-variant">
              <span>{t("subtotal")}</span>
              <span>{formatPrice(subtotal)}</span>
            </div>

            <div className="mb-4 flex justify-between text-[14px] text-on-surface-variant">
              <span>{t("shipping")}</span>
              <span>{t("calculatedAtCheckout")}</span>
            </div>

            <div className="flex justify-between border-t border-hairline pt-4 text-[16px] font-semibold text-on-surface">
              <span>{t("total")}</span>
              <span>{formatPrice(subtotal)}</span>
            </div>

            <Link href="/checkout" className="mt-6 block">
              <Button className="w-full">{t("checkout")}</Button>
            </Link>

            <Link href="/products" className="mt-3 block">
              <Button variant="ghost" className="w-full">
                {t("continueShopping")}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

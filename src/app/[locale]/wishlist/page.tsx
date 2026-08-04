"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

import { useWishlist } from "@/lib/wishlist-context";
import { useCart } from "@/lib/cart-context";
import { getProduct, formatPrice } from "@/lib/products";
import Button from "@/components/Button";

export default function WishlistPage() {
  const { ids, hydrated, remove, clear } = useWishlist();
  const { addItem } = useCart();

  const locale = useLocale();
  const language: "en" | "ar" = locale === "ar" ? "ar" : "en";

  const t = useTranslations("Wishlist");

  if (!hydrated) {
    return <div className="container-editorial py-24" />;
  }

  const items = ids
    .map((id) => getProduct(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  if (items.length === 0) {
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
            <path d="M12 21s-7.5-4.6-10-9.1C0.3 8.6 1.9 5 5.6 5c2 0 3.4 1.1 4.4 2.6C11 6.1 12.4 5 14.4 5c3.7 0 5.3 3.6 3.6 6.9C19.5 16.4 12 21 12 21Z" />
          </svg>
        </div>

        <h1 className="text-[24px] font-semibold text-on-surface">
          {t("emptyTitle")}
        </h1>

        <p className="mt-2 text-[15px] text-on-surface-variant">
          {t("emptyDescription")}
        </p>

        <Link href="/products" className="mt-8 inline-block">
          <Button>{t("shopCollection")}</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container-editorial py-10 md:py-14">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <h1 className="text-[32px] font-semibold tracking-[-0.01em] text-on-surface md:text-[40px]">
            {t("title")}
          </h1>

          <p className="mt-2 text-[15px] text-on-surface-variant">
            {items.length} {items.length === 1 ? t("piece") : t("pieces")}{" "}
            {t("saved")}
          </p>
        </div>

        <button
          onClick={clear}
          className="text-[13px] text-on-surface-variant transition-colors hover:text-on-surface"
        >
          {t("clearAll")}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
        {items.map((product) => (
          <div key={product.id} className="group">
            <div className="relative aspect-4/5 overflow-hidden rounded-md bg-product-surface">
              <Link href={`/products/${product.id}`}>
                <img
                  src={product.images[0]}
                  alt={product.name[language]}
                  className="h-full w-full object-cover transition-transform duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.04]"
                />
              </Link>

              <button
                onClick={() => remove(product.id)}
                aria-label={t("removeFromWishlist")}
                className="btn-transition absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-(--color-surface-container-lowest)/90 backdrop-blur hover:scale-[1.06]"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-on-surface"
                >
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <div className="mt-3 flex items-start justify-between gap-2">
              <div>
                <Link
                  href={`/products/${product.id}`}
                  className="text-[15px] font-semibold text-on-surface hover:underline underline-offset-2"
                >
                  {product.name[language]}
                </Link>

                <p className="text-[13px] text-on-surface-variant">
                  {product.category[language]}
                </p>
              </div>

              <p className="whitespace-nowrap text-[15px] text-on-surface">
                {formatPrice(product.price)}
              </p>
            </div>

            <Button
              variant="secondary"
              size="sm"
              className="mt-3 w-full"
              onClick={() => {
                addItem({
                  productId: product.id,
                  size: product.sizes[0][language],
                  color: product.colors[0]?.name[language] ?? "",
                  quantity: 1,
                });

                remove(product.id);
              }}
            >
              {t("moveToCart")}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

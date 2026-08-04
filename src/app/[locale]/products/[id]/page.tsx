"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getProduct, formatPrice, products } from "@/lib/products";
import Button from "@/components/Button";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/lib/cart-context";
import { LocalizedText } from "@/lib/types";
import { useLocale, useTranslations } from "next-intl";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const product = getProduct(id);
  const router = useRouter();
  const { addItem } = useCart();
  const locale = useLocale(); // "en" | "ar"
  const language: "ar" | "en" = locale === "ar" ? "ar" : "en";
  const dir = language === "ar" ? "rtl" : "ltr";

  const t = (field: LocalizedText) => field[language];

  const [activeImage, setActiveImage] = useState(0);
  const [size, setSize] = useState<string | null>(null); // keyed by size.en
  const [colorHex, setColorHex] = useState(product?.colors[0]?.hex ?? "");
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="container-editorial py-24 text-center">
        <p className="text-[20px] font-semibold text-on-surface">
          Product not found.
        </p>
        <Link href="/products" className="inline-block mt-6">
          <Button variant="secondary">Back to Shop</Button>
        </Link>
      </div>
    );
  }

  const related = products
    .filter((p) => p.category.en === product.category.en && p.id !== product.id)
    .slice(0, 4);

  const selectedColor = product.colors.find((c) => c.hex === colorHex);

  function handleAddToCart() {
    if (!size) {
      setError("Please select a size.");
      return;
    }
    setError(null);
    addItem({ productId: product!.id, size, color: colorHex, quantity });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }
  const productT = useTranslations("Product");
  return (
    <div className="container-editorial py-10 md:py-14" dir={dir}>
      <nav className="mb-8 text-[13px] text-on-surface-variant">
        <Link href="/" className="hover:text-on-surface">
          {productT("home")}
        </Link>

        <span className="mx-2">/</span>

        <Link href="/products" className="hover:text-on-surface">
          {productT("shop")}
        </Link>

        <span className="mx-2">/</span>

        <span className="text-on-surface">{t(product.name)}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
        <div>
          <div className="aspect-4/5 overflow-hidden rounded-md bg-product-surface">
            <img
              src={product.images[activeImage]}
              alt={t(product.name)}
              className="h-full w-full object-cover"
            />
          </div>

          {product.images.length > 1 && (
            <div className="mt-4 flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={img}
                  onClick={() => setActiveImage(i)}
                  className={`relative h-20 w-16 overflow-hidden rounded-sm ${
                    activeImage === i
                      ? "ring-2 ring-primary"
                      : "opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <p className="text-[13px] uppercase tracking-wider text-on-surface-variant">
            {t(product.category)}
          </p>

          <h1 className="mt-2 text-[28px] md:text-[32px] font-semibold text-on-surface">
            {t(product.name)}
          </h1>

          <p className="mt-3 text-[20px] text-on-surface">
            {formatPrice(product.price)}
          </p>

          <p className="mt-6 text-[16px] leading-[1.6] text-on-surface-variant">
            {t(product.description)}
          </p>

          <div className="mt-8">
            <p className="text-[13px] font-medium text-on-surface mb-3">
              {productT("color")} — {selectedColor ? t(selectedColor.name) : ""}
            </p>

            <div className="flex gap-3">
              {product.colors.map((c) => (
                <button
                  key={c.hex}
                  onClick={() => setColorHex(c.hex)}
                  aria-label={t(c.name)}
                  className={`h-9 w-9 rounded-full border ${
                    colorHex === c.hex
                      ? "ring-2 ring-primary"
                      : "border-hairline"
                  }`}
                  style={{
                    backgroundColor: c.hex,
                  }}
                />
              ))}
            </div>
          </div>

          <div className="mt-8">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[13px] font-medium text-on-surface">
                {productT("size")}
              </p>

              <button className="text-[13px] underline">
                {productT("sizeGuide")}
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s.en}
                  onClick={() => {
                    setSize(s.en);
                    setError(null);
                  }}
                  className={`btn-transition min-w-12 rounded-md border px-3 py-2.5 ${
                    size === s.en
                      ? "border-primary bg-primary text-on-primary"
                      : "border-hairline"
                  }`}
                >
                  {t(s)}
                </button>
              ))}
            </div>

            {error && (
              <p className="mt-2 text-[13px] text-error">
                {productT("selectSize")}
              </p>
            )}
          </div>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center rounded-md border border-hairline">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label={productT("decreaseQuantity")}
                className="px-3 py-2"
              >
                −
              </button>

              <span className="w-8 text-center">{quantity}</span>

              <button
                onClick={() => setQuantity((q) => q + 1)}
                aria-label={productT("increaseQuantity")}
                className="px-3 py-2"
              >
                +
              </button>
            </div>

            <Button onClick={handleAddToCart} className="flex-1">
              {added ? productT("added") : productT("addToCart")}
            </Button>
          </div>

          <Button
            variant="secondary"
            className="mt-3 w-full"
            onClick={() => {
              handleAddToCart();
              router.push("/checkout");
            }}
          >
            {productT("buyNow")}
          </Button>

          <div className="mt-10 border-t border-hairline pt-6">
            <p className="text-[13px] font-medium mb-3">
              {productT("detailsCare")}
            </p>

            <ul className="flex flex-col gap-2">
              {product.details.map((d) => (
                <li key={d.en}>— {t(d)}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-[80px]">
          <h2 className="text-[24px] font-semibold mb-8">
            {productT("youMayAlsoLike")}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

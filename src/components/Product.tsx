"use client";
import { formatPrice } from "@/lib/products";
import { Product } from "@/lib/types";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useWishlist } from "@/lib/wishlist-context";
import { useTranslations } from "next-intl";

interface IProps {
  product: Product;
  language: "en" | "ar";
}

function ProductItem({ product, language }: IProps) {
  const productT = useTranslations("ProductItem");
  const { toggle } = useWishlist();
  return (
    <Link href={`/products/${product.id}`} className="group block">
      <div className="relative aspect-4/5 overflow-hidden rounded-2xl bg-product-surface shadow-sm ring-1 ring-black/4 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:shadow-xl group-hover:shadow-black/10 group-hover:ring-black/6">
        {product.isNew && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-primary/95 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-on-primary shadow-sm backdrop-blur-sm">
            {productT("new")}
          </span>
        )}

        <button
          type="button"
          aria-label={productT("addToWishlist")}
          onClick={(e) => {
            toggle(product.id);
          }}
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-on-surface opacity-0 shadow-sm backdrop-blur-sm transition-all duration-300 ease-out hover:bg-white hover:scale-110 group-hover:opacity-100"
        >
          <Heart className="h-4 w-4" strokeWidth={1.75} />
        </button>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.images[0]}
          alt={product.name[`${language}`]}
          className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.06]"
        />
        {product.images[1] && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.images[1]}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:opacity-100"
          />
        )}

        {/* soft gradient + quick-add bar */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black/25 to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
        <div className="absolute inset-x-3 bottom-3 translate-y-3 opacity-0 transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:translate-y-0 group-hover:opacity-100">
          <span className="block w-full rounded-full bg-white/95 py-2 text-center text-[12px] font-semibold uppercase tracking-wider text-on-surface shadow-sm backdrop-blur-sm transition-colors hover:bg-white">
            {productT("quickView")}
          </span>
        </div>
      </div>

      <div className="mt-3.5 flex items-start justify-between gap-2">
        <div>
          <p className="text-[15px] font-semibold text-on-surface transition-colors duration-200 group-hover:text-primary">
            {product.name[`${language}`]}
          </p>
          <p className="text-[13px] text-on-surface-variant">
            {product.category[`${language}`]}
          </p>
        </div>
        <p className="text-[15px] font-medium text-on-surface whitespace-nowrap">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}

export default ProductItem;

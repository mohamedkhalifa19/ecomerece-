"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { allCategories, products } from "@/lib/products";
import { useLocale } from "next-intl";
import { useTranslations } from "use-intl";
import { CategoryKey, SortKey } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";

const sortOptions: SortKey[] = [
  { value: "price-asc", label: "priceAsc" },
  { value: "price-desc", label: "priceDesc" },
  { value: "name", label: "name" },
];
function ProductsContent() {
  const searchParams = useSearchParams();
  const [category, setCategory] = useState<CategoryKey>("all");
  const searchCategory = searchParams.get("category");
  const router = useRouter();

  useEffect(() => {
    if (searchCategory === "New") {
      setCategory("new");
    }
    if (!searchCategory) setCategory("all");
  }, [searchCategory]);
  const [sort, setSort] = useState("featured");
  const locale = useLocale(); // "en" | "ar"
  const language: "ar" | "en" = locale === "ar" ? "ar" : "en";
  const filtered = useMemo(() => {
    let list = [...products];
    if (category === "new") {
      list = list.filter((p) => p.isNew);
    } else if (category !== "all") {
      list = list.filter((p) => p.category[`en`].toLowerCase() === category);
    }
    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "name":
        list.sort((a, b) =>
          a.name[`${language}`].localeCompare(b.name[`${language}`]),
        );
        break;
      default:
        break;
    }
    return list;
  }, [category, sort]);
  const productT = useTranslations("Products");
  const categoryT = useTranslations("categories");
  const sortT = useTranslations("sortOptions");

  return (
    <div className="container-editorial py-10 md:py-14">
      <div className="mb-10">
        <h1 className="text-[32px] md:text-[40px] font-semibold tracking-[-0.01em] text-on-surface">
          {category === "all"
            ? productT("title.all")
            : categoryT(`${category}`)}
        </h1>
        <p className="mt-2 text-[15px] text-on-surface-variant">
          {filtered.length === 1
            ? productT("count.one", { count: filtered.length })
            : productT("count.other", { count: filtered.length })}
        </p>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
        <div className="flex flex-wrap gap-2">
          {allCategories.map((c) => (
            <button
              key={categoryT(c.name)}
              onClick={() => {
                setCategory(c.name);
                router.replace(`/products?category=${c}`);
              }}
              className={`btn-transition rounded-full px-4 py-2 text-[13px] font-medium ${
                category === c.name
                  ? "bg-primary text-on-primary"
                  : "bg-product-surface text-on-surface hover:bg-surface-container-high"
              }`}
            >
              {categoryT(c.name)}
            </button>
          ))}
        </div>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-md border border-hairline bg-(--color-surface-container-lowest) px-4 py-2.5 text-[13px] text-on-surface focus:border-primary outline-none"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {sortT(`${opt.label}`)}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="py-24 text-center">
          <p className="text-[18px] font-semibold text-on-surface">
            {productT("empty.title")}
          </p>
          <p className="mt-2 text-[14px] text-on-surface-variant">
            {productT("empty.description")}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
          {filtered.map((p) => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {" "}
              <ProductCard key={p.id} product={p} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="container-editorial py-20" />}>
      <ProductsContent />
    </Suspense>
  );
}

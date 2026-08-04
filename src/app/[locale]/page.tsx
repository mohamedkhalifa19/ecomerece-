import Button from "@/components/Button";
import ProductCard from "@/components/ProductCard";
import { Link } from "@/i18n/navigation";
import { categories, products } from "@/lib/products";
import { getLocale, getTranslations } from "next-intl/server";

export default async function Home() {
  const featured = products.slice(0, 4);
  const newArrivals = products.filter((p) => p.isNew);

  const t = await getTranslations("Home");
  const locale = await getLocale();
  const lang: "en" | "ar" = locale === "ar" ? "ar" : "en";
  return (
    <>
      {/* Hero */}
      <section className="container-editorial pt-10 md:pt-16">
        <div className="relative overflow-hidden rounded-lg bg-product-surface">
          <div className="grid items-stretch md:grid-cols-2">
            <div className="flex flex-col justify-center gap-6 px-6 py-16 md:px-16 md:py-24">
              <span className="text-[12px] font-semibold uppercase tracking-wider text-on-surface-variant">
                {t("hero.badge")}
              </span>

              <h1 className="text-[32px] md:text-[64px] font-bold leading-[1.1] tracking-[-0.02em] text-on-surface">
                {t("hero.title")}
              </h1>

              <p className="max-w-105 text-[16px] md:text-[18px] leading-[1.6] text-on-surface-variant">
                {t("hero.description")}
              </p>

              <div className="flex gap-4 pt-2">
                <Link href="/products">
                  <Button size="md">{t("hero.shopCollection")}</Button>
                </Link>

                <Link href="/products?category=New">
                  <Button variant="secondary" size="md">
                    {t("hero.newArrivals")}
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative min-h-80 md:min-h-140">
              <img
                src="https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=1200&q=80"
                alt={t("hero.heroImageAlt")}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container-editorial mt-[80px]">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-[24px] font-semibold text-on-surface">
            {t("categories.title")}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {categories.map((cat) => (
            <Link
              key={cat.name[`${lang}`]}
              href={`/products?category=${cat.name}`}
              className="group relative block aspect-3/4 overflow-hidden rounded-md"
            >
              <img
                src={cat.image}
                alt={cat.name[`${lang}`]}
                className="h-full w-full object-cover transition-transform duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.05]"
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/0 to-black/0" />

              <span className="absolute bottom-5 left-5 text-[18px] font-semibold text-white">
                {cat.name[`${lang}`]}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="container-editorial mt-[80px]">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="text-[24px] font-semibold text-on-surface">
              {t("newArrivals.title")}
            </h2>

            <Link
              href="/products?category=New"
              className="text-[14px] text-on-surface-variant transition-colors hover:text-on-surface"
            >
              {t("newArrivals.viewAll")}
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
            {newArrivals.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Editorial */}
      <section className="container-editorial mt-[80px]">
        <div className="grid items-center gap-10 rounded-lg bg-surface-container-low p-8 md:grid-cols-2 md:p-16">
          <div className="relative order-2 aspect-4/5 overflow-hidden rounded-md md:order-1">
            <img
              src="https://images.unsplash.com/photo-1491953389729-2c11f600182b?q=80&w=464&auto=format&fit=crop"
              alt={t("editorial.imageAlt")}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="order-1 md:order-2">
            <span className="text-[12px] font-semibold uppercase tracking-wider text-on-surface-variant">
              {t("editorial.badge")}
            </span>

            <h2 className="mt-3 text-[24px] md:text-[32px] font-semibold leading-[1.2] text-on-surface">
              {t("editorial.title")}
            </h2>

            <p className="mt-4 text-[16px] leading-[1.6] text-on-surface-variant">
              {t("editorial.description")}
            </p>

            <Link href="/products" className="mt-6 inline-block">
              <Button variant="secondary">{t("editorial.button")}</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="container-editorial mt-[80px] mb-[80px]">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-[24px] font-semibold text-on-surface">
            {t("featured.title")}
          </h2>

          <Link
            href="/products"
            className="text-[14px] text-on-surface-variant transition-colors hover:text-on-surface"
          >
            {t("featured.viewAll")}
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}

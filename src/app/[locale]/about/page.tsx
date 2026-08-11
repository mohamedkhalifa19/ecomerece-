import Button from "@/components/Button";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

export default async function AboutPage() {
  const t = await getTranslations("About");

  return (
    <>
      {/* Hero */}
      <section className="container-editorial pt-10 md:pt-16">
        <div className="rounded-lg bg-product-surface px-6 py-16 text-center md:px-16 md:py-24">
          <span className="text-[12px] font-semibold uppercase tracking-wider text-on-surface-variant">
            {t("hero.badge")}
          </span>

          <h1 className="mt-4 text-[36px] md:text-[64px] font-bold leading-[1.1] tracking-[-0.02em] text-on-surface">
            {t("hero.title")}
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-[16px] md:text-[18px] leading-[1.7] text-on-surface-variant">
            {t("hero.description")}
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="container-editorial mt-[80px]">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <span className="text-[12px] font-semibold uppercase tracking-wider text-on-surface-variant">
              {t("story.badge")}
            </span>

            <h2 className="mt-3 text-[30px] font-semibold text-on-surface">
              {t("story.title")}
            </h2>

            <p className="mt-5 text-[16px] leading-[1.8] text-on-surface-variant">
              {t("story.description")}
            </p>
          </div>

          <div className="overflow-hidden rounded-lg">
            <img
              src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1200&q=80"
              alt={t("story.imageAlt")}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="container-editorial mt-[80px]">
        <div className="text-center">
          <h2 className="text-[30px] font-semibold text-on-surface">
            {t("values.title")}
          </h2>

          <p className="mt-4 text-on-surface-variant">
            {t("values.description")}
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-lg bg-surface-container-low p-8">
            <h3 className="text-xl font-semibold text-on-surface">
              {t("values.quality.title")}
            </h3>

            <p className="mt-3 leading-7 text-on-surface-variant">
              {t("values.quality.description")}
            </p>
          </div>

          <div className="rounded-lg bg-surface-container-low p-8">
            <h3 className="text-xl font-semibold text-on-surface">
              {t("values.design.title")}
            </h3>

            <p className="mt-3 leading-7 text-on-surface-variant">
              {t("values.design.description")}
            </p>
          </div>

          <div className="rounded-lg bg-surface-container-low p-8">
            <h3 className="text-xl font-semibold text-on-surface">
              {t("values.sustainability.title")}
            </h3>

            <p className="mt-3 leading-7 text-on-surface-variant">
              {t("values.sustainability.description")}
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-editorial mt-[80px] mb-[80px]">
        <div className="rounded-lg bg-surface-container-low px-8 py-16 text-center">
          <h2 className="text-[32px] font-semibold text-on-surface">
            {t("cta.title")}
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-on-surface-variant">
            {t("cta.description")}
          </p>

          <Link href="/products" className="mt-8 inline-block">
            <Button>{t("cta.button")}</Button>
          </Link>
        </div>
      </section>
    </>
  );
}

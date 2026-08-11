import { getTranslations } from "next-intl/server";

export default async function FAQPage() {
  const t = await getTranslations("FAQ");

  const faqs = [
    "shipping",
    "returns",
    "payment",
    "tracking",
    "international",
    "support",
  ] as const;

  return (
    <>
      {/* Hero */}
      <section className="container-editorial pt-10 md:pt-16">
        <div className="rounded-lg bg-product-surface px-6 py-16 text-center md:px-16 md:py-24">
          <span className="text-[12px] font-semibold uppercase tracking-wider text-on-surface-variant">
            {t("hero.badge")}
          </span>

          <h1 className="mt-4 text-[36px] font-bold leading-[1.1] tracking-[-0.02em] text-on-surface md:text-[64px]">
            {t("hero.title")}
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-[16px] leading-[1.7] text-on-surface-variant md:text-[18px]">
            {t("hero.description")}
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-editorial my-[80px]">
        <div className="mx-auto max-w-4xl space-y-5">
          {faqs.map((faq) => (
            <details
              key={faq}
              className="group rounded-lg bg-surface-container-low p-6"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between text-lg font-semibold text-on-surface">
                {t(`${faq}.question`)}

                <span className="text-2xl transition-transform duration-300 group-open:rotate-45">
                  +
                </span>
              </summary>

              <p className="mt-4 leading-7 text-on-surface-variant">
                {t(`${faq}.answer`)}
              </p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}

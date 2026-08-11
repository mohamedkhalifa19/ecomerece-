import Button from "@/components/Button";
import { getTranslations } from "next-intl/server";

export default async function ContactPage() {
  const t = await getTranslations("Contact");

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

      {/* Contact */}
      <section className="container-editorial my-[80px]">
        <div className="grid gap-12 md:grid-cols-2">
          {/* Contact Information */}
          <div>
            <h2 className="text-[30px] font-semibold text-on-surface">
              {t("info.title")}
            </h2>

            <p className="mt-4 leading-7 text-on-surface-variant">
              {t("info.description")}
            </p>

            <div className="mt-10 space-y-8">
              <div>
                <h3 className="font-semibold text-on-surface">
                  {t("info.email.label")}
                </h3>
                <p className="mt-2 text-on-surface-variant">
                  support@ethereal.com
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-on-surface">
                  {t("info.phone.label")}
                </h3>
                <p className="mt-2 text-on-surface-variant">+20 100 123 4567</p>
              </div>

              <div>
                <h3 className="font-semibold text-on-surface">
                  {t("info.address.label")}
                </h3>
                <p className="mt-2 text-on-surface-variant">
                  {t("info.address.value")}
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form className="rounded-lg bg-surface-container-low p-8">
            <div className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-on-surface">
                  {t("form.name")}
                </label>

                <input
                  type="text"
                  placeholder={t("form.namePlaceholder")}
                  className="w-full rounded-md border border-outline bg-background px-4 py-3 outline-none transition-colors focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-on-surface">
                  {t("form.email")}
                </label>

                <input
                  type="email"
                  placeholder={t("form.emailPlaceholder")}
                  className="w-full rounded-md border border-outline bg-background px-4 py-3 outline-none transition-colors focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-on-surface">
                  {t("form.subject")}
                </label>

                <input
                  type="text"
                  placeholder={t("form.subjectPlaceholder")}
                  className="w-full rounded-md border border-outline bg-background px-4 py-3 outline-none transition-colors focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-on-surface">
                  {t("form.message")}
                </label>

                <textarea
                  rows={6}
                  placeholder={t("form.messagePlaceholder")}
                  className="w-full resize-none rounded-md border border-outline bg-background px-4 py-3 outline-none transition-colors focus:border-primary"
                />
              </div>

              <Button className="w-full">{t("form.submit")}</Button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

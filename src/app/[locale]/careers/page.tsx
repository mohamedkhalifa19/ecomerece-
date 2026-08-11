import Button from "@/components/Button";
import { getTranslations } from "next-intl/server";

const openings = [
  {
    id: 1,
    title: "Frontend Developer",
    type: "Full-time",
    location: "Remote",
  },
  {
    id: 2,
    title: "UI/UX Designer",
    type: "Full-time",
    location: "Cairo, Egypt",
  },
  {
    id: 3,
    title: "Customer Support Specialist",
    type: "Full-time",
    location: "Remote",
  },
];

export default async function CareersPage() {
  const t = await getTranslations("Careers");

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

      {/* Why Join */}
      <section className="container-editorial mt-[80px]">
        <div className="text-center">
          <h2 className="text-[30px] font-semibold text-on-surface">
            {t("why.title")}
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-on-surface-variant">
            {t("why.description")}
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-lg bg-surface-container-low p-8">
            <h3 className="text-xl font-semibold text-on-surface">
              {t("why.growth.title")}
            </h3>
            <p className="mt-3 leading-7 text-on-surface-variant">
              {t("why.growth.description")}
            </p>
          </div>

          <div className="rounded-lg bg-surface-container-low p-8">
            <h3 className="text-xl font-semibold text-on-surface">
              {t("why.team.title")}
            </h3>
            <p className="mt-3 leading-7 text-on-surface-variant">
              {t("why.team.description")}
            </p>
          </div>

          <div className="rounded-lg bg-surface-container-low p-8">
            <h3 className="text-xl font-semibold text-on-surface">
              {t("why.balance.title")}
            </h3>
            <p className="mt-3 leading-7 text-on-surface-variant">
              {t("why.balance.description")}
            </p>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="container-editorial my-[80px]">
        <div className="mb-10">
          <h2 className="text-[30px] font-semibold text-on-surface">
            {t("positions.title")}
          </h2>

          <p className="mt-4 text-on-surface-variant">
            {t("positions.description")}
          </p>
        </div>

        <div className="space-y-6">
          {openings.map((job) => (
            <div
              key={job.id}
              className="flex flex-col gap-6 rounded-lg bg-surface-container-low p-8 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <h3 className="text-xl font-semibold text-on-surface">
                  {job.title}
                </h3>

                <p className="mt-2 text-on-surface-variant">
                  {job.type} • {job.location}
                </p>
              </div>

              <Button>{t("positions.apply")}</Button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

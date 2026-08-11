import { getTranslations, getLocale } from "next-intl/server";
import Link from "next/link";
import Button from "@/components/Button";
import { formatDate, formattedOrders } from "@/lib/actions";
import LogoutButton from "@/components/LogoutButton";
import { getCurrentUser } from "@/lib/server-actions";
import { statusStyles } from "@/lib/styles";
import { prisma } from "@/lib/prisma";

export default async function AccountPage() {
  const t = await getTranslations("Account");
  const t2 = await getTranslations("Orders");
  const locale = await getLocale();
  const language: "en" | "ar" = locale === "ar" ? "ar" : "en";
  const user = await getCurrentUser();

  if (!user) {
    return (
      <div className="container-editorial py-24 text-center">
        <h1 className="text-[24px] font-semibold text-on-surface">
          {t("notSignedIn.title")}
        </h1>

        <p className="mt-2 text-[15px] text-on-surface-variant">
          {t("notSignedIn.description")}
        </p>

        <Link href="/login" className="inline-block mt-8">
          <Button>{t("notSignedIn.button")}</Button>
        </Link>
      </div>
    );
  }
  const orders = await prisma.order.findMany({
    where: { userId: user.id },
    include: {
      items: true,
      address: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const SAMPLE_ORDERS = formattedOrders(orders);
  const initial = user.name.charAt(0).toUpperCase();

  return (
    <div className="container-editorial py-10 md:py-14">
      <h1 className="text-[32px] md:text-[40px] font-semibold tracking-[-0.01em] text-on-surface mb-10">
        {t("title")}
      </h1>

      <div className="grid md:grid-cols-3 gap-10">
        <div className="md:col-span-1">
          <div className="rounded-md bg-surface-container-low p-6 flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-[24px] font-semibold text-on-primary">
              {initial}
            </div>

            <p className="mt-4 text-[16px] font-semibold text-on-surface">
              {user.name}
            </p>

            <p className="text-[13px] text-on-surface-variant">{user.email}</p>

            <LogoutButton>{t("signOut")}</LogoutButton>
          </div>

          <div className="mt-6 flex flex-col gap-2">
            <Link
              href="/orders"
              className="rounded-md border border-hairline px-5 py-4 text-[14px] text-on-surface hover:border-primary transition-colors flex items-center justify-between"
            >
              {t("myOrders")}
              <span className="text-on-surface-variant">→</span>
            </Link>

            <Link
              href="/products"
              className="rounded-md border border-hairline px-5 py-4 text-[14px] text-on-surface hover:border-primary transition-colors flex items-center justify-between"
            >
              {t("continueShopping")}
              <span className="text-on-surface-variant">→</span>
            </Link>
          </div>
        </div>

        <div className="md:col-span-2 flex flex-col gap-6">
          <div className="rounded-md border border-hairline p-6">
            <h2 className="text-[16px] font-semibold text-on-surface mb-4">
              {t("accountDetails")}
            </h2>

            <dl className="grid sm:grid-cols-2 gap-6">
              <div>
                <dt className="text-[12px] uppercase tracking-wider text-on-surface-variant">
                  {t("name")}
                </dt>
                <dd className="mt-1 text-[14px] text-on-surface">
                  {user.name}
                </dd>
              </div>

              <div>
                <dt className="text-[12px] uppercase tracking-wider text-on-surface-variant">
                  {t("email")}
                </dt>
                <dd className="mt-1 text-[14px] text-on-surface">
                  {user.email}
                </dd>
              </div>

              <div>
                <dt className="text-[12px] uppercase tracking-wider text-on-surface-variant">
                  {t("defaultAddress")}
                </dt>
                <dd className="mt-1 text-[14px] text-on-surface">
                  {user.address}
                </dd>
              </div>

              <div>
                <dt className="text-[12px] uppercase tracking-wider text-on-surface-variant">
                  {t("memberSince")}
                </dt>
                <dd className="mt-1 text-[14px] text-on-surface">
                  {formatDate(user.date, language)}
                </dd>
              </div>
            </dl>
          </div>

          <div className="rounded-md border border-hairline p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[16px] font-semibold text-on-surface">
                {t("recentOrders")}
              </h2>

              <Link
                href="/orders"
                className="text-[13px] text-on-surface-variant hover:text-on-surface"
              >
                {t("viewAll")}
              </Link>
            </div>

            <div className="flex flex-col gap-4">
              {SAMPLE_ORDERS.slice(0, 2).map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between border-b border-hairline last:border-0 pb-4 last:pb-0"
                >
                  <div>
                    <p className="text-[14px] font-medium text-on-surface">
                      {order.id}
                    </p>

                    <p className="text-[12px] text-on-surface-variant">
                      {order.date}
                    </p>
                  </div>

                  <span className="rounded-full bg-product-surface px-3 py-1 text-[12px] font-medium text-on-surface">
                    {
                      <span
                        className={`rounded-full px-3 py-1 text-[12px] font-medium ${
                          statusStyles[order.status]
                        }`}
                      >
                        {t2(`status.${order.status}` as any)}
                      </span>
                    }
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

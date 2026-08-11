import { Suspense } from "react";
import Link from "next/link";
import Button from "@/components/Button";
import { getCurrentUser } from "@/lib/server-actions";
import Orders from "@/components/Orders";
import { getTranslations } from "next-intl/server";
import OrdersFallback from "@/components/OrdersFallback";
import { prisma } from "@/lib/prisma";
import { formattedOrders } from "@/lib/actions";
import { redirect } from "next/navigation";

async function OrdersContent() {
  const t = await getTranslations("Orders");
  const user = await getCurrentUser();

  if (!user) {
    return (
      <div className="container-editorial py-24 text-center">
        <h1 className="text-[24px] font-semibold text-on-surface">
          {t("notSignedIn.title")}
        </h1>

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
  console.log("ORDERS", orders);
  const SAMPLE_ORDERS = formattedOrders(orders);
  console.log("ORDERS", SAMPLE_ORDERS);

  return (
    <div className="flex flex-col gap-4">
      <Orders SAMPLE_ORDERS={SAMPLE_ORDERS} />
    </div>
  );
}

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ placed: string }>;
}) {
  const placed = (await searchParams).placed;
  const t = await getTranslations("Orders");
  const user = await getCurrentUser();
  if (!user) return redirect("/login");
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
  const justPlaced = placed === "1";
  return (
    <div className="container-editorial py-10 md:py-14">
      <h1 className="text-[32px] md:text-[40px] font-semibold tracking-[-0.01em] text-on-surface mb-2">
        {t("title")}
      </h1>

      <p className="text-[15px] text-on-surface-variant mb-10">
        {SAMPLE_ORDERS.length}{" "}
        {SAMPLE_ORDERS.length === 1 ? t("order") : t("orders")} {t("placed")}
      </p>

      {justPlaced && (
        <div className="mb-8 rounded-md bg-surface-container-low px-6 py-4 text-[14px] text-on-surface">
          {t("success")}
        </div>
      )}
      <Suspense fallback={<OrdersFallback />}>
        <OrdersContent />
      </Suspense>
    </div>
  );
}

import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/products";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

type Props = {
  params: Promise<{
    locale: string;
    id: string;
  }>;
};

export default async function OrderDetailsPage({ params }: Props) {
  const { id, locale } = await params;
 
  const t = await getTranslations("OrderDetails");

  const order = await prisma.order.findUnique({
    where: {
      id,
    },

    include: {
      address: true,
      items: true,
    },
  });

  if (!order) {
    return (
      <div className="container-editorial py-24 text-center">
        <h1 className="text-2xl font-semibold">{t("orderNotFound")}</h1>

        <Link
          href={`/${locale}/orders`}
          className="inline-block mt-6 underline"
        >
          {t("backToOrders")}
        </Link>
      </div>
    );
  }

  const statusKey = order.status.toLowerCase() as
    | "processing"
    | "shipped"
    | "delivered";

  return (
    <div className="container-editorial py-10 md:py-14">
      {/* Header */}

      <div className="mb-10">
        <h1 className="text-3xl font-semibold">
          {t("order")} #{order.id}
        </h1>

        <p className="mt-2 text-sm text-on-surface-variant">
          {order.createdAt.toLocaleDateString(
            locale === "ar" ? "ar-EG" : "en-US",
          )}
        </p>
      </div>

      {/* Status */}

      <div className="mb-8 rounded-md bg-surface-container-low p-6">
        <p className="text-sm text-on-surface-variant">{t("status")}</p>

        <p className="mt-1 text-lg font-semibold">{t(statusKey)}</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Items */}

        <div className="lg:col-span-2">
          <h2 className="text-lg font-semibold mb-5">{t("items")}</h2>

          <div className="flex flex-col gap-5">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 border-b border-hairline pb-5"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-24 w-20 rounded-sm object-cover"
                />

                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>

                  <p className="mt-1 text-sm text-on-surface-variant">
                    {t("color")}: {item.color}
                  </p>

                  <p className="text-sm text-on-surface-variant">
                    {t("size")}: {item.size}
                  </p>

                  <p className="text-sm text-on-surface-variant">
                    {t("quantity")}: {item.quantity}
                  </p>
                </div>

                <p className="font-medium">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping Address */}

        <div>
          <div className="rounded-md bg-surface-container-low p-6">
            <h2 className="font-semibold mb-4">{t("shippingAddress")}</h2>

            {order.address && (
              <div className="text-sm text-on-surface-variant space-y-1">
                <p>{order.address.fullName}</p>

                <p>{order.address.phone}</p>

                <p>{order.address.line1}</p>

                <p>
                  {order.address.city}, {order.address.postalCode}
                </p>

                <p>{order.address.country}</p>
              </div>
            )}

            <div className="border-t border-hairline mt-5 pt-5">
              <div className="flex justify-between font-semibold">
                <span>{t("total")}</span>

                <span>{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back */}

      <Link
        href={`/${locale}/orders`}
        className="inline-block mt-10 underline text-sm"
      >
        {t("backToOrders")}
      </Link>
    </div>
  );
}

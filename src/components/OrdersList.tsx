"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { formatPrice } from "@/lib/products";
import { Order } from "@/lib/types";

const statusStyles: Record<Order["status"], string> = {
  Processing:
    "bg-[var(--color-secondary-container)] text-[var(--color-on-secondary-container)]",
  Shipped:
    "bg-[var(--color-primary-fixed)] text-[var(--color-on-primary-fixed)]",
  Delivered: "bg-product-surface text-on-surface",
};

export default function OrdersList({ orders }: { orders: Order[] }) {
  const t = useTranslations("Orders");
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-4">
      {orders.map((order) => {
        const isOpen = expanded === order.id;

        return (
          <div key={order.id} className="rounded-md border border-hairline">
            <button
              type="button"
              onClick={() => setExpanded(isOpen ? null : order.id)}
              className="w-full flex flex-wrap items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <div>
                <p className="text-[14px] font-semibold text-on-surface">
                  {t("orderLabel")} {order.id}
                </p>
                <p className="text-[13px] text-on-surface-variant">
                  {t("placedOn")} {order.date}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <span
                  className={`rounded-full px-3 py-1 text-[12px] font-medium ${
                    statusStyles[order.status]
                  }`}
                >
                  {t(`status.${order.status}` as any)}
                </span>

                <p className="text-[14px] font-medium text-on-surface">
                  {formatPrice(order.total)}
                </p>

                <span
                  className={`text-on-surface-variant transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                >
                  ▾
                </span>
              </div>
            </button>

            {isOpen && (
              <div className="border-t border-hairline px-6 py-5">
                <div className="flex flex-col gap-4">
                  {order.items.map((item) => (
                    <div
                      key={`${item.productId}-${item.size}`}
                      className="flex gap-4"
                    >
                      <div className="h-20 w-16 shrink-0 overflow-hidden rounded-sm bg-product-surface">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="flex-1">
                        <Link
                          href={`/products/${item.productId}`}
                          className="text-[14px] font-medium text-on-surface hover:underline underline-offset-2"
                        >
                          {item.name}
                        </Link>
                        <p className="text-[13px] text-on-surface-variant">
                          {item.color} · {t("size")} {item.size} ·{" "}
                          {t("quantity")} {item.quantity}
                        </p>
                      </div>

                      <p className="text-[14px] text-on-surface">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 grid sm:grid-cols-2 gap-6 border-t border-hairline pt-5">
                  <div>
                    <p className="text-[12px] uppercase tracking-wider text-on-surface-variant mb-1">
                      {t("shippingAddress")}
                    </p>
                    <p className="text-[14px] text-on-surface">
                      {order.address.fullName}
                      <br />
                      {order.address.line1}
                      <br />
                      {order.address.city}, {order.address.postalCode}
                      <br />
                      {order.address.country}
                    </p>
                  </div>

                  <div className="sm:text-right">
                    <p className="text-[12px] uppercase tracking-wider text-on-surface-variant mb-1">
                      {t("orderTotal")}
                    </p>
                    <p className="text-[16px] font-semibold text-on-surface">
                      {formatPrice(order.total)}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

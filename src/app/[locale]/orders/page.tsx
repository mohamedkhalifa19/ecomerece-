"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { formatPrice } from "@/lib/products";
import Button from "@/components/Button";
import { Order } from "@/lib/types";

const statusStyles: Record<Order["status"], string> = {
  Processing: "bg-[var(--color-secondary-container)] text-[var(--color-on-secondary-container)]",
  Shipped: "bg-[var(--color-primary-fixed)] text-[var(--color-on-primary-fixed)]",
  Delivered: "bg-[var(--color-product-surface)] text-on-surface",
};

function OrdersContent() {
  const { user, hydrated, orders } = useAuth();
  const searchParams = useSearchParams();
  const justPlaced = searchParams.get("placed") === "1";
  const [expanded, setExpanded] = useState<string | null>(null);

  if (!hydrated) {
    return <div className="container-editorial py-24" />;
  }

  if (!user) {
    return (
      <div className="container-editorial py-24 text-center">
        <h1 className="text-[24px] font-semibold text-on-surface">
          Sign in to view your orders.
        </h1>
        <Link href="/login" className="inline-block mt-8">
          <Button>Sign In</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container-editorial py-10 md:py-14">
      <h1 className="text-[32px] md:text-[40px] font-semibold tracking-[-0.01em] text-on-surface mb-2">
        My Orders
      </h1>
      <p className="text-[15px] text-on-surface-variant mb-10">
        {orders.length} {orders.length === 1 ? "order" : "orders"} placed
      </p>

      {justPlaced && (
        <div className="mb-8 rounded-md bg-[var(--color-surface-container-low)] px-6 py-4 text-[14px] text-on-surface">
          Your order has been placed. A confirmation has been sent to your
          email.
        </div>
      )}

      <div className="flex flex-col gap-4">
        {orders.map((order) => {
          const isOpen = expanded === order.id;
          return (
            <div
              key={order.id}
              className="rounded-md border border-[var(--color-hairline)]"
            >
              <button
                onClick={() => setExpanded(isOpen ? null : order.id)}
                className="w-full flex flex-wrap items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <div>
                  <p className="text-[14px] font-semibold text-on-surface">
                    Order {order.id}
                  </p>
                  <p className="text-[13px] text-on-surface-variant">
                    Placed on {order.date}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className={`rounded-full px-3 py-1 text-[12px] font-medium ${statusStyles[order.status]}`}
                  >
                    {order.status}
                  </span>
                  <p className="text-[14px] font-medium text-on-surface">
                    {formatPrice(order.total)}
                  </p>
                  <span
                    className={`text-on-surface-variant transition-transform ${isOpen ? "rotate-180" : ""}`}
                  >
                    ▾
                  </span>
                </div>
              </button>

              {isOpen && (
                <div className="border-t border-[var(--color-hairline)] px-6 py-5">
                  <div className="flex flex-col gap-4">
                    {order.items.map((item) => (
                      <div
                        key={`${item.productId}-${item.size}`}
                        className="flex gap-4"
                      >
                        <div className="h-20 w-16 shrink-0 overflow-hidden rounded-sm bg-[var(--color-product-surface)]">
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
                            {item.color} · Size {item.size} · Qty{" "}
                            {item.quantity}
                          </p>
                        </div>
                        <p className="text-[14px] text-on-surface">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 grid sm:grid-cols-2 gap-6 border-t border-[var(--color-hairline)] pt-5">
                    <div>
                      <p className="text-[12px] uppercase tracking-[0.05em] text-on-surface-variant mb-1">
                        Shipping Address
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
                      <p className="text-[12px] uppercase tracking-[0.05em] text-on-surface-variant mb-1">
                        Order Total
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
    </div>
  );
}

export default function OrdersPage() {
  return (
    <Suspense fallback={<div className="container-editorial py-24" />}>
      <OrdersContent />
    </Suspense>
  );
}

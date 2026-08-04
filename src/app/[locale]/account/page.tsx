"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import Button from "@/components/Button";

export default function AccountPage() {
  const { user, hydrated, logout, orders } = useAuth();

  if (!hydrated) {
    return <div className="container-editorial py-24" />;
  }

  if (!user) {
    return (
      <div className="container-editorial py-24 text-center">
        <h1 className="text-[24px] font-semibold text-on-surface">
          You&apos;re not signed in.
        </h1>
        <p className="mt-2 text-[15px] text-on-surface-variant">
          Sign in to view your account and order history.
        </p>
        <Link href="/login" className="inline-block mt-8">
          <Button>Sign In</Button>
        </Link>
      </div>
    );
  }

  const initial = user.name.charAt(0).toUpperCase();

  return (
    <div className="container-editorial py-10 md:py-14">
      <h1 className="text-[32px] md:text-[40px] font-semibold tracking-[-0.01em] text-on-surface mb-10">
        My Account
      </h1>

      <div className="grid md:grid-cols-3 gap-10">
        <div className="md:col-span-1">
          <div className="rounded-md bg-[var(--color-surface-container-low)] p-6 flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-[24px] font-semibold text-on-primary">
              {initial}
            </div>
            <p className="mt-4 text-[16px] font-semibold text-on-surface">
              {user.name}
            </p>
            <p className="text-[13px] text-on-surface-variant">{user.email}</p>
            <Button
              variant="secondary"
              size="sm"
              className="mt-6 w-full"
              onClick={logout}
            >
              Sign Out
            </Button>
          </div>

          <div className="mt-6 flex flex-col gap-2">
            <Link
              href="/orders"
              className="rounded-md border border-[var(--color-hairline)] px-5 py-4 text-[14px] text-on-surface hover:border-primary transition-colors flex items-center justify-between"
            >
              My Orders
              <span className="text-on-surface-variant">→</span>
            </Link>
            <Link
              href="/products"
              className="rounded-md border border-[var(--color-hairline)] px-5 py-4 text-[14px] text-on-surface hover:border-primary transition-colors flex items-center justify-between"
            >
              Continue Shopping
              <span className="text-on-surface-variant">→</span>
            </Link>
          </div>
        </div>

        <div className="md:col-span-2 flex flex-col gap-6">
          <div className="rounded-md border border-[var(--color-hairline)] p-6">
            <h2 className="text-[16px] font-semibold text-on-surface mb-4">
              Account Details
            </h2>
            <dl className="grid sm:grid-cols-2 gap-6">
              <div>
                <dt className="text-[12px] uppercase tracking-[0.05em] text-on-surface-variant">
                  Name
                </dt>
                <dd className="mt-1 text-[14px] text-on-surface">
                  {user.name}
                </dd>
              </div>
              <div>
                <dt className="text-[12px] uppercase tracking-[0.05em] text-on-surface-variant">
                  Email
                </dt>
                <dd className="mt-1 text-[14px] text-on-surface">
                  {user.email}
                </dd>
              </div>
              <div>
                <dt className="text-[12px] uppercase tracking-[0.05em] text-on-surface-variant">
                  Default Address
                </dt>
                <dd className="mt-1 text-[14px] text-on-surface">
                  14 Corniche Street, Talkha, Egypt
                </dd>
              </div>
              <div>
                <dt className="text-[12px] uppercase tracking-[0.05em] text-on-surface-variant">
                  Member Since
                </dt>
                <dd className="mt-1 text-[14px] text-on-surface">
                  July 2026
                </dd>
              </div>
            </dl>
          </div>

          <div className="rounded-md border border-[var(--color-hairline)] p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[16px] font-semibold text-on-surface">
                Recent Orders
              </h2>
              <Link
                href="/orders"
                className="text-[13px] text-on-surface-variant hover:text-on-surface"
              >
                View all
              </Link>
            </div>
            <div className="flex flex-col gap-4">
              {orders.slice(0, 2).map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between border-b border-[var(--color-hairline)] last:border-0 pb-4 last:pb-0"
                >
                  <div>
                    <p className="text-[14px] font-medium text-on-surface">
                      {order.id}
                    </p>
                    <p className="text-[12px] text-on-surface-variant">
                      {order.date}
                    </p>
                  </div>
                  <span className="rounded-full bg-[var(--color-product-surface)] px-3 py-1 text-[12px] font-medium text-on-surface">
                    {order.status}
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

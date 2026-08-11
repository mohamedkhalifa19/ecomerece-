import { Order } from "./types";

export const statusStyles: Record<Order["status"], string> = {
  Processing:
    "bg-[var(--color-secondary-container)] text-[var(--color-on-secondary-container)]",
  Shipped:
    "bg-[var(--color-primary-fixed)] text-[var(--color-on-primary-fixed)]",
  Delivered: "bg-product-surface text-on-surface",
};

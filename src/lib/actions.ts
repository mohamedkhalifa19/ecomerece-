import { Prisma } from "@/generated/prisma";
import { Item, Order } from "./types";

export function formatDate(date: string, locale: "en" | "ar"): string {
  const months = {
    en: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    ar: [
      "يناير",
      "فبراير",
      "مارس",
      "أبريل",
      "مايو",
      "يونيو",
      "يوليو",
      "أغسطس",
      "سبتمبر",
      "أكتوبر",
      "نوفمبر",
      "ديسمبر",
    ],
  };

  const d = new Date(date);

  return `${d.getUTCDate()} ${months[locale][d.getUTCMonth()]}`;
}
export type PrismaOrderWithRelations = Prisma.OrderGetPayload<{
  include: {
    items: true;
    address: true;
  };
}>;
export const formattedOrders = (
  orders: PrismaOrderWithRelations[],
): Order[] => {
  return orders.map((order) => ({
    id: order.id,
    date: order.createdAt.toISOString(),
    status: order.status,

    items: order.items.map((item: Item) => ({
      productId: item.productId,
      name: item.name,
      size: item.size,
      color: item.color,
      quantity: item.quantity,
      price: item.price,
      image: item.image,
    })),

    total: order.total,
    address: order.address,
  }));
};

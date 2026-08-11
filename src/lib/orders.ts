import { Order } from "./types";

export const SAMPLE_ORDERS: Order[] = [
  {
    id: "EE-10482",
    date: "2026-07-12",
    status: "Delivered",
    items: [
      {
        productId: "wool-overcoat",
        name: "Wool Overcoat",
        size: "M",
        color: "Graphite",
        quantity: 1,
        price: 890,
        image:
          "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&q=80",
      },
      {
        productId: "cashmere-knit",
        name: "Cashmere Crewneck",
        size: "S",
        color: "Oatmeal",
        quantity: 1,
        price: 340,
        image:
          "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=400&q=80",
      },
    ],
    total: 1230,
    address: {
      fullName: "Amina Farouk",
      line1: "14 Corniche Street",
      city: "Talkha",
      postalCode: "35511",
      country: "Egypt",
      phone: "+20 100 000 0000",
    },
  },
  {
    id: "EE-10317",
    date: "2026-06-02",
    status: "Shipped",
    items: [
      {
        productId: "leather-tote",
        name: "Structured Leather Tote",
        size: "One Size",
        color: "Cognac",
        quantity: 1,
        price: 780,
        image:
          "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80",
      },
    ],
    total: 780,
    address: {
      fullName: "Amina Farouk",
      line1: "14 Corniche Street",
      city: "Talkha",
      postalCode: "35511",
      country: "Egypt",
      phone: "+20 100 000 0000",
    },
  },
];

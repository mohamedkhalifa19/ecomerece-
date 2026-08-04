export type LocalizedText = {
  en: string;
  ar: string;
};

export type Category = {
  name: LocalizedText;
  image: string;
};
export type CategoryKey =
  | "all"
  | "new"
  | "outerwear"
  | "dresses"
  | "knitwear"
  | "trousers"
  | "shirts"
  | "accessories"
  | "footwear";
export type AllCategories = {
  name: CategoryKey;
};
export type SortKey = {
  value: string;
  label: "featured" | "priceAsc" | "priceAsc" | "priceDesc" | "name";
};
export type Product = {
  id: string;
  name: LocalizedText;
  category: LocalizedText;
  price: number;
  compareAtPrice?: number;
  description: LocalizedText;
  details: LocalizedText[];
  colors: { name: LocalizedText; hex: string }[];
  sizes: LocalizedText[];
  images: string[];
  isNew?: boolean;
};

export type CartLine = {
  productId: string;
  size: string;
  color: string;
  quantity: number;
};

export type Address = {
  fullName: string;
  line1: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
};

export type Order = {
  id: string;
  date: string;
  status: "Processing" | "Shipped" | "Delivered";
  items: {
    productId: string;
    name: string;
    size: string;
    color: string;
    quantity: number;
    price: number;
    image: string;
  }[];
  total: number;
  address: Address;
};

export type User = {
  name: string;
  email: string;
};

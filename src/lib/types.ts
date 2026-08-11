import { Prisma } from "@/generated/prisma/client";

export type LocalizedText = {
  en: string;
  ar: string;
};

export type Category = {
  name: LocalizedText;
  image: string;
};
export type LoginResult =
  | {
      success: true;
    }
  | {
      success: false;
      error: LoginError;
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
export type Item = {
  productId: string;
  name: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
  image: string;
};
export type Order = {
  id: string;
  date: string;
  status: "Processing" | "Shipped" | "Delivered";
  items: Item[];
  total: number;
  address: Address | null;
};
export type PrismaOrderWithRelations = Prisma.OrderGetPayload<{
  include: {
    items: true;
    address: true;
  };
}>;

export type User = {
  id: string;
  name: string;
  email: string;
  address: string;
  date: string;
};

export type UserMetadata = {
  name?: string;
  full_name?: string;
  address?: string;
  date?: string;
};
export type LoginError =
  | "invalidLoginCredentials"
  | "emailNotConfirmed"
  | "tooManyRequests"
  | "unableToLogin"
  | "emailNotFound"
  | "somethingWentWrong";

export type RegisterError =
  | "unableToCreateAccount"
  | "emailAlreadyRegistered"
  | "invalidEmail"
  | "weakPassword"
  | "emailRateLimitExceeded"
  | "passwordTooShort"
  | "somethingWentWrong";

import { AllCategories, Category, Product } from "./types";

export const products: Product[] = [
  {
    id: "classic-white-shirt",
    name: { en: "Classic White Shirt", ar: "قميص أبيض كلاسيكي" },
    category: { en: "Shirts", ar: "قمصان" },
    price: 79,
    description: {
      en: "Premium organic cotton shirt for everyday wear.",
      ar: "قميص قطني عضوي فاخر للارتداء اليومي.",
    },
    details: [
      { en: "100% Cotton", ar: "قطن 100%" },
      { en: "Regular Fit", ar: "قصة عادية" },
      { en: "Machine Wash", ar: "غسيل بالغسالة" },
      { en: "Made in Portugal", ar: "صنع في البرتغال" },
    ],
    colors: [
      { name: { en: "White", ar: "أبيض" }, hex: "#FFFFFF" },
      { name: { en: "Blue", ar: "أزرق" }, hex: "#6A8CAF" },
    ],
    sizes: [
      { en: "S", ar: "S" },
      { en: "M", ar: "M" },
      { en: "L", ar: "L" },
      { en: "XL", ar: "XL" },
    ],
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
      "https://images.unsplash.com/photo-1600230699105-8ee229f7b997?w=800&q=80",
    ],
    isNew: true,
  },
  {
    id: "oversized-hoodie",
    name: { en: "Oversized Hoodie", ar: "هوديي بقصة واسعة" },
    category: { en: "Hoodies", ar: "هوديز" },
    price: 89,
    description: {
      en: "Soft fleece hoodie with relaxed oversized fit.",
      ar: "هوديي مصنوع من الصوف الناعم بقصة واسعة ومريحة.",
    },
    details: [
      { en: "80% Cotton", ar: "قطن 80%" },
      { en: "20% Polyester", ar: "بوليستر 20%" },
      { en: "Front Pocket", ar: "جيب أمامي" },
      { en: "Ribbed Cuffs", ar: "أكمام مضلعة" },
    ],
    colors: [
      { name: { en: "Black", ar: "أسود" }, hex: "#000000" },
      { name: { en: "Gray", ar: "رمادي" }, hex: "#8A8A8A" },
    ],
    sizes: [
      { en: "S", ar: "S" },
      { en: "M", ar: "M" },
      { en: "L", ar: "L" },
      { en: "XL", ar: "XL" },
    ],
    images: [
      "https://images.unsplash.com/photo-1548883354-94bcfe321cbb?w=800&q=80",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
    ],
  },
  {
    id: "denim-jacket",
    name: { en: "Denim Jacket", ar: "جاكيت دنيم" },
    category: { en: "Outerwear", ar: "ملابس خارجية" },
    price: 120,
    description: {
      en: "Classic denim jacket with vintage-inspired wash.",
      ar: "جاكيت دنيم كلاسيكي بغسيل مستوحى من الطراز القديم.",
    },
    details: [
      { en: "100% Cotton Denim", ar: "دنيم قطني 100%" },
      { en: "Button Closure", ar: "إغلاق بأزرار" },
      { en: "Chest Pockets", ar: "جيوب صدرية" },
      { en: "Regular Fit", ar: "قصة عادية" },
    ],
    colors: [{ name: { en: "Blue", ar: "أزرق" }, hex: "#406E8E" }],
    sizes: [
      { en: "S", ar: "S" },
      { en: "M", ar: "M" },
      { en: "L", ar: "L" },
      { en: "XL", ar: "XL" },
    ],
    images: [
      "https://images.unsplash.com/photo-1562068391-2ccb2c3e7c2b?w=800&q=80",
      "https://images.unsplash.com/photo-1548883354-94bcfe321cbb?w=800&q=80",
    ],
    isNew: true,
  },
  {
    id: "cargo-pants",
    name: { en: "Cargo Pants", ar: "بنطال كارجو" },
    category: { en: "Trousers", ar: "بناطيل" },
    price: 95,
    description: {
      en: "Modern cargo pants with utility pockets.",
      ar: "بنطال كارجو عصري بجيوب عملية.",
    },
    details: [
      { en: "Cotton Blend", ar: "مزيج قطني" },
      { en: "Slim Fit", ar: "قصة ضيقة" },
      { en: "Elastic Waist", ar: "خصر مطاطي" },
      { en: "Machine Wash", ar: "غسيل بالغسالة" },
    ],
    colors: [
      { name: { en: "Olive", ar: "زيتوني" }, hex: "#556B2F" },
      { name: { en: "Black", ar: "أسود" }, hex: "#000000" },
    ],
    sizes: [
      { en: "30", ar: "30" },
      { en: "32", ar: "32" },
      { en: "34", ar: "34" },
      { en: "36", ar: "36" },
    ],
    images: [
      "https://images.unsplash.com/photo-1593363725982-860117ff8b78?w=800&q=80",
      "https://images.unsplash.com/photo-1562068391-2ccb2c3e7c2b?w=800&q=80",
    ],
  },
  {
    id: "running-sneakers",
    name: { en: "Running Sneakers", ar: "حذاء رياضي للجري" },
    category: { en: "Footwear", ar: "أحذية" },
    price: 140,
    description: {
      en: "Lightweight sneakers built for comfort and daily wear.",
      ar: "حذاء رياضي خفيف الوزن مصمم للراحة والاستخدام اليومي.",
    },
    details: [
      { en: "Mesh Upper", ar: "جزء علوي شبكي" },
      { en: "Rubber Sole", ar: "نعل مطاطي" },
      { en: "Breathable", ar: "قابل للتهوية" },
      { en: "Lightweight", ar: "خفيف الوزن" },
    ],
    colors: [
      { name: { en: "White", ar: "أبيض" }, hex: "#FFFFFF" },
      { name: { en: "Black", ar: "أسود" }, hex: "#000000" },
    ],
    sizes: [
      { en: "40", ar: "40" },
      { en: "41", ar: "41" },
      { en: "42", ar: "42" },
      { en: "43", ar: "43" },
      { en: "44", ar: "44" },
    ],
    images: [
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&q=80",
      "https://images.unsplash.com/photo-1593363725982-860117ff8b78?w=800&q=80",
    ],
    isNew: true,
  },
  {
    id: "leather-wallet",
    name: { en: "Leather Wallet", ar: "محفظة جلدية" },
    category: { en: "Accessories", ar: "إكسسوارات" },
    price: 55,
    description: {
      en: "Minimal genuine leather wallet with RFID protection.",
      ar: "محفظة جلدية طبيعية بتصميم بسيط مع حماية RFID.",
    },
    details: [
      { en: "Genuine Leather", ar: "جلد طبيعي" },
      { en: "RFID Protection", ar: "حماية RFID" },
      { en: "6 Card Slots", ar: "6 فتحات للبطاقات" },
      { en: "Made in Italy", ar: "صنع في إيطاليا" },
    ],
    colors: [
      { name: { en: "Brown", ar: "بني" }, hex: "#7B4A2E" },
      { name: { en: "Black", ar: "أسود" }, hex: "#000000" },
    ],
    sizes: [{ en: "One Size", ar: "مقاس واحد" }],
    images: [
      "https://images.unsplash.com/photo-1660089797728-82d57961d1a0?w=800&q=80",
      "https://images.unsplash.com/photo-1543365593-e00b9b7b896a?w=800&q=80",
    ],
  },
  {
    id: "summer-dress",
    name: { en: "Summer Dress", ar: "فستان صيفي" },
    category: { en: "Dresses", ar: "فساتين" },
    price: 99,
    description: {
      en: "Lightweight floral dress perfect for warm days.",
      ar: "فستان زهور خفيف مثالي للأيام الدافئة.",
    },
    details: [
      { en: "100% Linen", ar: "كتان 100%" },
      { en: "Midi Length", ar: "طول متوسط" },
      { en: "Relaxed Fit", ar: "قصة مريحة" },
      { en: "Machine Wash", ar: "غسيل بالغسالة" },
    ],
    colors: [
      { name: { en: "Beige", ar: "بيج" }, hex: "#F5F5DC" },
      { name: { en: "Pink", ar: "وردي" }, hex: "#F8C8DC" },
    ],
    sizes: [
      { en: "XS", ar: "XS" },
      { en: "S", ar: "S" },
      { en: "M", ar: "M" },
      { en: "L", ar: "L" },
    ],
    images: [
      "https://images.unsplash.com/photo-1600230699105-8ee229f7b997?w=800&q=80",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
    ],
  },
  {
    id: "baseball-cap",
    name: { en: "Baseball Cap", ar: "قبعة بيسبول" },
    category: { en: "Accessories", ar: "إكسسوارات" },
    price: 35,
    description: {
      en: "Everyday adjustable cotton baseball cap.",
      ar: "قبعة بيسبول قطنية قابلة للتعديل للاستخدام اليومي.",
    },
    details: [
      { en: "100% Cotton", ar: "قطن 100%" },
      { en: "Adjustable Strap", ar: "حزام قابل للتعديل" },
      { en: "Embroidered Logo", ar: "شعار مطرز" },
      { en: "One Size", ar: "مقاس واحد" },
    ],
    colors: [
      { name: { en: "Black", ar: "أسود" }, hex: "#000000" },
      { name: { en: "Navy", ar: "كحلي" }, hex: "#1B365D" },
    ],
    sizes: [{ en: "One Size", ar: "مقاس واحد" }],
    images: [
      "https://images.unsplash.com/photo-1543365593-e00b9b7b896a?w=800&q=80",
      "https://images.unsplash.com/photo-1660089797728-82d57961d1a0?w=800&q=80",
    ],
  },
  {
    id: "wool-coat",
    name: { en: "Wool Coat", ar: "معطف صوف" },
    category: { en: "Outerwear", ar: "ملابس خارجية" },
    price: 199,
    description: {
      en: "Premium wool coat for winter seasons.",
      ar: "معطف صوف فاخر لفصل الشتاء.",
    },
    details: [
      { en: "80% Wool", ar: "صوف 80%" },
      { en: "20% Polyester", ar: "بوليستر 20%" },
      { en: "Double Breasted", ar: "صف أزرار مزدوج" },
      { en: "Dry Clean Only", ar: "تنظيف جاف فقط" },
    ],
    colors: [
      { name: { en: "Camel", ar: "بني جملي" }, hex: "#C19A6B" },
      { name: { en: "Black", ar: "أسود" }, hex: "#000000" },
    ],
    sizes: [
      { en: "S", ar: "S" },
      { en: "M", ar: "M" },
      { en: "L", ar: "L" },
      { en: "XL", ar: "XL" },
    ],
    images: [
      "https://images.unsplash.com/photo-1548084557-a11f158252a9?w=800&q=80",
      "https://images.unsplash.com/photo-1562068391-2ccb2c3e7c2b?w=800&q=80",
    ],
    isNew: true,
  },
  {
    id: "basic-tshirt",
    name: { en: "Basic T-Shirt", ar: "تي شيرت أساسي" },
    category: { en: "Shirts", ar: "قمصان" },
    price: 29,
    description: {
      en: "Soft cotton t-shirt designed for everyday comfort.",
      ar: "تي شيرت قطني ناعم مصمم للراحة اليومية.",
    },
    details: [
      { en: "100% Cotton", ar: "قطن 100%" },
      { en: "Crew Neck", ar: "ياقة دائرية" },
      { en: "Regular Fit", ar: "قصة عادية" },
      { en: "Machine Wash", ar: "غسيل بالغسالة" },
    ],
    colors: [
      { name: { en: "White", ar: "أبيض" }, hex: "#FFFFFF" },
      { name: { en: "Black", ar: "أسود" }, hex: "#000000" },
      { name: { en: "Green", ar: "أخضر" }, hex: "#3A5A40" },
    ],
    sizes: [
      { en: "S", ar: "S" },
      { en: "M", ar: "M" },
      { en: "L", ar: "L" },
      { en: "XL", ar: "XL" },
    ],
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
      "https://images.unsplash.com/photo-1548883354-94bcfe321cbb?w=800&q=80",
    ],
  },
];
export const categories: Category[] = [
  {
    name: { en: "Outerwear", ar: "ملابس خارجية" },
    image:
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=900&q=80",
  },
  {
    name: { en: "Knitwear", ar: "ملابس صوفية" },
    image:
      "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=900&q=80",
  },
  {
    name: { en: "Accessories", ar: "إكسسوارات" },
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=900&q=80",
  },
];
export const allCategories: AllCategories[] = [
  { name: "all" },
  { name: "new" },
  { name: "outerwear" },
  { name: "dresses" },
  { name: "knitwear" },
  { name: "trousers" },
  { name: "shirts" },
  { name: "accessories" },
  { name: "footwear" },
];
export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function formatPrice(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}
export const translations = {
  en: {
    shop: "Shop",
    newArrivals: "New Arrivals",
    signIn: "Sign In",
    account: "Account",
  },
  ar: {
    shop: "المتجر",
    newArrivals: "وصل حديثًا",
    signIn: "تسجيل الدخول",
    account: "الحساب",
  },
} as const;

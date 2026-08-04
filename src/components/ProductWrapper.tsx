import { useLocale } from "next-intl";
import ProductItem from "./Product";
import { Product } from "@/lib/types";

function ProductWrapper({ product }: { product: Product }) {
  const locale = useLocale();
  const language: "en" | "ar" = locale === "ar" ? "ar" : "en";

  return <ProductItem language={language} product={product} />;
}

export default ProductWrapper;

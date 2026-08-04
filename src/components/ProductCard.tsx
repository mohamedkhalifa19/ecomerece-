import { Product } from "@/lib/types";
import ProductWrapper from "./ProductWrapper";

export default function ProductCard({ product }: { product: Product }) {
  return <ProductWrapper product={product} />;
}

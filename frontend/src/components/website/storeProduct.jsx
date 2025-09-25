// StoreProductPage.js (Server Component)
import StoreProduct from "@/components/website/StoreProduct";
import { getProductByCategory } from "@/library/api-calls";

export default async function StoreProductPage({ params }) {
  const data = await getProductByCategory(params?.category_slug);
  return <StoreProduct initialData={data} />;
}

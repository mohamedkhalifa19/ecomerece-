import { getCurrentUser } from "@/lib/server-actions";
import CheckoutPage from "./_components/CheckoutPage";

async function page() {
  const user = await getCurrentUser();
  return <CheckoutPage user={user} />;
}

export default page;

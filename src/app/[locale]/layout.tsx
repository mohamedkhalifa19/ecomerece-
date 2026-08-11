import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, Cairo } from "next/font/google";
import "../globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { CartProvider } from "@/lib/cart-context";
import { WishlistProvider } from "@/lib/wishlist-context";

import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Toaster } from "@/components/ui/sonner";
import ConnectionStatus from "@/components/ConnectionStatus";

// const plusJakarta = Plus_Jakarta_Sans({
//   variable: "--font-plus-jakarta",
//   subsets: ["latin"],
//   weight: ["500", "600", "700"],
// });

// const inter = Inter({
//   variable: "--font-inter",
//   subsets: ["latin"],
//   weight: ["400", "500", "600"],
// });
// const cairo = Cairo({
//   variable: "--font-cairo",
//   subsets: ["latin", "arabic"],
//   weight: ["400", "500", "600"],
// });
// export const metadata: Metadata = {
//   title: "Khalifa store",
//   description:
//     "A premium, editorial e-commerce experience: considered clothing cut from honest materials.",
// };

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "ar")) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();
  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body
        className={` antialiased ${locale === "ar" && "font-cairo!"}`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          {" "}
          <CartProvider>
            <WishlistProvider>
              <ConnectionStatus />

              <Header />
              <main className={`min-h-[60vh] `}>{children}</main>
              <Footer />
            </WishlistProvider>
          </CartProvider>
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";
import { useWishlist } from "@/lib/wishlist-context";
import { Heart, ShoppingCart, User2 } from "lucide-react";
import LanguageToggle from "./LanguageToggle";

const links = [
  { href: "/products", key: "shop" },
  { href: "/products?category=New", key: "newArrivals" },
] as const;

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("Header");

  const [menuOpen, setMenuOpen] = useState(false);

  const { itemCount } = useCart();
  const { user } = useAuth();
  const { ids: wishlistIds } = useWishlist();

  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-(--color-surface-bright)/90 backdrop-blur">
      <div className="container-editorial flex h-18 items-center justify-between">
        {/* Mobile Menu Button */}
        <button
          className="md:hidden -ml-2 p-2 text-on-surface"
          aria-label={t("toggleMenu")}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="mb-1.5 block h-px w-5 bg-current" />
          <span className="mb-1.5 block h-px w-5 bg-current" />
          <span className="block h-px w-5 bg-current" />
        </button>

        {/* Logo */}
        <Link
          href="/"
          className="hidden font-display text-[20px] font-semibold tracking-[-0.01em] text-on-surface md:block"
        >
          {t("logo")}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              onClick={() => router.replace(link.href)}
              className={`text-[14px] tracking-[0.02em] transition-colors ${
                pathname === link.href
                  ? "text-on-surface"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              {t(link.key)}
            </Link>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-5">
          <LanguageToggle />

          {/* Account */}
          <Link
            href="/account"
            aria-label={t("account")}
            className="hidden text-[14px] text-on-surface-variant transition-colors hover:text-on-surface sm:block"
          >
            {user ? user.name.split(" ")[0] : <User2 width={20} height={20} />}
          </Link>

          {/* Cart */}
          <Link
            href="/cart"
            aria-label={t("cart")}
            className="relative flex items-center gap-2 text-on-surface"
          >
            <ShoppingCart width={20} height={20} />

            {itemCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-on-primary">
                {itemCount}
              </span>
            )}
          </Link>

          {/* Wishlist */}
          <Link
            href="/wishlist"
            aria-label={t("wishlist")}
            className="relative flex items-center gap-2 text-on-surface"
          >
            <Heart width={20} height={20} />

            {wishlistIds.length > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-on-primary">
                {wishlistIds.length}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="flex flex-col gap-4 border-t border-hairline px-4 py-4 md:hidden">
          {links.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-[15px] text-on-surface"
            >
              {t(link.key)}
            </Link>
          ))}

          <Link
            href="/account"
            onClick={() => setMenuOpen(false)}
            className="text-[15px] text-on-surface"
          >
            {user ? t("account") : t("signIn")}
          </Link>

          <LanguageToggle />
        </nav>
      )}
    </header>
  );
}

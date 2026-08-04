# Khalifa store - ecomerece website (AR/EN)

A Next.js 16 (App Router) e-commerce storefront built to the **Ethereal Editorial** design system — pure black/white minimalism, Plus Jakarta Sans headlines, Inter body text, 8px spacing rhythm, and 12px "squircle" corners throughout.

## Pages

- `/` — Home (hero, shop-by-category, new arrivals, editorial feature, essentials grid)
- `/products` — Product listing with category filters + sorting
- `/products/[id]` — Product details (gallery, color/size selection, add to cart, related products)
- `/cart` — Shopping cart with quantity controls and order summary
- `/checkout` — 3-step checkout (shipping → payment → review) with order placement
- `/login` — Combined sign in / register form
- `/account` — Account overview, profile details, recent orders
- `/orders` — Full order history with expandable order detail

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Notes

- Cart and auth state persist to `localStorage` (client-only, demo-grade — no real backend).
- Login/checkout are mocked: any email/password works, no real payment is processed.
- Product imagery is sourced from Unsplash for placeholder purposes — swap in real product photography for production.
- Design tokens (colors, type scale, spacing, radius) live in `src/app/globals.css` as Tailwind v4 `@theme` variables, generated from the provided Ethereal Editorial design system.

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS v4

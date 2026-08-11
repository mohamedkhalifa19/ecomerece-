"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

import { useCart } from "@/lib/cart-context";
import { getProduct, formatPrice } from "@/lib/products";
import { createOrder } from "@/lib/server-actions";

import Button from "@/components/Button";

function Input({
  label,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[13px] font-medium text-on-surface">{label}</span>

      <input
        {...rest}
        required
        className="rounded-md border border-hairline bg-(--color-surface-container-lowest) px-4 py-3 text-[14px] text-on-surface outline-none transition-colors focus:border-primary"
      />
    </label>
  );
}

export default function CheckoutPage() {
  const t = useTranslations("Checkout");

  const { lines, subtotal, clearCart } = useCart();

  const router = useRouter();
  const locale = useLocale();

  const language: "en" | "ar" = locale === "ar" ? "ar" : "en";

  const [step, setStep] = useState(0);
  const [placing, setPlacing] = useState(false);

  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const steps = [t("steps.shipping"), t("steps.payment"), t("steps.review")];

  const shipping = subtotal > 0 ? (subtotal >= 500 ? 0 : 25) : 0;

  const total = subtotal + shipping;

  if (lines.length === 0 && !placing) {
    return (
      <div className="container-editorial py-24 text-center">
        <h1 className="text-[24px] font-semibold text-on-surface">
          {t("cartEmpty")}
        </h1>

        <p className="mt-2 text-[15px] text-on-surface-variant">
          {t("addBeforeCheckout")}
        </p>

        <Link href="/products" className="inline-block mt-8">
          <Button>{t("shopCollection")}</Button>
        </Link>
      </div>
    );
  }

  function updateShippingInfo(field: keyof typeof shippingInfo, value: string) {
    setShippingInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function handleContinue(e: FormEvent) {
    e.preventDefault();

    if (step < steps.length - 1) {
      setStep((s) => s + 1);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    try {
      setPlacing(true);

      const items = lines.map((line) => {
        const product = getProduct(line.productId);

        if (!product) {
          throw new Error(`Product ${line.productId} not found`);
        }

        const selectedColor = product.colors.find(
          (color) => color.name[language] === line.color,
        );

        return {
          productId: product.id,

          name: product.name[language],

          size: line.size,

          color:
            selectedColor?.name[language] ??
            product.colors[0]?.name[language] ??
            "",

          quantity: line.quantity,

          price: product.price,

          image: product.images[0],
        };
      });

      const order = await createOrder({
        total,

        address: {
          fullName: shippingInfo.fullName,
          phone: shippingInfo.phone,
          line1: shippingInfo.address,
          city: shippingInfo.city,
          postalCode: shippingInfo.postalCode,
          country: shippingInfo.country,
        },

        items,
      });

      clearCart();
      if (order) router.push(`/${locale}/orders/${order.id}?placed=1`);
    } catch (error) {
      console.error("Failed to create order:", error);

      setPlacing(false);
    }
  }

  return (
    <div className="container-editorial py-10 md:py-14">
      <h1 className="text-[32px] md:text-[40px] font-semibold tracking-[-0.01em] text-on-surface mb-4">
        {t("title")}
      </h1>

      {/* Steps */}

      <div className="flex items-center gap-3 mb-10 flex-wrap">
        {steps.map((stepName, i) => (
          <div key={stepName} className="flex items-center gap-3">
            <div
              className={`flex h-7 w-7 items-center justify-center rounded-full text-[12px] font-semibold ${
                i <= step
                  ? "bg-primary text-on-primary"
                  : "bg-product-surface text-on-surface-variant"
              }`}
            >
              {i + 1}
            </div>

            <span
              className={`text-[13px] ${
                i <= step ? "text-on-surface" : "text-on-surface-variant"
              }`}
            >
              {stepName}
            </span>

            {i < steps.length - 1 && <span className="w-8 h-px bg-hairline" />}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* FORM */}

        <form onSubmit={handleContinue} className="lg:col-span-2">
          {/* SHIPPING */}

          {step === 0 && (
            <div className="flex flex-col gap-5">
              <h2 className="text-[18px] font-semibold text-on-surface">
                {t("shippingAddress")}
              </h2>

              <div className="grid sm:grid-cols-2 gap-5">
                <Input
                  label={t("fullName")}
                  placeholder="Amina Farouk"
                  value={shippingInfo.fullName}
                  onChange={(e) =>
                    updateShippingInfo("fullName", e.target.value)
                  }
                />

                <Input
                  label={t("phone")}
                  placeholder="+20 100 000 0000"
                  type="tel"
                  value={shippingInfo.phone}
                  onChange={(e) => updateShippingInfo("phone", e.target.value)}
                />
              </div>

              <Input
                label={t("address")}
                placeholder="14 Corniche Street"
                value={shippingInfo.address}
                onChange={(e) => updateShippingInfo("address", e.target.value)}
              />

              <div className="grid sm:grid-cols-3 gap-5">
                <Input
                  label={t("city")}
                  placeholder="Talkha"
                  value={shippingInfo.city}
                  onChange={(e) => updateShippingInfo("city", e.target.value)}
                />

                <Input
                  label={t("postalCode")}
                  placeholder="35511"
                  value={shippingInfo.postalCode}
                  onChange={(e) =>
                    updateShippingInfo("postalCode", e.target.value)
                  }
                />

                <Input
                  label={t("country")}
                  placeholder="Egypt"
                  value={shippingInfo.country}
                  onChange={(e) =>
                    updateShippingInfo("country", e.target.value)
                  }
                />
              </div>
            </div>
          )}

          {/* PAYMENT */}

          {step === 1 && (
            <div className="flex flex-col gap-5">
              <h2 className="text-[18px] font-semibold text-on-surface">
                {t("paymentDetails")}
              </h2>

              <Input label={t("nameOnCard")} placeholder="Amina Farouk" />

              <Input
                label={t("cardNumber")}
                placeholder="4242 4242 4242 4242"
                inputMode="numeric"
              />

              <div className="grid sm:grid-cols-2 gap-5">
                <Input label={t("expiry")} placeholder="MM / YY" />

                <Input label={t("cvc")} placeholder="123" inputMode="numeric" />
              </div>

              <p className="text-[12px] text-on-surface-variant">
                {t("demoPayment")}
              </p>
            </div>
          )}

          {/* REVIEW */}

          {step === 2 && (
            <div className="flex flex-col gap-5">
              <h2 className="text-[18px] font-semibold text-on-surface">
                {t("reviewOrder")}
              </h2>

              {/* Shipping information */}

              <div className="rounded-md bg-surface-container-low p-5">
                <h3 className="font-medium mb-3">{t("shippingAddress")}</h3>

                <div className="text-sm text-on-surface-variant space-y-1">
                  <p>{shippingInfo.fullName}</p>

                  <p>{shippingInfo.phone}</p>

                  <p>{shippingInfo.address}</p>

                  <p>
                    {shippingInfo.city}, {shippingInfo.postalCode}
                  </p>

                  <p>{shippingInfo.country}</p>
                </div>
              </div>

              {/* Items */}

              {lines.map((line) => {
                const product = getProduct(line.productId);

                if (!product) return null;

                return (
                  <div
                    key={`${line.productId}-${line.size}-${line.color}`}
                    className="flex gap-4"
                  >
                    <img
                      src={product.images[0]}
                      alt=""
                      className="h-20 w-16 object-cover rounded-sm"
                    />

                    <div className="flex-1">
                      <p className="text-[14px] font-medium">
                        {product.name[language]}
                      </p>

                      <p className="text-[13px] text-on-surface-variant">
                        {line.color} · {t("size")} {line.size} · {t("qty")}{" "}
                        {line.quantity}
                      </p>
                    </div>

                    <p>{formatPrice(product.price * line.quantity)}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* BUTTONS */}

          <div className="mt-10 flex gap-4">
            {step > 0 && (
              <Button
                type="button"
                variant="secondary"
                onClick={() => setStep((s) => s - 1)}
                disabled={placing}
              >
                {t("back")}
              </Button>
            )}

            <Button type="submit" disabled={placing}>
              {placing
                ? t("placingOrder")
                : step === steps.length - 1
                  ? t("placeOrder")
                  : t("continue")}
            </Button>
          </div>
        </form>

        {/* ORDER SUMMARY */}

        <div className="lg:col-span-1">
          <div className="rounded-md bg-surface-container-low p-6 sticky top-24">
            <h2 className="text-[16px] font-semibold mb-4">
              {t("orderSummary")}
            </h2>

            <div className="flex justify-between mb-2">
              <span>{t("subtotal")}</span>

              <span>{formatPrice(subtotal)}</span>
            </div>

            <div className="flex justify-between mb-4">
              <span>{t("shipping")}</span>

              <span>{shipping === 0 ? t("free") : formatPrice(shipping)}</span>
            </div>

            <div className="flex justify-between border-t pt-4 font-semibold">
              <span>{t("total")}</span>

              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

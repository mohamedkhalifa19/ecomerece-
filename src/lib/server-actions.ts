"use server";

import { mapLoginError, mapRegisterError } from "@/helpers";
import { createClient } from "@/lib/server";
import { supabaseAdmin } from "@/utils/supabase/admin";
import { getLocale } from "next-intl/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "./prisma";
import { Item } from "./types";

export async function login(formData: FormData): Promise<void> {
  const supabase = await createClient();
  const lang = await getLocale();
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    throw new Error(mapLoginError(error.message));
  }
  revalidatePath(`/${lang}/account`);

  redirect(`/${lang}/account`);
}

export async function register(formData: FormData) {
  const supabase = await createClient();

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const address = String(formData.get("address") ?? "").trim();

  if (!name || !email || !password) {
    throw new Error("Please fill in all required fields.");
  }

  const locale = await getLocale();
  const redirectUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/verify-email`;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        address,
      },
    },
  });
  const exists = await userExists(email);

  if (exists) {
    throw new Error(mapRegisterError("emailAlreadyRegistered"));
  }
  if (error) {
    throw new Error(mapRegisterError(error.message));
  }

  // Email confirmation is required
  if (data.user && !data.session) {
    // redirect(`/${locale}/verify-email`);
    return {
      success: true,
      requiresEmailConfirmation: true,
    };
  }

  // Email confirmation is disabled
  if (data.user && data.session) {
    redirect(`/${locale}/account`);
  }
  return {
    success: true,
    requiresEmailConfirmation: false,
  };
}
export async function resendVerificationEmail(formData: FormData) {
  const supabase = await createClient();

  const email = String(formData.get("email") ?? "");

  if (!email) {
    throw new Error("Email is required");
  }

  const { error } = await supabase.auth.resend({
    type: "signup",
    email,
  });

  if (error) {
    throw new Error(error.message);
  }
}
export async function getCurrentUser() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  const metadata = user.user_metadata ?? {};

  const rawName =
    metadata.name ??
    metadata.full_name ??
    user.email?.split("@")[0].replace(/[._]/g, " ") ??
    "Member";

  return {
    id: user.id,
    name: rawName.charAt(0).toUpperCase() + rawName.slice(1),
    email: user.email ?? "",
    address: metadata.address ?? "",
    date: user.created_at ?? "",
  };
}

export async function logout(): Promise<void> {
  const supabase = await createClient();
  const lang = await getLocale();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Logout error:", error);
    throw new Error("Unable to sign out");
  }

  revalidatePath(`/${lang}/account`);

  redirect(`/${lang}/login`);
}
export async function userExists(email: string) {
  const {
    data: { users },
    error,
  } = await supabaseAdmin.auth.admin.listUsers();
  if (error) {
    throw new Error(error.message);
  }

  return users.some(
    (user) => user.email?.toLowerCase() === email.toLowerCase(),
  );
}
export async function resetPassword(email: string) {
  const supabase = await createClient();
  const locale = await getLocale();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/auth/callback?next=/${locale}/reset-password`,
  });
  const exists = await userExists(email);
  if (!exists) {
    throw new Error("emailNotFound");
  }
  if (error) {
    throw new Error(error.message);
  }
}
export async function updatePassword(password: string) {
  const supabase = await createClient();
  const locale = await getLocale();
  const { error } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    throw new Error(error.message);
  }
  redirect(`/${locale}/login`);
}
type CreateOrderItem = {
  productId: string;
  name: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
  image: string;
};

type CreateOrderData = {
  total: number;

  address: {
    fullName: string;
    phone: string;
    line1: string;
    city: string;
    postalCode: string;
    country: string;
  };

  items: CreateOrderItem[];
};

export async function createOrder(data: CreateOrderData) {
  if (!data.items.length) {
    throw new Error("Order must contain at least one item");
  }
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;
  console.log(user);
  const order = await prisma.order.create({
    data: {
      total: data.total,

      userId: user.id,

      address: {
        create: {
          fullName: data.address.fullName,
          phone: data.address.phone,
          line1: data.address.line1,
          city: data.address.city,
          postalCode: data.address.postalCode,
          country: data.address.country,
        },
      },

      items: {
        create: data.items.map((item:Item) => ({
          productId: item.productId,
          name: item.name,
          size: item.size,
          color: item.color,
          quantity: item.quantity,
          price: item.price,
          image: item.image,
        })),
      },
    },

    include: {
      address: true,
      items: true,
    },
  });

  return order;
}

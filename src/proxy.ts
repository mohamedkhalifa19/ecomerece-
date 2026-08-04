import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";
import { routing } from "@/i18n/routing";

const intlProxy = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  return intlProxy(request);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};

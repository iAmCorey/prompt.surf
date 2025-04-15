import { NextRequest, 
  // NextResponse
 } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { appConfig } from "./lib/appConfig";

const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: appConfig.i18n.locales,
 
  // Used when no locale matches
  defaultLocale: appConfig.i18n.defaultLocale,
  localePrefix: "as-needed",
});

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;


  // return NextResponse.next();
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/((?!api|_next|.*\\..*).*)",
    // '/', 
    // '/:locale?/:path*',
    
  ],
};
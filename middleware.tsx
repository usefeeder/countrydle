import { type NextRequest, NextResponse } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { cookies } from "next/headers";

const locales = ["en-US", "pt-BR"];

function getLocale(request: NextRequest) {
	const headers = {
		"accept-language": request.headers.get("accept-language") || "",
	};

	const languages = new Negotiator({ headers }).languages();
	const defaultLocale = "pt-BR";
	return match(languages, locales, defaultLocale);
}

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const pathnameHasLocale = locales.some(
		(locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
	);

	if (pathnameHasLocale) return;

	const cookieLocale = cookies().get("locale");
	const locale = cookieLocale?.value || getLocale(request);
	request.nextUrl.pathname = `/${locale}${pathname}`;
	return NextResponse.redirect(request.nextUrl);
}

export const config = {
	matcher: ["/((?!api|static|.*\\..*|_next).*)"],
};

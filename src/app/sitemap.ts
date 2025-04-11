import type { MetadataRoute } from "next";
import { appConfig } from "@/lib/appConfig"

const baseUrl = appConfig.domain;
const locales = Object.values(appConfig.i18n.locales);
const defaultLocale = appConfig.i18n.defaultLocale;

const staticMarketingPages = [
	"",
	"/explore",
	"/search",
  "/model",
  "/category",
  "/tag",
  "/prompt",
  "/article",
  "/changelog",
]

export default function sitemap(): MetadataRoute.Sitemap {
  console.log("sitemap start");
  const sitemapList: MetadataRoute.Sitemap = []; // final result
  sitemapList.push(...staticMarketingPages.flatMap((page) =>
    locales.map((locale) => ({
      url: new URL(`${locale === defaultLocale ? "" : `/${locale}`}${page}`, baseUrl).href,
      lastModified: new Date(),
    }))
  ));

  console.log("sitemap end, size:", sitemapList.length);
	return sitemapList;
}

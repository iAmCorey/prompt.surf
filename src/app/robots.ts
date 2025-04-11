import type { MetadataRoute } from "next";
import { appConfig } from "@/lib/appConfig";

const BASE_URL = appConfig.domain;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/*",
        "/admin/*",
        "/_next/*",
        "/*.json$",
        "/cdn-cgi/*",
      ]
    },
    sitemap: `${BASE_URL}sitemap.xml`,
  };
}

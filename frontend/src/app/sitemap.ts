import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const BASE_URL = "https://kgd-rental.ru";

// Внутренние пути (ключи pathnames в routing.ts)
const routes: Array<keyof typeof routing.pathnames> = [
  "/",
  "/cars",
  "/services",
  "/terms",
  "/contacts",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return routes.flatMap((route) =>
    routing.locales.map((locale) => {
      // Получаем локализованный URL из pathnames
      const path = routing.pathnames[route];
      const localizedPath =
        typeof path === "string"
          ? path
          : (path as Record<string, string>)[locale];

      const url = `${BASE_URL}/${locale}${localizedPath === "/" ? "" : localizedPath}`;

      return {
        url,
        lastModified: now,
        changeFrequency: route === "/" ? ("daily" as const) : ("weekly" as const),
        priority: route === "/" ? 1 : 0.7,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((l) => {
              const p = routing.pathnames[route];
              const lp = typeof p === "string" ? p : (p as Record<string, string>)[l];
              return [l, `${BASE_URL}/${l}${lp === "/" ? "" : lp}`];
            })
          ),
        },
      };
    })
  );
}
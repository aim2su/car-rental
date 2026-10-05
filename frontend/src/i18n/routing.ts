import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ru", "en"],
  defaultLocale: "ru",
  localePrefix: "always",
  localeDetection: false,
  pathnames: {
    "/": "/",
    "/cars": { ru: "/avtomobili", en: "/cars" },
    "/cars/[id]": { ru: "/avtomobili/[id]", en: "/cars/[id]" },
    "/booking": { ru: "/bronirovanie", en: "/booking" },
    "/services": { ru: "/uslugi", en: "/services" },
    "/terms": { ru: "/usloviya-arendy", en: "/terms" },
    "/contacts": { ru: "/kontakty", en: "/contacts" },
  },
});

export type Locale = (typeof routing.locales)[number];
export type AppPathname = keyof typeof routing.pathnames;

// Только статические пути (без динамических типа /cars/[id])
export type StaticPathname = Exclude<AppPathname, `${string}[${string}`>;
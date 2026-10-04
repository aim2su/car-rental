import { defineRouting } from "next-intl/routing";

/**
 * Конфиг локалей и ЧПУ.
 *
 * Ключ pathnames — это ИМЯ ПАПКИ в app/[locale]/  (напр. "cars" → app/[locale]/cars/)
 * Значение — URL, который видит пользователь (для каждой локали свой).
 *
 * Т.е.:
 *   файл:  app/[locale]/cars/page.tsx
 *   RU URL: /ru/avtomobili
 *   EN URL: /en/cars
 */
export const routing = defineRouting({
  locales: ["ru", "en"],
  defaultLocale: "ru",
  localePrefix: "always",       // всегда с префиксом /ru или /en
  localeDetection: false,       // не редиректить по Accept-Language — фиксированно на /ru
  pathnames: {
    "/":         "/",
    "/cars":     { ru: "/avtomobili",       en: "/cars" },
    "/services": { ru: "/uslugi",           en: "/services" },
    "/terms":    { ru: "/usloviya-arendy",  en: "/terms" },
    "/contacts": { ru: "/kontakty",         en: "/contacts" },
  },
});

export type Locale = (typeof routing.locales)[number];
export type AppPathname = keyof typeof routing.pathnames;
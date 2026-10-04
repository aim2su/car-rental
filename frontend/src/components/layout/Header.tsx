"use client";

import Image from "next/image";
import { Phone, Clock } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button-variants";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { MobileMenu } from "./MobileMenu";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", key: "home" },
  { href: "/cars", key: "cars" },
  { href: "/services", key: "services" },
  { href: "/terms", key: "terms" },
  { href: "/contacts", key: "contacts" },
] as const;

const socials = [
  {
    key: "whatsapp",
    src: "/social/whatsapp.png",
    href: "https://api.whatsapp.com/send/?phone=79969592279&text&type=phone_number&app_absent=0",
    label: "WhatsApp",
  },
  {
    key: "telegram",
    src: "/social/telegram.png",
    href: "https://t.me/GreenCar39",
    label: "Telegram",
  },
  {
    key: "avito",
    src: "/social/avito.png",
    href: "https://www.avito.ru/brands/81081288a8f7291e52b4fca47e9a80b8/items/all/predlozheniya_uslug?s=profile_search_show_all&sellerId=889046354a08ebdbf1501c57e0a20c73",
    label: "Avito",
  },
  {
    key: "max",
    src: "/social/max.png",
    href: "https://max.ru/u/f9LHodD0cOIJ64h4UPpbJnpTrzmi4HtSYqq0iVx3GaZZe5xcTw5Q7wrvBss",
    label: "Max",
  },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const th = useTranslations("header");
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/70 backdrop-blur-lg shadow-sm">
      {/* ===== Верхняя полоска — только PC ===== */}
      <div className="hidden md:block border-b border-border/50 bg-primary-50/40 backdrop-blur-md">
        <div className="container-page flex h-10 items-center justify-between text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-primary-700" />
            {th("workHours")}
          </span>

          <div className="flex items-center gap-4">
            {/* Соцсети */}
            <div className="flex items-center gap-1.5">
              {socials.map(({ key, src, href, label }) => (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="inline-flex h-7 w-7 items-center justify-center rounded-md hover:bg-background/70 hover:scale-110 transition-all"
                >
                  <Image
                    src={src}
                    alt={label}
                    width={100}
                    height={100}
                    className="h-4 w-4 object-contain"
                  />
                </a>
              ))}
            </div>

            {/* Разделитель */}
            <span className="h-4 w-px bg-border" aria-hidden />

            {/* Телефон */}
            <a
              href={`tel:${th("phone").replace(/[^+\d]/g, "")}`}
              className="inline-flex items-center gap-1.5 font-medium text-foreground hover:text-primary-800"
            >
              <Phone className="h-3.5 w-3.5 text-primary-700" />
              {th("phone")}
            </a>
          </div>
        </div>
      </div>

      {/* ===== Основная строка ===== */}
      <div className="container-page flex h-16 items-center justify-between gap-3">
        <Link
          href="/"
          className="flex items-center gap-2.5 shrink-0"
          aria-label="Green Car"
        >
          <Image
            src="/logo.png"
            alt="Green Car"
            width={240}
            height={216}
            priority
            className="h-10 w-auto object-contain"
          />
          <span className="text-lg font-extrabold text-foreground tracking-tight">
            Green Car
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary-50 text-primary-800 font-semibold"
                    : "text-foreground/80 hover:bg-primary-50 hover:text-primary-800"
                )}
              >
                {t(item.key)}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <LocaleSwitcher />

          <Link
            href="/booking"
            className={cn(
              buttonVariants({ variant: "primary", size: "md" }),
              "hidden sm:inline-flex"
            )}
          >
            {t("book")}
          </Link>

          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
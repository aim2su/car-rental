"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

const items = [
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

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const t = useTranslations("nav");
  const th = useTranslations("header");
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  }

  const overlay = open ? (
    <div className="fixed inset-0 z-[100] lg:hidden">
      <div
        className="absolute inset-0 bg-black/60"
        onClick={() => setOpen(false)}
        aria-hidden
      />
      <div
        className="absolute right-0 top-0 h-full w-[85%] max-w-sm flex flex-col p-6 shadow-2xl overflow-y-auto"
        style={{ backgroundColor: "#ffffff" }}
      >
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5"
            aria-label="Green Car"
          >
            <Image
              src="/logo.png"
              alt="Green Car"
              width={240}
              height={216}
              className="h-9 w-auto object-contain"
            />
            <span className="text-base font-extrabold text-foreground tracking-tight">
              Green Car
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg hover:bg-ink-100"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex flex-col gap-1">
          {items.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-lg px-4 py-3 text-base font-medium transition-colors",
                  active
                    ? "bg-primary-50 text-primary-800 font-semibold"
                    : "text-ink-800 hover:bg-primary-50 hover:text-primary-800"
                )}
              >
                {t(item.key)}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto space-y-5 pt-8 border-t border-ink-100">
          {/* Соцсети — по центру */}
          <div className="flex items-center justify-center gap-4">
            {socials.map(({ key, src, href, label }) => (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                className="inline-flex h-10 w-10 items-center justify-center hover:scale-110 transition-transform"
              >
                <Image
                  src={src}
                  alt={label}
                  width={100}
                  height={100}
                  className="h-10 w-10 object-contain"
                />
              </a>
            ))}
          </div>

          <div className="text-sm text-ink-600 text-center">{th("workHours")}</div>
          <a
            href={`tel:${th("phone").replace(/[^+\d]/g, "")}`}
            className="block text-lg font-bold text-primary-800 text-center"
          >
            {th("phone")}
          </a>
          <Link
            href="/booking"
            onClick={() => setOpen(false)}
            className={cn(buttonVariants({ variant: "primary", size: "md" }), "w-full")}
          >
            {t("book")}
          </Link>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-ink-200 text-ink-800 hover:bg-ink-50"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {mounted && typeof document !== "undefined" && overlay
        ? createPortal(overlay, document.body)
        : null}
    </>
  );
}
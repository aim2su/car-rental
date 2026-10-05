"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useTransition, useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { StaticPathname } from "@/i18n/routing";

export function LocaleSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const rawPathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Приводим к статическому типу (без /cars/[id]) — этого достаточно для переключения локали
  const pathname = rawPathname as StaticPathname;

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function switchTo(next: "ru" | "en") {
    if (next === locale) {
      setOpen(false);
      return;
    }
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
    setOpen(false);
  }

  return (
    <div className={cn("relative", className)} ref={ref}>
      <div className="hidden sm:inline-flex items-center rounded-lg border border-ink-200 bg-white p-0.5 text-xs font-semibold">
        {(["ru", "en"] as const).map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => switchTo(l)}
            disabled={isPending}
            className={cn(
              "rounded-md px-2.5 py-1 transition-colors",
              locale === l
                ? "bg-primary-700 text-white"
                : "text-ink-600 hover:text-primary-800"
            )}
            aria-label={`Switch to ${l.toUpperCase()}`}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="sm:hidden inline-flex items-center gap-1 rounded-lg border border-ink-200 bg-white px-2.5 py-1.5 text-xs font-bold text-ink-800"
        aria-label="Change language"
      >
        {locale.toUpperCase()}
        <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div className="sm:hidden absolute right-0 top-full mt-1 z-50 min-w-[100px] rounded-lg border border-ink-100 bg-white shadow-lg py-1">
          {(["ru", "en"] as const).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => switchTo(l)}
              disabled={isPending}
              className={cn(
                "flex w-full items-center justify-between gap-2 px-3 py-2 text-xs font-semibold transition-colors",
                locale === l
                  ? "text-primary-800 bg-primary-50"
                  : "text-ink-700 hover:bg-ink-50"
              )}
            >
              {l.toUpperCase()}
              {locale === l && <Check className="h-3 w-3 text-primary-700" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
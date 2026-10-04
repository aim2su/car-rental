"use client";

import { useRouter, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Slider } from "@/components/ui/Slider";
import { brands, priceBounds, yearBounds } from "@/lib/cars-data";
import { formatPrice, cn } from "@/lib/utils";
import type { BodyType, Transmission } from "@/types/car";

const bodyTypeOptions: BodyType[] = [
  "suv",
  "cabriolet",
  "liftback",
  "minivan",
  "sedan",
  "hatchback",
];

const transmissionOptions: Transmission[] = [
  "automatic",
  "variator",
  "manual",
  "robot",
];

const bodyTypeLabels: Record<BodyType, string> = {
  suv: "Внедорожник",
  cabriolet: "Кабриолет",
  liftback: "Лифтбек",
  minivan: "Минивэн",
  sedan: "Седан",
  hatchback: "Хэтчбэк",
};

const transmissionLabels: Record<Transmission, string> = {
  automatic: "Автомат",
  variator: "Вариатор",
  manual: "Механика",
  robot: "Робот",
};

export type FiltersState = {
  brands: string[];
  bodyTypes: BodyType[];
  transmissions: Transmission[];
  yearMin: number;
  yearMax: number;
  priceMin: number;
  priceMax: number;
};

export const emptyFilters: FiltersState = {
  brands: [],
  bodyTypes: [],
  transmissions: [],
  yearMin: yearBounds.min,
  yearMax: yearBounds.max,
  priceMin: priceBounds.min,
  priceMax: priceBounds.max,
};

const BRAND_LIMIT = 8;

type OpenPanel = "brand" | "body" | "transmission" | "year" | "price" | null;

export function Filters({
  initial,
  onClose,
  forceVisible = false,
}: {
  initial: FiltersState;
  onClose?: () => void;
  forceVisible?: boolean;
}) {
  const t = useTranslations("filters");
  const tcar = useTranslations("car");
  const router = useRouter();
  const pathname = usePathname();

  const [visible, setVisible] = useState(forceVisible);
  const [open, setOpen] = useState<OpenPanel>(null);
  const [state, setState] = useState<FiltersState>({
    ...emptyFilters,
    ...initial,
  });

  useEffect(() => {
    setState({ ...emptyFilters, ...initial });
  }, [initial]);

  // Если onClose передан — фильтры всегда видны (это мобильный режим)
  const isMobileSheet = Boolean(onClose);
  const showPanel = isMobileSheet || visible;

  function toggle<T>(arr: T[], val: T): T[] {
    return arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val];
  }

  function apply() {
    const params = new URLSearchParams();
    if (state.brands.length) params.set("brand", state.brands.join(","));
    if (state.bodyTypes.length) params.set("body", state.bodyTypes.join(","));
    if (state.transmissions.length) params.set("tr", state.transmissions.join(","));
    if (state.yearMin > yearBounds.min) params.set("ymin", String(state.yearMin));
    if (state.yearMax < yearBounds.max) params.set("ymax", String(state.yearMax));
    if (state.priceMin > priceBounds.min) params.set("pmin", String(state.priceMin));
    if (state.priceMax < priceBounds.max) params.set("pmax", String(state.priceMax));
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
    setOpen(null);
    onClose?.();
  }

  function reset() {
    setState(emptyFilters);
    router.push(pathname);
    setOpen(null);
  }

  function activeCount() {
    return (
      state.brands.length +
      state.bodyTypes.length +
      state.transmissions.length +
      (state.yearMin > yearBounds.min || state.yearMax > yearBounds.min ? 0 : 0) +
      (state.yearMin > yearBounds.min || state.yearMax < yearBounds.max ? 1 : 0) +
      (state.priceMin > priceBounds.min || state.priceMax < priceBounds.max ? 1 : 0)
    );
  }

  const count = activeCount();

  return (
    <div className="space-y-2">
      {/* ===== Ссылка «Показать / Скрыть фильтры» — только для десктопа (не в мобильном sheet) ===== */}
      {!isMobileSheet && (
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700 hover:text-primary-800 underline-offset-4 hover:underline"
        >
          <SlidersHorizontal className="h-4 w-4" />
          {visible ? "Скрыть фильтры" : "Показать фильтры"}
          {count > 0 && (
            <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary-700 px-1.5 text-[10px] font-bold text-white">
              {count}
            </span>
          )}
          {visible ? (
            <ChevronUp className="h-3.5 w-3.5" />
          ) : (
            <ChevronDown className="h-3.5 w-3.5" />
          )}
        </button>
      )}

      {/* ===== Сворачиваемая панель ===== */}
      {showPanel && (
        <div className="rounded-2xl border border-border bg-background shadow-card animate-in fade-in slide-in-from-top-1 duration-200">
          {/* Заголовок для мобильного sheet */}
          {isMobileSheet && (
            <div className="flex items-center justify-between border-b border-border p-3">
              <div className="inline-flex items-center gap-1.5 text-sm font-bold text-foreground">
                <SlidersHorizontal className="h-4 w-4 text-primary-700" />
                {t("title")}
                {count > 0 && (
                  <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary-700 px-1.5 text-[10px] font-bold text-white">
                    {count}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => onClose?.()}
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg hover:bg-muted"
                aria-label="Close filters"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* Чипы + действия */}
          <div className="flex flex-wrap items-center gap-1.5 p-3">
            <FilterChip
              label={t("brand")}
              active={state.brands.length > 0}
              isOpen={open === "brand"}
              onClick={() => setOpen(open === "brand" ? null : "brand")}
            />
            <FilterChip
              label={t("body")}
              active={state.bodyTypes.length > 0}
              isOpen={open === "body"}
              onClick={() => setOpen(open === "body" ? null : "body")}
            />
            <FilterChip
              label={t("transmission")}
              active={state.transmissions.length > 0}
              isOpen={open === "transmission"}
              onClick={() => setOpen(open === "transmission" ? null : "transmission")}
            />
            <FilterChip
              label={t("year")}
              active={state.yearMin > yearBounds.min || state.yearMax < yearBounds.max}
              isOpen={open === "year"}
              onClick={() => setOpen(open === "year" ? null : "year")}
            />
            <FilterChip
              label={t("price")}
              active={state.priceMin > priceBounds.min || state.priceMax < priceBounds.max}
              isOpen={open === "price"}
              onClick={() => setOpen(open === "price" ? null : "price")}
            />

            <div className="ml-auto flex items-center gap-1.5">
              <Button type="button" onClick={reset} variant="ghost" size="sm">
                {t("reset")}
              </Button>
              <Button type="button" onClick={apply} variant="primary" size="sm">
                {t("apply")}
              </Button>
            </div>
          </div>

          {/* Раскрытая панель */}
          {open && (
            <div className="border-t border-border p-3">
              {open === "brand" && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-5 gap-y-2">
                  {brands.slice(0, BRAND_LIMIT).map((b) => (
                    <label key={b} className="flex items-center gap-2 cursor-pointer select-none">
                      <Checkbox
                        checked={state.brands.includes(b)}
                        onCheckedChange={() =>
                          setState((s) => ({ ...s, brands: toggle(s.brands, b) }))
                        }
                      />
                      <span className="text-sm text-foreground/80 truncate">{b}</span>
                    </label>
                  ))}
                </div>
              )}

              {open === "body" && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-5 gap-y-2">
                  {bodyTypeOptions.map((bt) => (
                    <label key={bt} className="flex items-center gap-2 cursor-pointer select-none">
                      <Checkbox
                        checked={state.bodyTypes.includes(bt)}
                        onCheckedChange={() =>
                          setState((s) => ({ ...s, bodyTypes: toggle(s.bodyTypes, bt) }))
                        }
                      />
                      <span className="text-sm text-foreground/80">{bodyTypeLabels[bt]}</span>
                    </label>
                  ))}
                </div>
              )}

              {open === "transmission" && (
                <div className="grid grid-cols-2 gap-x-5 gap-y-2">
                  {transmissionOptions.map((tr) => (
                    <label key={tr} className="flex items-center gap-2 cursor-pointer select-none">
                      <Checkbox
                        checked={state.transmissions.includes(tr)}
                        onCheckedChange={() =>
                          setState((s) => ({ ...s, transmissions: toggle(s.transmissions, tr) }))
                        }
                      />
                      <span className="text-sm text-foreground/80">{transmissionLabels[tr]}</span>
                    </label>
                  ))}
                </div>
              )}

              {open === "year" && (
                <div className="px-1 py-1">
                  <Slider
                    min={yearBounds.min}
                    max={yearBounds.max}
                    step={1}
                    value={[state.yearMin, state.yearMax]}
                    onValueChange={([lo, hi]) =>
                      setState((s) => ({ ...s, yearMin: lo, yearMax: hi }))
                    }
                  />
                  <div className="mt-2 flex items-center justify-between text-xs font-semibold text-foreground/80">
                    <span>{state.yearMin}</span>
                    <span>{state.yearMax}</span>
                  </div>
                </div>
              )}

              {open === "price" && (
                <div className="px-1 py-1">
                  <Slider
                    min={priceBounds.min}
                    max={priceBounds.max}
                    step={100}
                    value={[state.priceMin, state.priceMax]}
                    onValueChange={([lo, hi]) =>
                      setState((s) => ({ ...s, priceMin: lo, priceMax: hi }))
                    }
                  />
                  <div className="mt-2 flex items-center justify-between text-xs font-semibold text-foreground/80">
                    <span>{formatPrice(state.priceMin)}</span>
                    <span>{formatPrice(state.priceMax)}</span>
                  </div>
                  <div className="mt-0.5 text-[11px] text-muted-foreground">
                    за {tcar("perDay")}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function FilterChip({
  label,
  active,
  isOpen,
  onClick,
}: {
  label: string;
  active: boolean;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-sm font-medium transition-colors",
        isOpen
          ? "border-primary-700 bg-primary-700 text-white"
          : active
          ? "border-primary-700 bg-primary-50 text-primary-800"
          : "border-border bg-background text-foreground/80 hover:border-primary-300"
      )}
    >
      {label}
      <ChevronDown
        className={cn("h-3.5 w-3.5 transition-transform", isOpen && "rotate-180")}
      />
    </button>
  );
}
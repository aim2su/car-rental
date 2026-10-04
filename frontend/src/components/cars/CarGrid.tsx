"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { CarCard } from "./CarCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import type { Car } from "@/types/car";

type Sort = "popular" | "priceAsc" | "priceDesc";

export function CarGrid({ cars }: { cars: Car[] }) {
  const t = useTranslations("filters");
  const [sort, setSort] = useState<Sort>("popular");

  const sorted = useMemo(() => {
    const arr = [...cars];
    switch (sort) {
      case "priceAsc":
        return arr.sort((a, b) => a.pricePerDay - b.pricePerDay);
      case "priceDesc":
        return arr.sort((a, b) => b.pricePerDay - a.pricePerDay);
      default:
        return arr.sort((a, b) => Number(b.popular) - Number(a.popular));
    }
  }, [cars, sort]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="text-sm text-ink-600">
          {t("found")}: <strong className="text-ink-900">{sorted.length}</strong>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-ink-500">{t("sort")}:</span>
          <Select value={sort} onValueChange={(v) => setSort(v as Sort)}>
            <SelectTrigger className="h-9 w-48 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">{t("sortPopular")}</SelectItem>
              <SelectItem value="priceAsc">{t("sortPriceAsc")}</SelectItem>
              <SelectItem value="priceDesc">{t("sortPriceDesc")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {sorted.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-ink-200 bg-ink-50 p-10 text-center">
          <p className="text-sm text-ink-600">{t("nothing")}</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {sorted.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      )}
    </div>
  );
}

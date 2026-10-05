"use client";

import { useState } from "react";
import { Calendar, MapPin, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

const today = new Date().toISOString().split("T")[0];
const in3Days = new Date(Date.now() + 3 * 86400000).toISOString().split("T")[0];

export function SearchBar() {
  const t = useTranslations("search");
  const router = useRouter();
  const [pickup, setPickup] = useState(today);
  const [returnDate, setReturnDate] = useState(in3Days);
  const [carClass, setCarClass] = useState("all");
  const [transmission, setTransmission] = useState("all");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (pickup) params.set("from", pickup);
    if (returnDate) params.set("to", returnDate);
    if (carClass !== "all") params.set("class", carClass);
    if (transmission !== "all") params.set("tr", transmission);
    router.push({ pathname: "/cars", query: Object.fromEntries(params) });
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-ink-100 bg-white p-5 sm:p-6 shadow-card-hover"
    >
      <div className="mb-5">
        <h2 className="text-lg font-bold text-ink-900">{t("title")}</h2>
        <p className="mt-1 text-sm text-ink-500">{t("subtitle")}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t("pickupDate")} icon={<Calendar className="h-3.5 w-3.5" />}>
          <Input
            type="date"
            value={pickup}
            min={today}
            onChange={(e) => setPickup(e.target.value)}
          />
        </Field>

        <Field label={t("returnDate")} icon={<Calendar className="h-3.5 w-3.5" />}>
          <Input
            type="date"
            value={returnDate}
            min={pickup}
            onChange={(e) => setReturnDate(e.target.value)}
          />
        </Field>

        <Field label={t("class")}>
          <Select value={carClass} onValueChange={setCarClass}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("anyClass")}</SelectItem>
              <SelectItem value="economy">Эконом</SelectItem>
              <SelectItem value="comfort">Комфорт</SelectItem>
              <SelectItem value="business">Бизнес</SelectItem>
              <SelectItem value="suv">Внедорожник</SelectItem>
              <SelectItem value="premium">Премиум</SelectItem>
              <SelectItem value="minivan">Минивэн</SelectItem>
            </SelectContent>
          </Select>
        </Field>

        <Field label={t("transmission")}>
          <Select value={transmission} onValueChange={setTransmission}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("anyTransmission")}</SelectItem>
              <SelectItem value="automatic">{t("automatic")}</SelectItem>
              <SelectItem value="manual">{t("manual")}</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      </div>

      <div className="mt-5">
        <Field label={t("pickupPlace")} icon={<MapPin className="h-3.5 w-3.5" />}>
          <Input defaultValue="Калининград, офис на Гагарина, 100" />
        </Field>
      </div>

      <Button type="submit" size="lg" variant="primary" className="mt-6 w-full">
        <Search className="h-4 w-4" />
        {t("submit")}
      </Button>
    </form>
  );
}

function Field({
  label,
  icon,
  children,
}: {
  label: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-ink-600">
        {icon}
        {label}
      </span>
      {children}
    </label>
  );
}

"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { formatPrice, cn } from "@/lib/utils";
import type { Car } from "@/types/car";

type Props = {
  car?: Car;
  defaultStartDate?: string;
  defaultEndDate?: string;
};

type Errors = Partial<
  Record<"name" | "phone" | "startDate" | "startTime" | "endDate" | "endTime" | "comment", string>
>;

const todayISO = () => new Date().toISOString().split("T")[0];
const plusDaysISO = (days: number) =>
  new Date(Date.now() + days * 86400000).toISOString().split("T")[0];

export function BookingForm({ car, defaultStartDate, defaultEndDate }: Props) {
  const t = useTranslations("booking");
  const formRef = useRef<HTMLFormElement>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [startDate, setStartDate] = useState(defaultStartDate ?? todayISO());
  const [startTime, setStartTime] = useState("10:00");
  const [endDate, setEndDate] = useState(defaultEndDate ?? plusDaysISO(3));
  const [endTime, setEndTime] = useState("10:00");
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  const days = useMemo(() => {
    if (!startDate || !endDate) return 0;
    const a = new Date(`${startDate}T${startTime || "00:00"}`).getTime();
    const b = new Date(`${endDate}T${endTime || "00:00"}`).getTime();
    if (Number.isNaN(a) || Number.isNaN(b) || b <= a) return 0;
    return Math.max(1, Math.ceil((b - a) / 86400000));
  }, [startDate, startTime, endDate, endTime]);

  function validate(): Errors {
    const e: Errors = {};

    if (name.trim().length < 2) {
      e.name = t("errors.name");
    }

    const digits = phone.replace(/\D/g, "");
    if (digits.length < 9 || digits.length > 20) {
      e.phone = t("errors.phone");
    }

    if (!startDate) e.startDate = t("errors.required");
    if (!endDate) e.endDate = t("errors.required");
    if (!isValidTime(startTime)) e.startTime = t("errors.time");
    if (!isValidTime(endTime)) e.endTime = t("errors.time");

    if (startDate && endDate && startTime && endTime) {
      const a = new Date(`${startDate}T${startTime}`).getTime();
      const b = new Date(`${endDate}T${endTime}`).getTime();
      if (Number.isFinite(a) && Number.isFinite(b) && b <= a) {
        e.endDate = t("errors.endBeforeStart");
      }
    }

    if (comment.length > 300) {
      e.comment = t("errors.comment");
    }

    return e;
  }

  function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    setSubmitted(true);

    // Мягкий скролл к началу формы (а не к футеру)
    if (typeof window !== "undefined") {
      requestAnimationFrame(() => {
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }

  if (submitted) {
    return (
      <div
        ref={formRef as unknown as React.RefObject<HTMLDivElement>}
        className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center scroll-mt-24"
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white text-2xl">
          ✓
        </div>
        <h3 className="text-lg font-bold text-emerald-900">
          {t("success.title")}
        </h3>
        <p className="mt-2 text-sm text-emerald-800">{t("success.text")}</p>
        <Button
          type="button"
          variant="outline"
          size="md"
          className="mt-4"
          onClick={() => setSubmitted(false)}
        >
          {t("success.again")}
        </Button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      className="rounded-2xl border border-ink-100 bg-white p-6 sm:p-8 shadow-card scroll-mt-24"
      noValidate
    >
      {car && (
        <div className="mb-6 rounded-xl bg-primary-50 border border-primary-100 p-4">
          <div className="flex items-center gap-4">
            {/* Мини-превью авто */}
            <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-ink-100">
              <Image
                src={car.image}
                alt={`${car.brand} ${car.model}`}
                fill
                sizes="96px"
                className="object-cover"
              />
            </div>

            <div className="min-w-0 flex-1">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-primary-700">
                {t("carLabel")}
              </div>
              <div className="mt-0.5 text-sm font-bold text-ink-900 truncate">
                {car.brand} {car.model} · {car.year}
              </div>
              <div className="mt-1 text-xs text-ink-500">
                {formatPrice(car.pricePerDay)} / {t("perDayShort")}
              </div>
            </div>

            <Badge variant="primary" className="hidden sm:inline-flex">
              {car.year}
            </Badge>
          </div>
        </div>
      )}

      <h2 className="text-2xl font-extrabold text-ink-900">
        {t("title")}
      </h2>
      <p className="mt-2 text-sm text-ink-600">{t("subtitle")}</p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Field label={t("fields.name")} error={errors.name}>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t("placeholders.name")}
            autoComplete="name"
          />
        </Field>

        <Field label={t("fields.phone")} error={errors.phone}>
          <Input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+7 (___) ___-__-__"
            autoComplete="tel"
            inputMode="tel"
          />
        </Field>

        <Field label={t("fields.startDate")} error={errors.startDate}>
          <Input
            type="date"
            value={startDate}
            min={todayISO()}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </Field>

        <Field label={t("fields.startTime")} error={errors.startTime}>
          <Input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </Field>

        <Field label={t("fields.endDate")} error={errors.endDate}>
          <Input
            type="date"
            value={endDate}
            min={startDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </Field>

        <Field label={t("fields.endTime")} error={errors.endTime}>
          <Input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field
          label={t("fields.comment")}
          hint={`${comment.length} / 300`}
          error={errors.comment}
        >
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value.slice(0, 300))}
            placeholder={t("placeholders.comment")}
            rows={3}
            className={cn(
              "flex w-full rounded-lg border border-ink-200 bg-white px-3.5 py-2 text-sm text-ink-900",
              "placeholder:text-ink-400",
              "focus-visible:outline-none focus-visible:border-primary-700 focus-visible:ring-2 focus-visible:ring-primary-700/20",
              "resize-y min-h-[88px]"
            )}
          />
        </Field>
      </div>

      {days > 0 && car && (
        <div className="mt-5 rounded-xl bg-ink-50 border border-ink-100 p-4 flex items-center justify-between text-sm">
          <span className="text-ink-600">
            {t("summary.days")}: <strong className="text-ink-900">{days}</strong>
          </span>
          <span className="text-ink-600">
            {t("summary.total")}:{" "}
            <strong className="text-primary-800 text-base">
              {formatPrice(car.pricePerDay * days)}
            </strong>
          </span>
        </div>
      )}

      <Button type="submit" variant="primary" size="lg" className="mt-6 w-full">
        {t("submit")}
      </Button>

      <p className="mt-3 text-xs text-ink-500 text-center">
        {t("policy")}
      </p>
    </form>
  );
}

function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center justify-between text-xs font-semibold text-ink-600">
        <span>{label}</span>
        {hint && <span className="text-ink-400">{hint}</span>}
      </span>
      {children}
      {error && (
        <span className="mt-1 block text-xs font-medium text-red-600">{error}</span>
      )}
    </label>
  );
}

function isValidTime(v: string): boolean {
  if (!v) return false;
  const m = /^(\d{2}):(\d{2})$/.exec(v);
  if (!m) return false;
  const h = Number(m[1]);
  const min = Number(m[2]);
  return h >= 0 && h <= 23 && min >= 0 && min <= 59;
}
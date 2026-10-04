import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Формат цены: 3500 → "3 500 ₽". Безопасно работает с undefined/NaN. */
export function formatPrice(
  value: number | undefined | null,
  currency = "₽"
): string {
  if (value == null || Number.isNaN(value) || !Number.isFinite(value)) {
    return `— ${currency}`;
  }
  return `${value.toLocaleString("ru-RU")} ${currency}`;
}
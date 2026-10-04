"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

const keys = ["age", "docs", "deposit", "insurance", "fuel", "return"] as const;

export function TermsAccordion() {
  const t = useTranslations("terms");

  return (
    <Accordion.Root type="single" collapsible className="space-y-3">
      {keys.map((k, i) => (
        <Accordion.Item
          key={k}
          value={k}
          className="overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-card"
        >
          <Accordion.Header>
            <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 p-5 text-left hover:bg-ink-50 transition-colors">
              <div className="flex items-center gap-4">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-50 text-xs font-bold text-primary-800">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-base font-bold text-ink-900">
                  {t(`items.${k}.title`)}
                </span>
              </div>
              <ChevronDown className="h-5 w-5 text-ink-500 transition-transform group-data-[state=open]:rotate-180" />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="overflow-hidden">
            <div className="border-t border-ink-100 px-5 py-4 text-sm text-ink-600 leading-relaxed">
              {t(`items.${k}.text`)}
            </div>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
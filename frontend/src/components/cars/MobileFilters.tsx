"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { SlidersHorizontal } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Filters, type FiltersState } from "./Filters";

export function MobileFilters({ initial }: { initial: FiltersState }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const t = useTranslations("filters");

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

  const sheet = open ? (
    <div className="fixed inset-0 z-[100] lg:hidden">
      <div
        className="absolute inset-0 bg-black/60"
        onClick={() => setOpen(false)}
        aria-hidden
      />
      <div
        className="absolute inset-x-0 bottom-0 max-h-[88vh] overflow-y-auto rounded-t-3xl shadow-2xl scrollbar-thin"
        style={{ backgroundColor: "#ffffff" }}
      >
        <Filters initial={initial} onClose={() => setOpen(false)} forceVisible />
      </div>
    </div>
  ) : null;

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="md"
        onClick={() => setOpen(true)}
        className="lg:hidden w-full sm:w-auto"
      >
        <SlidersHorizontal className="h-4 w-4" />
        {t("title")}
      </Button>

      {mounted && typeof document !== "undefined" && sheet
        ? createPortal(sheet, document.body)
        : null}
    </>
  );
}
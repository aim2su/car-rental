import { getTranslations, setRequestLocale } from "next-intl/server";
import { Filters, emptyFilters, type FiltersState } from "@/components/cars/Filters";
import { MobileFilters } from "@/components/cars/MobileFilters";
import { CarGrid } from "@/components/cars/CarGrid";
import { cars } from "@/lib/cars-data";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CTASection } from "@/components/layout/CTASection";
import type { BodyType, CarClass, Transmission } from "@/types/car";

type SearchParams = Promise<{
  brand?: string;
  class?: string;
  body?: string;
  tr?: string;
  ymin?: string;
  ymax?: string;
  pmin?: string;
  pmax?: string;
}>;

export default async function CarsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: SearchParams;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("meta.cars");
  const tn = await getTranslations("nav");
  const sp = await searchParams;

  const initial: FiltersState = {
    brands: sp.brand ? sp.brand.split(",") : [],
    classes: sp.class ? (sp.class.split(",") as CarClass[]) : [],
    bodyTypes: sp.body ? (sp.body.split(",") as BodyType[]) : [],
    transmissions: sp.tr ? (sp.tr.split(",") as Transmission[]) : [],
    yearMin: sp.ymin ? Number(sp.ymin) : emptyFilters.yearMin,
    yearMax: sp.ymax ? Number(sp.ymax) : emptyFilters.yearMax,
    priceMin: sp.pmin ? Number(sp.pmin) : emptyFilters.priceMin,
    priceMax: sp.pmax ? Number(sp.pmax) : emptyFilters.priceMax,
  };

  const filtered = cars.filter((c) => {
    if (initial.brands.length && !initial.brands.includes(c.brand)) return false;
    if (initial.classes.length && !initial.classes.includes(c.class)) return false;
    if (initial.bodyTypes.length && !initial.bodyTypes.includes(c.bodyType)) return false;
    if (initial.transmissions.length && !initial.transmissions.includes(c.transmission)) return false;
    if (c.year < initial.yearMin || c.year > initial.yearMax) return false;
    if (c.pricePerDay < initial.priceMin || c.pricePerDay > initial.priceMax) return false;
    return true;
  });

  return (
    <>
      <section className="container-page py-10 lg:py-14">
        <Breadcrumbs
          items={[
            { label: tn("home"), href: "/" },
            { label: tn("cars") },
          ]}
        />

        <div className="mb-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground">{t("title")}</h1>
          <p className="mt-2 text-muted-foreground max-w-2xl">{t("description")}</p>
        </div>

        {/* ===== Фильтры над каталогом (только PC) ===== */}
        <div className="hidden lg:block mb-8">
          <Filters initial={initial} />
        </div>

        {/* ===== Мобильная кнопка фильтров (bottom-sheet) ===== */}
        <div className="lg:hidden mb-4">
          <MobileFilters initial={initial} />
        </div>

        {/* ===== Каталог ===== */}
        <CarGrid cars={filtered} />
      </section>

      <CTASection />
    </>
  );
}
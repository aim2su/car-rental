import { getTranslations, setRequestLocale } from "next-intl/server";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BookingForm } from "@/components/booking/BookingForm";
import { cars } from "@/lib/cars-data";

type SearchParams = Promise<{ car?: string; from?: string; to?: string }>;

export default async function BookingPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: SearchParams;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("booking");
  const tn = await getTranslations("nav");
  const sp = await searchParams;

  const selectedCar = sp.car ? cars.find((c) => c.id === sp.car) : undefined;

  return (
    <section className="container-page py-10 lg:py-14">
      <Breadcrumbs
        items={[
          { label: tn("home"), href: "/" },
          { label: tn("book") },
        ]}
      />

      <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-ink-900">
            {t("pageTitle")}
          </h1>
          <p className="mt-3 text-ink-600">{t("pageSubtitle")}</p>

          <ul className="mt-6 space-y-3 text-sm text-ink-700">
            <li className="flex gap-2">
              <span className="text-primary-700">✓</span>
              {t("bullets.callback")}
            </li>
            <li className="flex gap-2">
              <span className="text-primary-700">✓</span>
              {t("bullets.noDeposit")}
            </li>
            <li className="flex gap-2">
              <span className="text-primary-700">✓</span>
              {t("bullets.age")}
            </li>
            <li className="flex gap-2">
              <span className="text-primary-700">✓</span>
              {t("bullets.insurance")}
            </li>
          </ul>
        </aside>

        <div>
          <BookingForm
            car={selectedCar}
            defaultStartDate={sp.from}
            defaultEndDate={sp.to}
          />
        </div>
      </div>
    </section>
  );
}
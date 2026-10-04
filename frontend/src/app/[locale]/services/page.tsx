import { getTranslations, setRequestLocale } from "next-intl/server";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CTASection } from "@/components/layout/CTASection";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("services");
  const tn = await getTranslations("nav");

  const daytime = [
    { label: t("delivery.kaliningrad"), value: "1 000 ₽" },
    { label: t("delivery.svetlogorsk"), value: "2 500 ₽" },
    { label: t("delivery.zelenogradsk"), value: "2 000 ₽" },
    { label: t("delivery.yantarny"), value: "3 000 ₽" },
    { label: t("delivery.airport"), value: "1 500 ₽" },
  ];

  const nighttime = [
    { label: t("delivery.kaliningrad"), value: "1 500 ₽" },
    { label: t("delivery.svetlogorsk"), value: "2 500 – 4 000 ₽" },
    { label: t("delivery.zelenogradsk"), value: "2 500 – 3 500 ₽" },
    { label: t("delivery.yantarny"), value: "3 500 – 5 000 ₽" },
    { label: t("delivery.airport"), value: "1 900 – 3 000 ₽" },
  ];

  const extras = [
    { title: t("extra.secondDriver"), note: t("extra.secondDriverNote"), value: "1 000 ₽" },
    { title: t("extra.carSwap"), note: t("extra.carSwapNote"), value: "1 000 ₽" },
    { title: t("extra.childSeat"), note: t("extra.childSeatNote"), value: "Бесплатно" },
    { title: t("extra.washing"), note: t("extra.washingNote"), value: "1 000 ₽" },
  ];

  return (
    <>
      <section className="container-page py-14 lg:py-20">
        <Breadcrumbs
          items={[
            { label: tn("home"), href: "/" },
            { label: tn("services") },
          ]}
        />

        <div className="max-w-2xl mb-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-ink-900">
            {t("title")}
          </h1>
          <p className="mt-3 text-ink-600">{t("subtitle")}</p>
        </div>

        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-xl font-bold text-ink-900">{t("pickupTitle")}</h2>
            <Badge variant="soft">{t("workHours")}</Badge>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-primary-800">
                    {t("workHours")}
                  </h3>
                  <Badge variant="success">Дневное</Badge>
                </div>
                <p className="text-xs text-ink-500 mt-1">{t("officePickup")}</p>
                <p className="text-xs text-ink-500">{t("officeAddress")}</p>
              </CardHeader>
              <CardContent>
                <ul className="divide-y divide-ink-100">
                  {daytime.map((row) => (
                    <li key={row.label} className="flex items-center justify-between py-2.5 text-sm">
                      <span className="text-ink-700">{row.label}</span>
                      <span className="font-bold text-ink-900">{row.value}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-primary-800">
                    {t("nonWorking")}
                  </h3>
                  <Badge variant="warning">Ночь</Badge>
                </div>
                <p className="text-xs text-ink-500 mt-1">
                  Наценка за выдачу в нерабочее время
                </p>
              </CardHeader>
              <CardContent>
                <ul className="divide-y divide-ink-100">
                  {nighttime.map((row) => (
                    <li key={row.label} className="flex items-center justify-between py-2.5 text-sm">
                      <span className="text-ink-700">{row.label}</span>
                      <span className="font-bold text-ink-900">{row.value}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-xl font-bold text-ink-900 mb-4">{t("extendTitle")}</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <ExtendCard label="до 1 часа" value={t("extend.upTo1h")} />
            <ExtendCard label="до 6 часов" value={t("extend.upTo6h")} />
            <ExtendCard label="более 6 часов" value={t("extend.more6h")} />
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-xl font-bold text-ink-900 mb-4">{t("extraTitle")}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {extras.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-ink-100 bg-white p-5 shadow-card"
              >
                <div className="text-sm font-bold text-ink-900">{item.title}</div>
                <div className="mt-1 text-xs text-ink-500 min-h-[32px]">{item.note}</div>
                <div className="mt-3 text-lg font-extrabold text-primary-800">
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}

function ExtendCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-ink-100 bg-white p-5 shadow-card">
      <div className="text-xs uppercase tracking-wider text-ink-500 font-semibold">
        {label}
      </div>
      <div className="mt-2 text-sm font-bold text-ink-900">{value}</div>
    </div>
  );
}
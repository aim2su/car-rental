import {
  UserCheck, FileText, ShieldCheck, Wallet, Fuel, Sparkles,
  Clock3, AlertCircle,
} from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CTASection } from "@/components/layout/CTASection";
import { Button } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("terms");
  const tn = await getTranslations("nav");

  const items = [
    { key: "age", Icon: UserCheck, color: "primary" },
    { key: "docs", Icon: FileText, color: "primary" },
    { key: "deposit", Icon: Wallet, color: "primary" },
    { key: "insurance", Icon: ShieldCheck, color: "primary" },
    { key: "fuel", Icon: Fuel, color: "primary" },
    { key: "return", Icon: Sparkles, color: "primary" },
  ] as const;

  return (
    <>
      <section className="container-page py-10 lg:py-14">
        <Breadcrumbs
          items={[
            { label: tn("home"), href: "/" },
            { label: tn("terms") },
          ]}
        />

        {/* Hero-блок */}
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 items-start mb-14">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink-900 leading-tight">
              {t("title")}
            </h1>
            <p className="mt-4 text-lg text-ink-600 max-w-2xl">
              {t("subtitle")}
            </p>
          </div>

          <div className="rounded-2xl border border-primary-100 bg-primary-50/60 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Clock3 className="h-5 w-5 text-primary-700" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-primary-800">
                Кратко
              </h3>
            </div>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center justify-between">
                <span className="text-ink-600">Возраст</span>
                <span className="font-bold text-ink-900">от 23 лет</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-ink-600">Стаж вождения</span>
                <span className="font-bold text-ink-900">от 3 лет</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-ink-600">Срок аренды</span>
                <span className="font-bold text-ink-900">от 1 суток</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-ink-600">Депозит</span>
                <span className="font-bold text-ink-900">нет</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-ink-600">Страховка</span>
                <span className="font-bold text-ink-900">ОСАГО включена</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-ink-600">Лимит пробега</span>
                <span className="font-bold text-ink-900">нет</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Сетка условий */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ key, Icon }, i) => (
            <article
              key={key}
              className="rounded-2xl border border-ink-100 bg-white p-6 shadow-card hover:shadow-card-hover transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-xs font-bold text-ink-300">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h2 className="text-lg font-bold text-ink-900">
                {t(`items.${key}.title`)}
              </h2>
              <p className="mt-2 text-sm text-ink-600 leading-relaxed">
                {t(`items.${key}.text`)}
              </p>
            </article>
          ))}
        </div>

        {/* Блок с напоминанием */}
        <div className="mt-14 rounded-2xl border border-amber-200 bg-amber-50 p-6 sm:p-8 flex gap-4">
          <AlertCircle className="h-6 w-6 shrink-0 text-amber-600 mt-0.5" />
          <div>
            <h3 className="text-lg font-bold text-amber-900">
              Важно
            </h3>
            <p className="mt-2 text-sm text-amber-900 leading-relaxed">
              Автомобиль выдаётся при наличии общегражданского паспорта и
              водительского удостоверения, действующего на территории РФ.
              Выдача / приём — ежедневно с 10:00 до 19:00. В нерабочее время —
              по тарифу.
            </p>
          </div>
        </div>

        {/* CTA внутри страницы */}
        <div className="mt-10 rounded-2xl gradient-primary-soft border border-primary-100 p-6 sm:p-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-lg font-bold text-ink-900">{t("cta")}</div>
            <p className="mt-1 text-sm text-ink-600">
              Перезвоним в течение 15 минут и ответим на все вопросы.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="primary" size="lg">
              <Link href="/contacts">Контакты</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/booking">Забронировать</Link>
            </Button>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
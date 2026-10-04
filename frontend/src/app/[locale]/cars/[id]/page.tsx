import Image from "next/image";
import { notFound } from "next/navigation";
import {
  Users, Briefcase, Gauge, Fuel, Calendar, DoorOpen,
  ShieldCheck, Phone, ArrowLeft, Check, Cog, Car as CarIcon,
  Gauge as SpeedIcon,
} from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { cars } from "@/lib/cars-data";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CTASection } from "@/components/layout/CTASection";
import { formatPrice } from "@/lib/utils";

export function generateStaticParams() {
  return cars.map((c) => ({ id: c.id }));
}

const bodyShort: Record<string, string> = {
  suv: "Внедорожник",
  cabriolet: "Кабриолет",
  liftback: "Лифтбек",
  minivan: "Минивэн",
  sedan: "Седан",
  hatchback: "Хэтчбэк",
};

const transmissionShort: Record<string, string> = {
  automatic: "Автомат",
  variator: "Вариатор",
  manual: "Механика",
  robot: "Робот",
};

const fuelShort: Record<string, string> = {
  petrol: "Бензин",
  diesel: "Дизель",
  hybrid: "Гибрид",
  electric: "Электро",
};

const driveShort: Record<string, string> = {
  front: "Передний",
  rear: "Задний",
  all: "Полный",
};

export default async function CarDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const car = cars.find((c) => c.id === id);
  if (!car) notFound();

  const t = await getTranslations("car");
  const tc = await getTranslations("classes");
  const tn = await getTranslations("nav");
  const th = await getTranslations("header");
  const phoneHref = `tel:${th("phone").replace(/[^+\d]/g, "")}`;

  const specs: { label: string; value: string }[] = [
    { label: "Марка", value: car.brand },
    { label: "Модель", value: car.model },
    { label: "Год выпуска", value: String(car.year) },
    { label: "Кузов", value: bodyShort[car.bodyType] ?? car.bodyType },
    { label: "Двери", value: String(car.doors) },
    ...(car.generation ? [{ label: "Поколение", value: car.generation }] : []),
    { label: "Двигатель", value: fuelShort[car.fuel] ?? car.fuel },
    ...(car.drive ? [{ label: "Привод", value: driveShort[car.drive] ?? car.drive }] : []),
    { label: "Коробка передач", value: transmissionShort[car.transmission] ?? car.transmission },
    ...(car.modification ? [{ label: "Модификация", value: car.modification }] : []),
    ...(car.steering ? [{ label: "Руль", value: car.steering === "left" ? "Левый" : "Правый" }] : []),
    ...(car.trim ? [{ label: "Комплектация", value: car.trim }] : []),
    { label: "Класс авто", value: tc(car.class) },
    ...(car.extras?.length ? [{ label: "Дополнительно", value: car.extras.join(", ") }] : []),
  ];

  const rules: { label: string; value: string }[] = [
    {
      label: "Тип аренды",
      value: car.rentalType === "withDriver" ? "С водителем" : "Без водителя",
    },
    { label: "Минимальный возраст водителя", value: String(car.minAge ?? 23) },
    { label: "Минимальный стаж вождения", value: `${car.minExperience ?? 3} года` },
    { label: "Депозит", value: car.deposit ?? "Нет" },
    { label: "Страховка", value: car.insurance ?? "ОСАГО" },
    { label: "Минимальное количество суток", value: String(car.minDays ?? 1) },
    { label: "Лимит пробега", value: car.mileageLimit ?? "Нет" },
  ];

  const tiers = car.priceTiers?.length
    ? car.priceTiers
    : [{ label: "1-3 суток", price: car.pricePerDay }];

  return (
    <>
      <section className="container-page py-10 lg:py-14">
        <Breadcrumbs
          items={[
            { label: tn("home"), href: "/" },
            { label: tn("cars"), href: "/cars" },
            { label: `${car.brand} ${car.model}` },
          ]}
        />

        <Link
          href="/cars"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-primary-800 mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Назад к каталогу
        </Link>

        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-ink-100">
              <Image
                src={car.image}
                alt={`${car.brand} ${car.model}`}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
                className="object-cover"
              />
              <div className="absolute left-4 top-4 flex gap-2">
                <Badge variant="primary">{tc(car.class)}</Badge>
                {car.popular && <Badge variant="warning">Хит</Badge>}
              </div>
            </div>

            {car.idealFor?.length ? (
              <div className="mt-6 rounded-2xl border border-primary-100 bg-primary-50/50 p-5">
                <h3 className="text-sm font-bold uppercase tracking-wider text-primary-800 mb-3">
                  Отличный выбор для:
                </h3>
                <ul className="space-y-2">
                  {car.idealFor.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-ink-700">
                      <Check className="h-4 w-4 shrink-0 mt-0.5 text-primary-700" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-ink-900 leading-tight">
              {car.brand} {car.model}
            </h1>
            <div className="mt-2 text-ink-500">
              {car.year} · {bodyShort[car.bodyType] ?? car.bodyType} ·{" "}
              {transmissionShort[car.transmission] ?? car.transmission}
            </div>

            <div className="mt-6 rounded-2xl border border-ink-100 bg-white p-6 shadow-card">
              <div className="text-xs font-semibold uppercase tracking-wider text-ink-500 mb-2">
                Количество дней
              </div>
              <ul className="divide-y divide-ink-100">
                {tiers.map((tier, i) => (
                  <li key={i} className="flex items-center justify-between py-2.5">
                    <span className="text-sm text-ink-700">{tier.label}</span>
                    <span className="text-base font-extrabold text-primary-800">
                      {formatPrice(tier.price)}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-col gap-2">
                {car.available ? (
                  <Button asChild variant="primary" size="lg">
                    <Link href={`/booking?car=${car.id}`}>Забронировать</Link>
                  </Button>
                ) : (
                  <Button variant="outline" size="lg" disabled>
                    Недоступен
                  </Button>
                )}
                <Button asChild variant="outline" size="lg">
                  <a href={phoneHref}>
                    <Phone className="h-4 w-4" />
                    {th("phone")}
                  </a>
                </Button>
              </div>

              <div className="mt-5 flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-100 p-3">
                <ShieldCheck className="h-5 w-5 shrink-0 text-emerald-600" />
                <p className="text-xs text-emerald-900">
                  ОСАГО включено. Депозит — нет. Минимальный возраст — 23 года.
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Spec icon={<Users />} label={t("seats")} value={String(car.seats)} />
              <Spec icon={<DoorOpen />} label={t("doors")} value={String(car.doors)} />
              <Spec icon={<Briefcase />} label={t("baggage")} value={String(car.baggage)} />
              <Spec icon={<Gauge />} label={t("transmission")} value={transmissionShort[car.transmission] ?? "—"} />
              <Spec icon={<Fuel />} label={t("fuel")} value={fuelShort[car.fuel] ?? "—"} />
              <Spec icon={<Calendar />} label={t("year")} value={String(car.year)} />
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-extrabold text-ink-900 mb-6 flex items-center gap-2">
              <CarIcon className="h-6 w-6 text-primary-700" />
              Характеристики
            </h2>
            <dl className="rounded-2xl border border-ink-100 bg-white shadow-card divide-y divide-ink-100">
              {specs.map((spec) => (
                <div
                  key={spec.label}
                  className="grid grid-cols-[180px_1fr] gap-4 px-5 py-3 text-sm"
                >
                  <dt className="text-ink-500">{spec.label}:</dt>
                  <dd className="font-semibold text-ink-900">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h2 className="text-2xl font-extrabold text-ink-900 mb-6 flex items-center gap-2">
              <Cog className="h-6 w-6 text-primary-700" />
              Правила аренды
            </h2>
            <dl className="rounded-2xl border border-ink-100 bg-white shadow-card divide-y divide-ink-100">
              {rules.map((rule) => (
                <div
                  key={rule.label}
                  className="grid grid-cols-[220px_1fr] gap-4 px-5 py-3 text-sm"
                >
                  <dt className="text-ink-500">{rule.label}:</dt>
                  <dd className="font-semibold text-ink-900">{rule.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 rounded-2xl gradient-primary-soft border border-primary-100 p-5 flex gap-3">
              <SpeedIcon className="h-5 w-5 shrink-0 text-primary-700 mt-0.5" />
              <p className="text-sm text-primary-900">
                Выдача и приём: ежедневно с 10:00 до 19:00. Доставка в нерабочее
                время — по тарифу. Замена автомобиля по желанию клиента.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}

function Spec({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-ink-100 bg-white p-4">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ink-500">
        <span className="[&>svg]:h-3.5 [&>svg]:w-3.5 [&>svg]:text-primary-700">{icon}</span>
        {label}
      </div>
      <div className="mt-1.5 text-sm font-bold text-ink-900">{value}</div>
    </div>
  );
}
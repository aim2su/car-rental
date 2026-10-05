import Image from "next/image";
import {
  Users, Briefcase, Fuel, Settings2, ArrowRight, Star, Car as CarIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/Badge";
import { buttonVariants } from "@/components/ui/button-variants";
import { formatPrice, cn } from "@/lib/utils";
import type { Car } from "@/types/car";

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

const bodyShort: Record<string, string> = {
  suv: "Внедорожник",
  cabriolet: "Кабриолет",
  liftback: "Лифтбек",
  minivan: "Минивэн",
  sedan: "Седан",
  hatchback: "Хэтчбэк",
};

export function CarCard({ car }: { car: Car }) {
  const t = useTranslations("car");
  const tc = useTranslations("classes");

  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl bg-background",
        "border border-border shadow-card transition-all duration-300",
        "hover:shadow-card-hover hover:-translate-y-1"
      )}
    >
      <Link
        href={{ pathname: "/cars/[id]", params: { id: car.id } }}
        className="relative block aspect-[16/10] overflow-hidden bg-muted shrink-0"
        aria-label={`${car.brand} ${car.model}`}
      >
        <Image
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
        />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/55 to-transparent pointer-events-none" />

        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          <Badge variant="primary">{tc(car.class)}</Badge>
          {car.popular && (
            <span className="inline-flex items-center gap-1 rounded-full bg-primary-700 px-2.5 py-0.5 text-xs font-bold text-white shadow-sm">
              <Star className="h-3 w-3 fill-white" />
              Хит
            </span>
          )}
        </div>

        <div className="absolute bottom-3 right-3 rounded-xl bg-background/95 backdrop-blur-sm px-3 py-1.5 shadow-md">
          <div className="text-base font-extrabold text-primary-800 leading-none">
            {formatPrice(car.pricePerDay)}
          </div>
          <div className="text-[10px] text-muted-foreground mt-0.5 text-right">
            за {t("perDay")}
          </div>
        </div>

        {!car.available && (
          <div className="absolute inset-0 bg-ink-950/60 flex items-center justify-center">
            <span className="rounded-full bg-background/95 px-5 py-2 text-sm font-bold text-foreground shadow-lg">
              {t("busy")}
            </span>
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <Link href={{ pathname: "/cars/[id]", params: { id: car.id } }} className="group/title block">
          <h3 className="text-lg font-extrabold text-foreground leading-tight tracking-tight group-hover/title:text-primary-800 transition-colors">
            {car.brand}{" "}
            <span className="font-semibold text-muted-foreground">{car.model}</span>
          </h3>
          <div className="mt-1 text-xs font-medium text-muted-foreground">
            {car.year} год
          </div>
        </Link>

        <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3">
          <SpecCell
            icon={<CarIcon className="h-4 w-4" />}
            label={t("body")}
            value={bodyShort[car.bodyType] ?? "—"}
          />
          <SpecCell
            icon={<Settings2 className="h-4 w-4" />}
            label={t("transmission")}
            value={transmissionShort[car.transmission] ?? "—"}
          />
          <SpecCell
            icon={<Users className="h-4 w-4" />}
            label={t("seats")}
            value={`${car.seats}`}
          />
          <SpecCell
            icon={<Fuel className="h-4 w-4" />}
            label={t("fuel")}
            value={fuelShort[car.fuel] ?? "—"}
          />
        </dl>

        {car.extra && (
          <div className="mt-4 rounded-lg bg-muted px-3 py-2 text-xs text-muted-foreground flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-primary-700 shrink-0" />
            <span className="truncate">{car.extra}</span>
          </div>
        )}

        <div className="mt-auto pt-6">
          <Link
            href={{ pathname: "/cars/[id]", params: { id: car.id } }}
            className={cn(
              buttonVariants({
                variant: car.available ? "primary" : "outline",
                size: "md",
              }),
              "w-full",
              !car.available && "pointer-events-none opacity-60"
            )}
          >
            <span>{t("details")}</span>
            <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}

function SpecCell({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2 min-w-0">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-700">
        {icon}
      </span>
      <div className="min-w-0">
        <dt className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground leading-none">
          {label}
        </dt>
        <dd className="mt-1 text-xs font-bold text-foreground truncate">
          {value}
        </dd>
      </div>
    </div>
  );
}
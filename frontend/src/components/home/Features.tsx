import {
  Car, Wrench, Wallet, FileCheck, MapPin, Headphones,
} from "lucide-react";
import { useTranslations } from "next-intl";

const items = [
  { key: "wideChoice", Icon: Car },
  { key: "goodCondition", Icon: Wrench },
  { key: "affordablePrices", Icon: Wallet },
  { key: "transparent", Icon: FileCheck },
  { key: "location", Icon: MapPin },
  { key: "professional", Icon: Headphones },
] as const;

export function Features() {
  const t = useTranslations("features");

  return (
    <section className="py-20 lg:py-24">
      <div className="container-page">
        <div className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">
            {t("title")}
          </h2>
          <p className="mt-3 text-muted-foreground">{t("subtitle")}</p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ key, Icon }) => (
            <div
              key={key}
              className="rounded-2xl border border-border bg-background p-6 shadow-card hover:shadow-card-hover transition-shadow"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-bold text-foreground">
                {t(`${key}`)}
              </h3>
              <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                {t(`${key}Text`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
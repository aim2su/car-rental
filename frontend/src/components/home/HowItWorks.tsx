import { Car, FileCheck, KeyRound } from "lucide-react";
import { useTranslations } from "next-intl";

const steps = [
  { key: "step1", Icon: Car },
  { key: "step2", Icon: FileCheck },
  { key: "step3", Icon: KeyRound },
] as const;

export function HowItWorks() {
  const t = useTranslations("howItWorks");

  return (
    <section className="py-20 lg:py-24 bg-muted/40">
      <div className="container-page">
        <div className="max-w-2xl mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">
            {t("title")}
          </h2>
          <p className="mt-3 text-muted-foreground">{t("subtitle")}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {steps.map(({ key, Icon }, i) => (
            <div
              key={key}
              className="relative rounded-2xl border border-border bg-background p-6 shadow-card hover:shadow-card-hover transition-shadow"
            >
              <div className="absolute top-6 right-6 text-4xl font-extrabold text-primary-700/10 select-none">
                0{i + 1}
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-base font-bold text-foreground">
                {t(`${key}Title`)}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {t(`${key}Text`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
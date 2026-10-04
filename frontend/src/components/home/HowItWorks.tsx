import { Car, FileCheck, KeyRound } from "lucide-react";

const steps = [
  {
    icon: Car,
    title: "Выберите авто",
    text: "19+ машин в каталоге — фильтры по марке, кузову, цене и классу.",
  },
  {
    icon: FileCheck,
    title: "Оставьте заявку",
    text: "Перезвоним в течение 15 минут и подтвердим бронь. Депозит не нужен.",
  },
  {
    icon: KeyRound,
    title: "Заберите ключи",
    text: "Выдача в офисе на Гагарина или доставка по Калининграду и области.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 lg:py-24 bg-muted/40">
      <div className="container-page">
        <div className="max-w-2xl mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">
            Как это работает
          </h2>
          <p className="mt-3 text-muted-foreground">
            Три простых шага от выбора машины до получения ключей.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={i}
                className="relative rounded-2xl border border-border bg-background p-6 shadow-card hover:shadow-card-hover transition-shadow"
              >
                <div className="absolute top-6 right-6 text-4xl font-extrabold text-primary-700/10 select-none">
                  0{i + 1}
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-base font-bold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {step.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
import Image from "next/image";
import {
  ArrowRight, ShieldCheck, Clock3, Sparkles,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative overflow-hidden bg-[#FAFAF7]">
      <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-primary-100/40 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-20 h-[420px] w-[420px] rounded-full bg-primary-200/30 blur-3xl pointer-events-none" />

      <div className="relative container-page pt-8 pb-12 lg:pt-12 lg:pb-16">
        <div className="lg:grid lg:grid-cols-[1fr_1.35fr] lg:gap-12 lg:items-center">
          {/* ===== Текст ===== */}
          <div className="lg:order-1">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-foreground leading-[1.15] lg:leading-[1.05] text-balance">
              {t("title")}
            </h1>

            <p className="mt-3 lg:mt-5 text-base lg:text-lg text-muted-foreground max-w-xl leading-relaxed">
              {t("subtitle")}
            </p>

            <div className="mt-6 lg:mt-8 flex flex-wrap gap-3">
              <Link
                href="/cars"
                className={cn(buttonVariants({ variant: "primary", size: "lg" }))}
              >
                {t("ctaPrimary")}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="tel:+79960291660"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
              >
                {t("ctaSecondary")}
              </a>
            </div>

            <div className="mt-6 lg:mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 lg:gap-6 max-w-xl">
              <Stat value="19" label={t("stats.cars")} />
              <Stat value="1 500+" label={t("stats.clients")} />
              <Stat value="4.9" label={t("stats.rating")} />
              <Stat value="24/7" label={t("support")} />
            </div>

            <div className="mt-6 lg:mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary-700" />
                {t("insurance")}
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock3 className="h-4 w-4 text-primary-700" />
                {t("airport")}
              </span>
            </div>
          </div>

          {/* ===== Фото ===== */}
          <div className="lg:order-2 mt-6 lg:mt-0 flex items-center justify-center">
            <Link
              href="/cars"
              className="group relative block w-full overflow-hidden rounded-3xl bg-ink-100 shadow-2xl aspect-[5/3] lg:aspect-[4/3]"
              aria-label={t("seeAll")}
            >
              <Image
                src="/hero-car.jpg"
                alt={t("title")}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-x-0 bottom-0 h-24 lg:h-32 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

              <div className="absolute bottom-3 left-3 lg:bottom-5 lg:left-5 rounded-2xl bg-white/95 backdrop-blur-md px-3 lg:px-4 py-2 lg:py-3 shadow-lg">
                <div className="text-[10px] font-bold uppercase tracking-wider text-primary-700">
                  {t("rentFrom")}
                </div>
                <div className="mt-0.5 text-lg lg:text-2xl font-extrabold text-foreground leading-none">
                  2 200 ₽
                </div>
                <div className="text-[10px] text-muted-foreground mt-0.5">
                  {t("perDay")}
                </div>
              </div>

              <div className="absolute top-3 right-3 lg:top-5 lg:right-5 inline-flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur-md px-2.5 lg:px-3 py-1 lg:py-1.5 shadow-md">
                <Sparkles className="h-3 lg:h-3.5 w-3 lg:w-3.5 text-primary-700" />
                <span className="text-[10px] lg:text-xs font-bold text-foreground">
                  {t("newCarsBadge")}
                </span>
              </div>

              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                <span className="rounded-full bg-white/95 backdrop-blur-md px-5 py-2.5 lg:px-6 lg:py-3 text-sm lg:text-base font-bold text-foreground shadow-lg">
                  {t("seeAll")} →
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-xl lg:text-2xl font-extrabold text-primary-800">{value}</div>
      <div className="mt-1 text-[11px] lg:text-xs text-muted-foreground leading-tight">{label}</div>
    </div>
  );
}
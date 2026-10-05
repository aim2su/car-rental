import { Phone, ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { buttonVariants } from "@/components/ui/button-variants";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export async function CTASection() {
  const t = await getTranslations("cta");
  const th = await getTranslations("header");
  const phoneHref = `tel:${th("phone").replace(/[^+\d]/g, "")}`;

  return (
    <section className="container-page py-16">
      <div className="relative overflow-hidden rounded-3xl gradient-primary p-8 sm:p-12 text-white">
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -bottom-32 -left-16 h-72 w-72 rounded-full bg-white/5 blur-3xl" />

        <div className="relative grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-balance">
              {t("title")}
            </h2>
            <p className="mt-2 max-w-xl text-white/85">{t("subtitle")}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/cars"
              className={cn(buttonVariants({ variant: "white", size: "lg" }))}
            >
              {t("button")}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={phoneHref}
              className={cn(
                buttonVariants({ variant: "primary", size: "lg" }),
                "border border-white/40 bg-transparent text-white hover:bg-white/10"
              )}
            >
              <Phone className="h-4 w-4" />
              {th("phone")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import { CarCard } from "@/components/cars/CarCard";
import { cars } from "@/lib/cars-data";

export function FeaturedCars() {
  const t = useTranslations("featured");
  const featured = cars.filter((c) => c.popular).slice(0, 6);

  return (
    <section className="py-20 lg:py-24 bg-muted/40">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">
              {t("title")}
            </h2>
            <p className="mt-3 text-muted-foreground">{t("subtitle")}</p>
          </div>
          <Link
            href="/cars"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            {t("seeAll")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </section>
  );
}
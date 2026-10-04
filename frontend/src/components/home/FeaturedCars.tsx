import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import { CarCard } from "@/components/cars/CarCard";
import { cars } from "@/lib/cars-data";

export function FeaturedCars() {
  const featured = cars.filter((c) => c.popular).slice(0, 6);

  return (
    <section className="py-20 lg:py-24 bg-ink-50/60">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ink-900">
              Популярные автомобили
            </h2>
            <p className="mt-3 text-ink-600">
              Самые востребованные модели наших клиентов за последний месяц.
            </p>
          </div>
          <Link
            href="/cars"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            Все автомобили
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
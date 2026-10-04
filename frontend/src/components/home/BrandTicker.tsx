import { Link } from "@/i18n/navigation";

const brands = [
  "Audi",
  "BMW",
  "Citroen",
  "Honda",
  "Hyundai",
  "Kaiyi",
  "Kia",
  "Lexus",
  "MINI",
  "Mercedes-Benz",
  "Nissan",
  "Omoda",
  "Renault",
  "Volkswagen",
];

export function BrandTicker() {
  const list = [...brands, ...brands];

  return (
    <section className="relative w-full overflow-hidden bg-[#0F0F0F] py-2 lg:py-3">
      <div className="flex w-max animate-marquee">
        {list.map((brand, i) => (
          <div
            key={`${brand}-${i}`}
            className="flex items-center shrink-0 px-4 lg:px-8"
          >
            <Link
              href={`/cars?brand=${encodeURIComponent(brand)}`}
              className="text-sm lg:text-xl font-extrabold tracking-tight text-white hover:text-primary-300 transition-colors whitespace-nowrap"
            >
              {brand}
            </Link>
            <span
              className="ml-4 lg:ml-8 text-white/50 text-base lg:text-2xl select-none"
              aria-hidden
            >
              ·
            </span>
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-12 lg:w-32 bg-gradient-to-r from-[#0F0F0F] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 lg:w-32 bg-gradient-to-l from-[#0F0F0F] to-transparent" />
    </section>
  );
}
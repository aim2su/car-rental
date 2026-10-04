import Image from "next/image";
import { Phone, MapPin, Mail, Clock } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const navItems = [
  { href: "/", key: "home" },
  { href: "/cars", key: "cars" },
  { href: "/services", key: "services" },
  { href: "/terms", key: "terms" },
  { href: "/contacts", key: "contacts" },
] as const;

const socials = [
  {
    key: "whatsapp",
    src: "/social/whatsapp.png",
    href: "https://api.whatsapp.com/send/?phone=79969592279&text&type=phone_number&app_absent=0",
    label: "WhatsApp",
  },
  {
    key: "telegram",
    src: "/social/telegram.png",
    href: "https://t.me/GreenCar39",
    label: "Telegram",
  },
  {
    key: "avito",
    src: "/social/avito.png",
    href: "https://www.avito.ru/brands/81081288a8f7291e52b4fca47e9a80b8/items/all/predlozheniya_uslug?s=profile_search_show_all&sellerId=889046354a08ebdbf1501c57e0a20c73",
    label: "Avito",
  },
  {
    key: "max",
    src: "/social/max.png",
    href: "https://max.ru/u/f9LHodD0cOIJ64h4UPpbJnpTrzmi4HtSYqq0iVx3GaZZe5xcTw5Q7wrvBss",
    label: "Max",
  },
] as const;

export function Footer() {
  const t = useTranslations("nav");
  const tf = useTranslations("footer");
  const th = useTranslations("header");
  const tc = useTranslations("contacts");
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-border bg-muted">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Green Car"
                width={240}
                height={216}
                className="h-10 w-auto object-contain"
              />
              <span className="text-base font-extrabold text-foreground">
                Green Car
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              {tf("about")}
            </p>

            {/* Соцсети — цветные PNG 32×32 */}
            <div className="mt-5 flex items-center gap-3">
              {socials.map(({ key, src, href, label }) => (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg hover:scale-110 transition-transform"
                >
                  <Image
                    src={src}
                    alt={label}
                    width={100}
                    height={100}
                    className="h-8 w-8 object-contain"
                  />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">
              {tf("nav")}
            </h3>
            <ul className="space-y-2.5">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-primary-800 transition-colors"
                  >
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">
              {tf("contacts")}
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2.5">
                <Phone className="h-4 w-4 mt-0.5 shrink-0 text-primary-700" />
                <a
                  href={`tel:${th("phone").replace(/[^+\d]/g, "")}`}
                  className="font-medium text-foreground hover:text-primary-800"
                >
                  {th("phone")}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-primary-700" />
                <span>{tc("addressValue")}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="h-4 w-4 mt-0.5 shrink-0 text-primary-700" />
                <a href="mailto:info@kgd-rental.ru" className="hover:text-primary-800">
                  info@kgd-rental.ru
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="h-4 w-4 mt-0.5 shrink-0 text-primary-700" />
                <span>{tc("hoursValue")}</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">
              {t("book")}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Оставьте заявку — перезвоним в течение 15 минут.
            </p>
            <a
              href={`tel:${th("phone").replace(/[^+\d]/g, "")}`}
              className="inline-flex h-11 items-center justify-center rounded-lg bg-primary-700 px-5 text-sm font-semibold text-white hover:bg-primary-800 transition-colors"
            >
              {th("phone")}
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <div>
            © {year} Green Car. {tf("rights")}
          </div>
          <div className="flex gap-5">
            <Link href="/terms" className="hover:text-primary-800">{tf("privacy")}</Link>
            <Link href="/terms" className="hover:text-primary-800">{tf("offer")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
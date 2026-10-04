import Image from "next/image";
import { Phone, MapPin, Mail, Clock } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { YandexMap } from "@/components/contacts/YandexMap";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

const socials = [
  {
    key: "whatsapp",
    src: "/social/whatsapp.png",
    href: "https://api.whatsapp.com/send/?phone=79969592279&text&type=phone_number&app_absent=0",
    label: "WhatsApp",
    note: "Написать в WhatsApp",
  },
  {
    key: "telegram",
    src: "/social/telegram.png",
    href: "https://t.me/GreenCar39",
    label: "Telegram",
    note: "Написать в Telegram",
  },
  {
    key: "avito",
    src: "/social/avito.png",
    href: "https://www.avito.ru/brands/81081288a8f7291e52b4fca47e9a80b8/items/all/predlozheniya_uslug?s=profile_search_show_all&sellerId=889046354a08ebdbf1501c57e0a20c73",
    label: "Avito",
    note: "Наш профиль на Avito",
  },
  {
    key: "max",
    src: "/social/max.png",
    href: "https://max.ru/u/f9LHodD0cOIJ64h4UPpbJnpTrzmi4HtSYqq0iVx3GaZZe5xcTw5Q7wrvBss",
    label: "Max",
    note: "Написать в Max",
  },
] as const;

export default async function ContactsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contacts");
  const th = await getTranslations("header");
  const tn = await getTranslations("nav");

  const phoneHref = `tel:${th("phone").replace(/[^+\d]/g, "")}`;

  return (
    <section className="container-page py-14 lg:py-20">
      <Breadcrumbs
        items={[
          { label: tn("home"), href: "/" },
          { label: tn("contacts") },
        ]}
      />

      <div className="max-w-2xl mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-ink-900">{t("title")}</h1>
        <p className="mt-3 text-ink-600">{t("subtitle")}</p>
      </div>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-6">
          <ContactRow icon={<Phone className="h-5 w-5" />} label={t("phone")}>
            <a href={phoneHref} className="text-lg font-bold text-primary-800 hover:underline">
              {th("phone")}
            </a>
          </ContactRow>

          <ContactRow icon={<MapPin className="h-5 w-5" />} label={t("address")}>
            <span className="text-base text-ink-800">{t("addressValue")}</span>
          </ContactRow>

          <ContactRow icon={<Mail className="h-5 w-5" />} label={t("email")}>
            <a href="mailto:info@kgd-rental.ru" className="text-base text-ink-800 hover:text-primary-800">
              info@kgd-rental.ru
            </a>
          </ContactRow>

          <ContactRow icon={<Clock className="h-5 w-5" />} label={t("hours")}>
            <span className="text-base text-ink-800">{t("hoursValue")}</span>
          </ContactRow>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button asChild variant="primary" size="lg">
              <a href={phoneHref}>{t("callUs")}</a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="mailto:info@kgd-rental.ru">{t("writeUs")}</a>
            </Button>
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-lg font-bold text-ink-900">{t("mapTitle")}</h2>
          <YandexMap height={460} />
        </div>
      </div>

      {/* ===== Блок «Мы в мессенджерах» ===== */}
      <div className="mt-16">
        <div className="max-w-2xl mb-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-ink-900">
            Мы в мессенджерах и соцсетях
          </h2>
          <p className="mt-2 text-ink-600">
            Выберите удобный способ связи — ответим в течение 15 минут.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {socials.map(({ key, src, href, label, note }) => (
            <a
              key={key}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="group flex items-center gap-4 rounded-2xl border border-ink-100 bg-white p-5 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-muted">
                <Image
                  src={src}
                  alt={label}
                  width={100}
                  height={100}
                  className="h-9 w-9 object-contain transition-transform group-hover:scale-110"
                />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-bold text-ink-900">{label}</div>
                <div className="mt-0.5 text-xs text-ink-500 truncate">{note}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-ink-100 bg-white p-5 shadow-card">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
        {icon}
      </div>
      <div>
        <div className="text-xs font-semibold uppercase tracking-wider text-ink-500 mb-1">
          {label}
        </div>
        {children}
      </div>
    </div>
  );
}
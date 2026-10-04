import {
  Car, Wrench, Wallet, FileCheck, MapPin, Headphones,
} from "lucide-react";

const items = [
  {
    icon: Car,
    title: "Широкий выбор автомобилей",
    text: "Мы предлагаем разнообразные модели автомобилей на любой вкус и бюджет.",
  },
  {
    icon: Wrench,
    title: "Отличное состояние авто",
    text: "Все наши автомобили проходят тщательный техосмотр и обслуживание перед выдачей клиентам.",
  },
  {
    icon: Wallet,
    title: "Доступные цены",
    text: "Предлагаем выгодные тарифы и специальные предложения для длительных поездок.",
  },
  {
    icon: FileCheck,
    title: "Прозрачные условия аренды",
    text: "Без скрытых платежей и дополнительных сюрпризов — всё заранее оговорено и прописано.",
  },
  {
    icon: MapPin,
    title: "Удобное расположение офиса",
    text: "Наш офис находится в центре города, что делает аренду и возврат автомобиля максимально удобными.",
  },
  {
    icon: Headphones,
    title: "Профессиональное обслуживание",
    text: "Наши специалисты всегда готовы помочь с выбором автомобиля и ответить на любые вопросы.",
  },
];

export function Features() {
  return (
    <section className="py-20 lg:py-24">
      <div className="container-page">
        <div className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-ink-900">
            Почему стоит выбрать наш прокат автомобилей?
          </h2>
          <p className="mt-3 text-ink-600">
            Большой выбор автомобилей и лучший сервис для вашего отдыха в Калининграде.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-2xl border border-ink-100 bg-white p-6 shadow-card hover:shadow-card-hover transition-shadow"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-bold text-ink-900">{title}</h3>
              <p className="mt-1.5 text-sm text-ink-600 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
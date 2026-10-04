import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <html lang="ru">
      <body className="min-h-screen flex items-center justify-center bg-ink-50 px-6">
        <div className="max-w-md text-center">
          <div className="text-[120px] font-extrabold leading-none text-primary-700/20 select-none">
            404
          </div>
          <h1 className="mt-2 text-2xl font-extrabold text-ink-900">
            Страница не найдена
          </h1>
          <p className="mt-3 text-sm text-ink-600">
            Возможно, страница была удалена или вы ошиблись в адресе.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Button asChild variant="primary" size="lg">
              <Link href="/ru">На главную</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/ru/avtomobili">К автомобилям</Link>
            </Button>
          </div>
        </div>
      </body>
    </html>
  );
}
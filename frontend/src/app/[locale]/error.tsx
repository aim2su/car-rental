"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container-page py-20">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-3xl font-extrabold text-ink-900">Что-то пошло не так</h1>
        <p className="mt-3 text-sm text-ink-600">
          Попробуйте обновить страницу. Если ошибка повторяется — свяжитесь с нами.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button onClick={reset} variant="primary" size="lg">
            Попробовать снова
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href="/ru">На главную</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
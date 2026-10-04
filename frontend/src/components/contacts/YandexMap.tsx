"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    ymaps?: any;
  }
}

const API_KEY = "";
const OFFICE: [number, number] = [54.710426, 20.452214];

export function YandexMap({
  height = 420,
  className,
}: {
  height?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (mapRef.current) return;

    function init() {
      if (!ref.current || !window.ymaps) return;
      window.ymaps.ready(() => {
        const map = new window.ymaps.Map(ref.current, {
          center: OFFICE,
          zoom: 15,
          controls: ["zoomControl", "fullscreenControl"],
        });

        const placemark = new window.ymaps.Placemark(
          OFFICE,
          {
            balloonContentHeader: "Калининград Авто",
            balloonContentBody: "ул. Гагарина, 100<br/>Ежедневно, 24/7",
            hintContent: "Калининград Авто",
          },
          {
            preset: "islands#greenDotIcon",
          }
        );

        map.geoObjects.add(placemark);
        mapRef.current = map;
      });
    }

    if (window.ymaps) {
      init();
      return;
    }

    const existing = document.querySelector<HTMLScriptElement>(
      "script[data-yandex-maps]"
    );
    if (existing) {
      existing.addEventListener("load", init);
      return;
    }

    const script = document.createElement("script");
    script.src = `https://api-maps.yandex.ru/2.1/?lang=ru_RU${API_KEY ? `&apikey=${API_KEY}` : ""}`;
    script.async = true;
    script.dataset.yandexMaps = "1";
    script.addEventListener("load", init);
    document.head.appendChild(script);
  }, []);

  return (
    <div
      ref={ref}
      style={{ height }}
      className={className ?? "w-full rounded-2xl overflow-hidden border border-ink-100"}
    />
  );
}

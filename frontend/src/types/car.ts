export type CarClass = "economy" | "comfort" | "business" | "suv" | "premium" | "minivan";

export type Transmission = "automatic" | "variator" | "manual" | "robot";

export type Fuel = "petrol" | "diesel" | "hybrid" | "electric";

export type BodyType =
  | "suv"
  | "cabriolet"
  | "liftback"
  | "minivan"
  | "sedan"
  | "hatchback";

export type Drive = "front" | "rear" | "all";

export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  class: CarClass;
  bodyType: BodyType;
  transmission: Transmission;
  fuel: Fuel;
  seats: number;
  doors: number;
  baggage: number;
  pricePerDay: number;
  image: string;
  available: boolean;
  popular?: boolean;
  /** Короткая выноска «Дополнительно» (для карточки) */
  extra?: string;

  /* ===== Дополнительные поля для детальной страницы (все опциональны) ===== */
  generation?: string;             // F30/F31 (2011—2015)
  drive?: Drive;                   // Привод
  modification?: string;           // 320i 2.0 AT (184 л.с.)
  steering?: "left" | "right";     // Руль
  trim?: string;                   // SE (комплектация)
  extras?: string[];               // Полный список: Аудиосистема, Подогрев, Круиз...
  rentalType?: "self" | "withDriver";
  minAge?: number;
  minExperience?: number;
  deposit?: string;                // "Нет" | "5 000 ₽" и т.д.
  insurance?: string;              // "ОСАГО"
  minDays?: number;
  mileageLimit?: string;           // "Нет" | "300 км/сутки"
  idealFor?: string[];             // Список «Идеально для»
  priceTiers?: { label: string; price: number }[]; // 1-3 суток, 4-7 суток и т.д.
}

export interface CarFilters {
  brands?: string[];
  bodyTypes?: BodyType[];
  transmissions?: Transmission[];
  yearMin?: number;
  yearMax?: number;
  priceMin?: number;
  priceMax?: number;
  sort?: "popular" | "priceAsc" | "priceDesc";
}
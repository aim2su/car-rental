import { ChevronRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

export function Breadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav className="flex items-center gap-1.5 text-xs text-ink-500 mb-6">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-1.5">
          {i > 0 && <ChevronRight className="h-3 w-3 text-ink-300" />}
          {item.href ? (
            <Link href={item.href} className="hover:text-primary-800 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="font-semibold text-ink-800">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
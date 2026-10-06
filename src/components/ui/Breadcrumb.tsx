import { ChevronRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: ReactNode;
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-[13px] leading-5">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-1.5">
              {item.href && !isLast ? (
                <Link href={item.href} className="inline-flex items-center gap-1.5 text-on-surface hover:text-primary [&_svg]:size-4">
                  {item.icon}
                  {item.label}
                </Link>
              ) : (
                <span aria-current={isLast ? "page" : undefined} className="font-medium text-primary">
                  {item.label}
                </span>
              )}
              {!isLast && <ChevronRight className="size-3.5 text-on-surface-variant" aria-hidden />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

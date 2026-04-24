import { SiteLink } from "@/components/ui/site-link";

type Crumb = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: Crumb[];
};

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-muted">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={`${item.label}-${index}`} className="flex items-center gap-2">
            {item.href && !isLast ? (
              <SiteLink href={item.href} className="transition hover:text-[#0f79ff]">
                {item.label}
              </SiteLink>
            ) : (
              <span className={isLast ? "font-medium text-[#0b1f35]" : undefined}>{item.label}</span>
            )}
            {!isLast ? <span aria-hidden="true">/</span> : null}
          </span>
        );
      })}
    </nav>
  );
}

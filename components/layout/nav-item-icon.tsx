import { cn } from "@/lib/utils";

type NavItemIconProps = {
  itemId: string;
  className?: string;
};

function IconSvg({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("shrink-0", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function NavItemIcon({ itemId, className }: NavItemIconProps) {
  switch (itemId) {
    case "acasa":
      return (
        <IconSvg className={className}>
          <path d="m4 11.5 8-7 8 7" />
          <path d="M6.5 10.2v8.3h11v-8.3" />
          <path d="M10 18.5v-5h4v5" />
        </IconSvg>
      );
    case "despre-proiect":
      return (
        <IconSvg className={className}>
          <rect x="6" y="4" width="12" height="16" rx="2.4" />
          <path d="M9 8h6" />
          <path d="M9 12h6" />
          <path d="M9 16h3" />
        </IconSvg>
      );
    case "solutii":
      return (
        <IconSvg className={className}>
          <rect x="4" y="4" width="6.5" height="6.5" rx="1.6" />
          <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.6" />
          <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.6" />
          <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.6" />
        </IconSvg>
      );
    case "industrii":
      return (
        <IconSvg className={className}>
          <path d="M4.5 19.5h15" />
          <path d="M6 19.5V8.8l4.7 2.7V8.8l5.3 3V19.5" />
          <path d="M8 15h1.6" />
          <path d="M12 15h1.6" />
          <path d="M16 15h1.2" />
        </IconSvg>
      );
    case "asistent-virtual":
      return (
        <IconSvg className={className}>
          <path d="M12 7V4" />
          <rect x="5" y="7" width="14" height="10" rx="4" />
          <path d="M8.5 12h.01" />
          <path d="M15.5 12h.01" />
          <path d="M9 17v2" />
          <path d="M15 17v2" />
        </IconSvg>
      );
    case "product":
      return (
        <IconSvg className={className}>
          <path d="m12 3.8 7 3.8-7 3.8-7-3.8 7-3.8Z" />
          <path d="M5 7.6v8.8l7 3.8 7-3.8V7.6" />
          <path d="M12 11.4v8.8" />
        </IconSvg>
      );
    case "studii-de-caz":
      return (
        <IconSvg className={className}>
          <rect x="5" y="4" width="14" height="16" rx="2.4" />
          <path d="M9 15.5v-3" />
          <path d="M12 15.5V9" />
          <path d="M15 15.5v-5" />
          <path d="M8.5 17.5h7" />
        </IconSvg>
      );
    case "arhitectura":
      return (
        <IconSvg className={className}>
          <path d="m12 3.8 8 4.4-8 4.4-8-4.4 8-4.4Z" />
          <path d="m5.7 12.4 6.3 3.5 6.3-3.5" />
          <path d="m5.7 16.2 6.3 3.5 6.3-3.5" />
        </IconSvg>
      );
    case "parteneri":
      return (
        <IconSvg className={className}>
          <path d="M8.8 12.2 6.6 10a2.5 2.5 0 0 1 0-3.5 2.5 2.5 0 0 1 3.5 0l1.1 1.1" />
          <path d="m15.2 12.2 2.2-2.2a2.5 2.5 0 0 0 0-3.5 2.5 2.5 0 0 0-3.5 0l-1.1 1.1" />
          <path d="m8 12 4 4 4-4" />
          <path d="m10 10 2-2 2 2" />
        </IconSvg>
      );
    case "contact":
      return (
        <IconSvg className={className}>
          <rect x="4" y="6" width="16" height="12" rx="3" />
          <path d="m5 8 7 5 7-5" />
        </IconSvg>
      );
    default:
      return (
        <IconSvg className={className}>
          <circle cx="12" cy="12" r="7.5" />
          <path d="M12 8v4l2.5 2" />
        </IconSvg>
      );
  }
}

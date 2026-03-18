import { cn } from "@/lib/utils";

type IconBadgeProps = {
  icon: string;
  className?: string;
};

function IconGlyph({ icon }: { icon: string }) {
  switch (icon) {
    case "bot":
      return (
        <>
          <rect x="5" y="7" width="14" height="10" rx="3" />
          <path d="M12 4v3" />
          <path d="M8 12h.01" />
          <path d="M16 12h.01" />
          <path d="M9 17v2" />
          <path d="M15 17v2" />
        </>
      );
    case "pipeline":
      return (
        <>
          <path d="M5 6h6v5H5z" />
          <path d="M13 13h6v5h-6z" />
          <path d="M11 8h2a2 2 0 0 1 2 2v3" />
          <path d="M9 16H7a2 2 0 0 1-2-2V11" />
        </>
      );
    case "faq":
      return (
        <>
          <path d="M12 18h.01" />
          <path d="M9.1 9a3 3 0 1 1 5.8 1c0 2-3 2-3 4" />
          <circle cx="12" cy="12" r="9" />
        </>
      );
    case "form":
      return (
        <>
          <rect x="5" y="4" width="14" height="16" rx="2" />
          <path d="M8 8h8" />
          <path d="M8 12h8" />
          <path d="M8 16h5" />
        </>
      );
    case "calendar":
      return (
        <>
          <rect x="4" y="6" width="16" height="14" rx="2" />
          <path d="M8 4v4" />
          <path d="M16 4v4" />
          <path d="M4 10h16" />
        </>
      );
    case "integration":
      return (
        <>
          <path d="M7 7h4v4H7z" />
          <path d="M13 13h4v4h-4z" />
          <path d="M11 9h2a2 2 0 0 1 2 2v2" />
          <path d="M9 15H7a2 2 0 0 1-2-2v-2" />
        </>
      );
    case "support":
      return (
        <>
          <path d="M4 12a8 8 0 0 1 16 0" />
          <path d="M6 14v2a2 2 0 0 0 2 2h1" />
          <path d="M18 14v1a3 3 0 0 1-3 3h-1" />
          <rect x="3" y="11" width="3" height="5" rx="1" />
          <rect x="18" y="11" width="3" height="5" rx="1" />
        </>
      );
    case "factory":
      return (
        <>
          <path d="M4 19V9l5 3V9l5 3V5l6 4v10Z" />
          <path d="M4 19h16" />
        </>
      );
    case "tools":
      return <path d="M14 7a4 4 0 0 0 5 5l-8 8-3-3 8-8a4 4 0 0 0-2-7Z" />;
    case "cart":
      return (
        <>
          <circle cx="9" cy="19" r="1.5" />
          <circle cx="17" cy="19" r="1.5" />
          <path d="M3 5h2l2.4 9.2a1 1 0 0 0 1 .8h8.8a1 1 0 0 0 1-.8L20 8H7" />
        </>
      );
    case "health":
      return (
        <>
          <path d="M12 21s-6-3.7-8.5-8.1A5.5 5.5 0 0 1 12 5a5.5 5.5 0 0 1 8.5 7.9C18 17.3 12 21 12 21Z" />
          <path d="M12 8v6" />
          <path d="M9 11h6" />
        </>
      );
    case "hospitality":
      return (
        <>
          <path d="M7 4v8" />
          <path d="M11 4v8" />
          <path d="M7 8h4" />
          <path d="M9 12v8" />
          <path d="M15 4c1.7 0 3 1.3 3 3v13" />
        </>
      );
    case "logistics":
      return (
        <>
          <path d="M3 8h11v8H3z" />
          <path d="M14 11h3l3 3v2h-6z" />
          <circle cx="7" cy="18" r="1.5" />
          <circle cx="17" cy="18" r="1.5" />
        </>
      );
    case "b2b":
      return (
        <>
          <circle cx="8" cy="9" r="3" />
          <circle cx="16" cy="9" r="3" />
          <path d="M3 19a5 5 0 0 1 10 0" />
          <path d="M11 19a5 5 0 0 1 10 0" />
        </>
      );
    case "message":
      return <path d="M5 6h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H9l-4 3v-3H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" />;
    case "spark":
      return (
        <>
          <path d="m12 3 1.7 4.3L18 9l-4.3 1.7L12 15l-1.7-4.3L6 9l4.3-1.7Z" />
          <path d="M5 19l1-2 2-1-2-1-1-2-1 2-2 1 2 1Z" />
          <path d="M19 19l.7-1.3L21 17l-1.3-.7L19 15l-.7 1.3L17 17l1.3.7Z" />
        </>
      );
    case "shield":
      return (
        <>
          <path d="M12 3 5 6v5c0 5 3.4 8 7 10 3.6-2 7-5 7-10V6Z" />
          <path d="m9.5 12 1.7 1.7 3.3-3.8" />
        </>
      );
    case "route":
      return (
        <>
          <circle cx="6" cy="7" r="2" />
          <circle cx="18" cy="17" r="2" />
          <path d="M8 7h4a4 4 0 0 1 4 4v4" />
          <path d="M16 15h-4a4 4 0 0 1-4-4V9" />
        </>
      );
    case "mail":
      return (
        <>
          <rect x="4" y="6" width="16" height="12" rx="2" />
          <path d="m5 8 7 5 7-5" />
        </>
      );
    case "browser":
      return (
        <>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 9h18" />
          <path d="M7 7h.01" />
          <path d="M10 7h.01" />
        </>
      );
    case "server":
      return (
        <>
          <rect x="4" y="4" width="16" height="6" rx="2" />
          <rect x="4" y="14" width="16" height="6" rx="2" />
          <path d="M8 7h.01" />
          <path d="M8 17h.01" />
        </>
      );
    case "database":
      return (
        <>
          <ellipse cx="12" cy="6" rx="7" ry="3" />
          <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
          <path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
        </>
      );
    default:
      return <circle cx="12" cy="12" r="7" />;
  }
}

export function IconBadge({ icon, className }: IconBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[#0f79ff]/12 bg-white text-[#0f79ff] shadow-[0_12px_28px_rgba(15,121,255,0.08)]",
        className,
      )}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <IconGlyph icon={icon} />
      </svg>
    </span>
  );
}

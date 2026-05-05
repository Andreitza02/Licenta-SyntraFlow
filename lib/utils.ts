export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type ButtonVariant = "primary" | "secondary" | "ghost";

export function buttonVariants(variant: ButtonVariant = "primary", className?: string) {
  const base =
    "interactive-button inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold tracking-[0.02em] transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f79ff]/50";

  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-[length:160%_100%] [background:var(--sf-gradient-brand-cta)] bg-left text-white shadow-[var(--sf-shadow-cta)] hover:-translate-y-1 hover:bg-right hover:shadow-[var(--sf-shadow-cta-hover)] active:translate-y-0",
    secondary:
      "border border-[#0d3358]/12 bg-white/86 text-[#0b1f35] shadow-[var(--sf-shadow-card-rest)] backdrop-blur-[12px] hover:-translate-y-1 hover:border-[#0f79ff]/25 hover:bg-white/92 hover:shadow-[var(--sf-shadow-card-hover)] active:translate-y-0",
    ghost:
      "text-[#0b1f35] hover:-translate-y-0.5 hover:bg-white/80",
  };

  return cn(base, variants[variant], className);
}

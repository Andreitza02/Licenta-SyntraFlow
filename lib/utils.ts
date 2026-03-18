export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type ButtonVariant = "primary" | "secondary" | "ghost";

export function buttonVariants(variant: ButtonVariant = "primary", className?: string) {
  const base =
    "interactive-button inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold tracking-[0.02em] transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f79ff]/50";

  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-[length:160%_100%] bg-gradient-to-r from-[#0f79ff] via-[#2d8dff] to-[#14b8c7] bg-left text-white shadow-[0_18px_45px_rgba(15,121,255,0.22)] hover:-translate-y-1 hover:bg-right hover:shadow-[0_22px_60px_rgba(15,121,255,0.28)] active:translate-y-0",
    secondary:
      "border border-[#0d3358]/12 bg-white/90 text-[#0b1f35] shadow-[0_14px_34px_rgba(11,31,53,0.08)] hover:-translate-y-1 hover:border-[#0f79ff]/25 hover:bg-white hover:shadow-[0_20px_44px_rgba(11,31,53,0.12)] active:translate-y-0",
    ghost:
      "text-[#0b1f35] hover:-translate-y-0.5 hover:bg-white/80",
  };

  return cn(base, variants[variant], className);
}

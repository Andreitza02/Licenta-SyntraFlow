import { cn } from "@/lib/utils";

type ChipProps = {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
};

export function Chip({ label, isActive = false, onClick }: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f79ff]/40",
        isActive
          ? "border-[#0f79ff]/20 bg-[#0b1f35] text-white shadow-[0_12px_28px_rgba(11,31,53,0.16)]"
          : "border-[#0d3358]/10 bg-white text-[#0b1f35] hover:border-[#0f79ff]/18",
      )}
    >
      {label}
    </button>
  );
}

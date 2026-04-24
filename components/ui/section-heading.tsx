import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description: string;
  align?: "left" | "center";
  size?: "default" | "compact";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  size = "default",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h2
        className={cn(
          "font-display mt-4 font-semibold tracking-[-0.03em] text-[#0b1f35]",
          size === "compact" ? "text-3xl md:text-[2.8rem]" : "text-3xl md:text-5xl",
        )}
      >
        {title}
      </h2>
      <p className={cn("mt-4 text-muted", size === "compact" ? "text-base leading-7 md:text-[1.05rem]" : "text-base leading-8 md:text-lg")}>
        {description}
      </p>
    </div>
  );
}

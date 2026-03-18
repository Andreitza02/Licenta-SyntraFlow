import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
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
      <h2 className="font-display mt-4 text-3xl font-semibold tracking-[-0.03em] text-[#0b1f35] md:text-5xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-8 text-muted md:text-lg">{description}</p>
    </div>
  );
}

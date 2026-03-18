import type { ReactNode } from "react";
import Link from "next/link";

import { buttonVariants } from "@/lib/utils";

type CTAButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  ariaLabel?: string;
};

export function CTAButton({
  href,
  children,
  variant = "primary",
  className,
  ariaLabel,
}: CTAButtonProps) {
  return (
    <Link href={href} className={buttonVariants(variant, className)} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}

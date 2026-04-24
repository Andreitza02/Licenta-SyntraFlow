import type { AnchorHTMLAttributes, ReactNode } from "react";

type SiteLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  children: ReactNode;
};

export function SiteLink({ href, children, ...props }: SiteLinkProps) {
  return (
    <a href={href} {...props}>
      {children}
    </a>
  );
}

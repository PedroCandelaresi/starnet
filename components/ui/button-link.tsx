import type { AnchorHTMLAttributes, ReactNode } from "react";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
  external?: boolean;
  showArrow?: boolean;
};

const variantClasses = {
  primary:
    "border border-brand/60 bg-brand text-slate-950 shadow-[0_18px_40px_rgba(28,233,122,0.24)] hover:bg-brand-strong hover:shadow-[0_22px_48px_rgba(28,233,122,0.32)]",
  secondary:
    "border border-white/15 bg-white/6 text-white hover:border-brand/40 hover:bg-white/10",
  ghost: "border border-transparent bg-transparent text-white hover:bg-white/8",
} as const;

const sizeClasses = {
  md: "min-h-11 px-5 text-sm",
  lg: "min-h-12 px-6 text-sm sm:text-base",
} as const;

export function ButtonLink({
  href,
  children,
  className,
  variant = "primary",
  size = "md",
  external,
  showArrow = true,
  ...props
}: ButtonLinkProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  const content = (
    <>
      <span>{children}</span>
      {showArrow ? <ArrowUpRight className="size-4" aria-hidden="true" /> : null}
    </>
  );

  if (external || href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:")) {
    return (
      <a
        className={classes}
        href={href}
        rel={props.target === "_blank" ? "noreferrer" : props.rel}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <Link className={classes} href={href} {...props}>
      {content}
    </Link>
  );
}

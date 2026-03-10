import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

type LogoProps = {
  compact?: boolean;
  className?: string;
};

export function Logo({ compact = false, className }: LogoProps) {
  if (compact) {
    return (
      <Link className={cn("inline-flex items-center gap-3", className)} href="/">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#03130d] shadow-[0_10px_30px_rgba(0,0,0,0.24)] sm:hidden">
          <Image
            src="/brand/logo-mark.jpeg"
            alt="STARNET"
            width={40}
            height={40}
            className="size-10 object-cover"
            priority
          />
        </div>
        <div className="hidden overflow-hidden rounded-2xl border border-white/12 bg-white/95 px-3 py-2 shadow-[0_12px_28px_rgba(0,0,0,0.18)] sm:block">
          <Image
            src="/brand/logo-horizontal.jpeg"
            alt="STARNET"
            width={180}
            height={54}
            className="h-8 w-auto object-contain"
            priority
          />
        </div>
      </Link>
    );
  }

  return (
    <Link className={cn("inline-flex items-center gap-3", className)} href="/">
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#03130d] shadow-[0_10px_30px_rgba(0,0,0,0.24)]">
        <Image
          src="/brand/logo-primary.jpeg"
          alt="STARNET"
          width={64}
          height={64}
          className="size-14 object-cover sm:size-16"
          priority
        />
      </div>
      <div className="leading-none">
        <span className="block font-heading text-xl font-semibold tracking-[-0.06em] text-white sm:text-2xl">
          STARNET
        </span>
        <span className="mt-1 block text-[11px] uppercase tracking-[0.28em] text-slate-400">
          Neuquén Capital
        </span>
      </div>
    </Link>
  );
}

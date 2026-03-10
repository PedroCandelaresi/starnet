import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

type LogoProps = {
  compact?: boolean;
  className?: string;
};

export function Logo({ compact = false, className }: LogoProps) {
  return (
    <Link className={cn("inline-flex items-center gap-3", className)} href="/">
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#03130d] shadow-[0_10px_30px_rgba(0,0,0,0.24)]">
        <Image
          src="/brand/logo-mark.jpeg"
          alt="STARNET"
          width={compact ? 40 : 46}
          height={compact ? 40 : 46}
          className="size-10 object-cover sm:size-[46px]"
          priority
        />
      </div>
      <div className="leading-none">
        <span className="block font-heading text-xl font-semibold tracking-[-0.06em] text-white sm:text-2xl">
          STARNET
        </span>
        {!compact ? (
          <span className="mt-1 block text-[11px] uppercase tracking-[0.28em] text-slate-400">
            Soluciones digitales
          </span>
        ) : null}
      </div>
    </Link>
  );
}

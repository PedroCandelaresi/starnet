import type { LeadStatusValue } from "@/lib/lead-form";
import { leadStatusLabels } from "@/lib/lead-form";

import { cn } from "@/lib/utils";

const toneMap: Record<LeadStatusValue, string> = {
  NEW: "border-cyan-400/20 bg-cyan-500/10 text-cyan-100",
  CONTACTED: "border-blue-400/20 bg-blue-500/10 text-blue-100",
  QUALIFIED: "border-violet-400/20 bg-violet-500/10 text-violet-100",
  QUOTED: "border-amber-400/20 bg-amber-500/10 text-amber-100",
  WON: "border-brand/25 bg-brand/10 text-emerald-50",
  LOST: "border-rose-400/20 bg-rose-500/10 text-rose-100",
};

type LeadStatusBadgeProps = {
  status: LeadStatusValue;
};

export function LeadStatusBadge({ status }: LeadStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]",
        toneMap[status],
      )}
    >
      {leadStatusLabels[status]}
    </span>
  );
}

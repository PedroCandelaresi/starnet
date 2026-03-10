"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

import { LoaderCircle } from "lucide-react";
import { useFormStatus } from "react-dom";

import { cn } from "@/lib/utils";

type AdminSubmitButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  pendingLabel?: string;
};

export function AdminSubmitButton({
  children,
  pendingLabel = "Procesando...",
  className,
  ...props
}: AdminSubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-brand/60 bg-brand px-5 text-sm font-semibold text-slate-950 transition hover:bg-brand-strong disabled:cursor-not-allowed disabled:opacity-70",
        className,
      )}
      disabled={pending || props.disabled}
      {...props}
    >
      {pending ? <LoaderCircle className="size-4 animate-spin" aria-hidden="true" /> : null}
      <span>{pending ? pendingLabel : children}</span>
    </button>
  );
}

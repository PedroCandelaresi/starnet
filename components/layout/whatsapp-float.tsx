import { MessageCircleMore } from "lucide-react";

import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { siteConfig } from "@/lib/site-config";

export function WhatsAppFloat() {
  return (
    <a
      href={buildWhatsAppUrl()}
      target="_blank"
      rel="noreferrer"
      aria-label={`Contactar a ${siteConfig.name} por WhatsApp`}
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-3 rounded-full border border-brand/40 bg-slate-950/90 px-4 py-3 text-sm font-semibold text-white shadow-[0_16px_45px_rgba(0,0,0,0.45)] backdrop-blur transition hover:-translate-y-0.5 hover:border-brand hover:bg-slate-900"
    >
      <span className="inline-flex size-10 items-center justify-center rounded-full bg-brand text-slate-950">
        <MessageCircleMore className="size-5" aria-hidden="true" />
      </span>
      <span className="leading-none">
        <span className="block text-sm font-semibold">WhatsApp</span>
        <span className="mt-1 hidden text-[11px] font-medium uppercase tracking-[0.18em] text-brand/80 sm:block">
          Respuesta rápida
        </span>
      </span>
    </a>
  );
}

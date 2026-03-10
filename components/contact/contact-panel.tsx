import { Clock3, Mail, MapPinned, MessageCircleMore, PhoneCall } from "lucide-react";

import { ContactForm } from "@/components/contact/contact-form";
import { ButtonLink } from "@/components/ui/button-link";
import { siteConfig } from "@/lib/site-config";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import type { LeadService } from "@/lib/lead-form";

type ContactPanelProps = {
  title: string;
  description: string;
  origin: string;
  initialService?: LeadService;
};

export function ContactPanel({ title, description, origin, initialService }: ContactPanelProps) {
  return (
    <section className="section-spacing">
      <div className="shell-container">
        <div className="glass-panel overflow-hidden rounded-[2rem] p-5 sm:p-8 lg:p-10">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
            <div>
              <span className="eyebrow">Contacto</span>
              <h2 className="mt-4 text-balance text-3xl font-semibold text-white sm:text-4xl">{title}</h2>
              <p className="mt-4 max-w-xl text-base leading-8 text-slate-300">{description}</p>

              <div className="mt-8 space-y-4 text-sm leading-7 text-slate-200">
                <div className="flex items-start gap-3 rounded-[1.4rem] border border-white/10 bg-white/5 p-4">
                  <PhoneCall className="mt-1 size-4 text-brand" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-white">Teléfono / WhatsApp</p>
                    <a className="text-slate-300 transition hover:text-brand" href={siteConfig.phoneHref}>
                      {siteConfig.phoneDisplay}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-[1.4rem] border border-white/10 bg-white/5 p-4">
                  <MapPinned className="mt-1 size-4 text-brand" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-white">Ubicación visible</p>
                    <p className="text-slate-300">{siteConfig.location}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-[1.4rem] border border-white/10 bg-white/5 p-4">
                  <Clock3 className="mt-1 size-4 text-brand" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-white">Respuesta esperada</p>
                    <p className="text-slate-300">Canal rápido por WhatsApp, seguimiento ordenado y próximos pasos claros.</p>
                  </div>
                </div>
                {siteConfig.contactEmail ? (
                  <div className="flex items-start gap-3 rounded-[1.4rem] border border-white/10 bg-white/5 p-4">
                    <Mail className="mt-1 size-4 text-brand" aria-hidden="true" />
                    <div>
                      <p className="font-semibold text-white">Email</p>
                      <a className="text-slate-300 transition hover:text-brand" href={`mailto:${siteConfig.contactEmail}`}>
                        {siteConfig.contactEmail}
                      </a>
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="mt-8">
                <ButtonLink href={buildWhatsAppUrl()} target="_blank" variant="secondary">
                  <MessageCircleMore className="size-4" aria-hidden="true" />
                  Quiero respuesta por WhatsApp
                </ButtonLink>
              </div>
            </div>

            <div className="rounded-[1.8rem] border border-white/10 bg-slate-950/45 p-5 sm:p-7">
              <div className="mb-6 rounded-[1.4rem] border border-brand/20 bg-brand/10 p-4 text-sm leading-7 text-slate-200">
                Contanos tu necesidad y te devolvemos una respuesta concreta: diagnóstico, alcance y mejor canal para avanzar.
              </div>
              <ContactForm origin={origin} initialService={initialService} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

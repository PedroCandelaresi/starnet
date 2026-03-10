import Link from "next/link";
import { Mail, MapPinned, PhoneCall } from "lucide-react";

import { Logo } from "@/components/layout/logo";
import { ButtonLink } from "@/components/ui/button-link";
import { services, siteConfig } from "@/lib/site-config";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/8 bg-[#020b08] py-14">
      <div className="shell-container grid gap-10 lg:grid-cols-[1.3fr_0.8fr_0.9fr]">
        <div className="space-y-5">
          <Logo />
          <p className="max-w-xl text-sm leading-7 text-slate-300">
            STARNET impulsa soporte técnico y soluciones digitales con una base clara, profesional y lista para crecer.
            Trabajamos con foco en conversión, orden operativo y buena experiencia para cada cliente.
          </p>
          <div className="rounded-[1.6rem] border border-brand/20 bg-brand/10 p-4 text-sm leading-7 text-slate-200">
            WhatsApp directo, diagnóstico claro y una implementación prolija para cada servicio.
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={buildWhatsAppUrl()} target="_blank">
              Hablar por WhatsApp
            </ButtonLink>
            <ButtonLink href="/contacto" variant="secondary">
              Formulario de contacto
            </ButtonLink>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">Servicios</p>
          <ul className="mt-5 space-y-3 text-sm text-slate-200">
            {services.map((service) => (
              <li key={service.slug}>
                <Link className="transition hover:text-brand" href={`/servicios/${service.slug}`}>
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">Contacto</p>
          <ul className="mt-5 space-y-4 text-sm text-slate-200">
            <li className="flex items-start gap-3">
              <PhoneCall className="mt-0.5 size-4 text-brand" aria-hidden="true" />
              <a className="transition hover:text-brand" href={siteConfig.phoneHref}>
                {siteConfig.phoneDisplay}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPinned className="mt-0.5 size-4 text-brand" aria-hidden="true" />
              <span>{siteConfig.location}</span>
            </li>
            {siteConfig.contactEmail ? (
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 size-4 text-brand" aria-hidden="true" />
                <a className="transition hover:text-brand" href={`mailto:${siteConfig.contactEmail}`}>
                  {siteConfig.contactEmail}
                </a>
              </li>
            ) : null}
          </ul>
        </div>
      </div>

      <div className="shell-container mt-10 border-t border-white/8 pt-6 text-xs uppercase tracking-[0.2em] text-slate-500">
        {new Date().getFullYear()} STARNET. Servicios tecnológicos y soluciones digitales en {siteConfig.location}.
      </div>
    </footer>
  );
}

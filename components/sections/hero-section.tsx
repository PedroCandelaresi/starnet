import Image from "next/image";
import { BadgeCheck, MapPinned, PhoneCall, ShieldCheck } from "lucide-react";

import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { featuredStats, siteConfig } from "@/lib/site-config";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 sm:pt-16 lg:pt-24 lg:pb-24">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top_left,rgba(32,199,93,0.18),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(35,193,116,0.12),transparent_24%)]" />
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <span className="eyebrow">Neuquén Capital · Soluciones reales</span>
            <h1 className="mt-6 max-w-4xl text-balance text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              Soporte técnico y desarrollo digital para negocios que necesitan resolver, vender y crecer.
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-slate-300 sm:text-xl">
              Desde una notebook con fallas hasta una web pensada para captar clientes, STARNET combina criterio técnico, rapidez comercial y una implementación lista para producción.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={buildWhatsAppUrl()} target="_blank" size="lg">
                Solicitar diagnóstico por WhatsApp
              </ButtonLink>
              <ButtonLink href="/contacto" size="lg" variant="secondary">
                Quiero una propuesta
              </ButtonLink>
            </div>

            <div className="mt-8 flex flex-wrap gap-4 text-sm text-slate-300">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                <MapPinned className="size-4 text-brand" aria-hidden="true" />
                <span>{siteConfig.location}</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                <PhoneCall className="size-4 text-brand" aria-hidden="true" />
                <span>{siteConfig.phoneDisplay}</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                <ShieldCheck className="size-4 text-brand" aria-hidden="true" />
                <span>Base lista para producción</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="glass-panel tech-grid relative overflow-hidden rounded-[2rem] p-4 sm:p-6">
              <div className="grid gap-4 sm:grid-cols-[1.05fr_0.95fr]">
                <div className="relative overflow-hidden rounded-[1.7rem] border border-white/10 bg-slate-950/50 p-3">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(30,255,136,0.22),transparent_45%)]" />
                  <div className="relative overflow-hidden rounded-[1.4rem] border border-brand/20 bg-[#03140d]">
                    <Image
                      src="/brand/brochure-preview.png"
                      alt="Brochure de STARNET"
                      width={591}
                      height={886}
                      className="h-full w-full object-cover"
                      priority
                    />
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="rounded-[1.6rem] border border-white/10 bg-white/6 p-5">
                    <div className="inline-flex size-11 items-center justify-center rounded-2xl bg-brand/16 text-brand">
                      <BadgeCheck className="size-5" aria-hidden="true" />
                    </div>
                    <p className="mt-4 text-sm uppercase tracking-[0.22em] text-slate-400">Servicios destacados</p>
                    <div className="mt-4 space-y-3 text-sm leading-6 text-slate-200">
                      <p>Servicio técnico en computadoras y notebooks</p>
                      <p>Diseño de páginas web</p>
                      <p>Menú QR para negocios</p>
                    </div>
                  </div>

                  <div className="rounded-[1.6rem] border border-brand/20 bg-brand/10 p-5">
                    <p className="text-sm uppercase tracking-[0.22em] text-brand/80">WhatsApp directo</p>
                    <p className="mt-3 text-2xl font-semibold text-white">Consultas rápidas, respuesta clara y siguiente paso definido</p>
                    <p className="mt-3 text-sm leading-7 text-slate-200">
                      CTA visibles, mensaje prearmado y un flujo pensado para transformar visitas en conversaciones útiles.
                    </p>
                  </div>

                  <div className="grid gap-3">
                    {featuredStats.map((stat) => (
                      <div key={stat.value} className="rounded-[1.35rem] border border-white/10 bg-slate-950/50 p-4">
                        <p className="text-sm font-semibold text-white">{stat.value}</p>
                        <p className="mt-2 text-sm leading-6 text-slate-400">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

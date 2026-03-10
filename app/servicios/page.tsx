import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";

import { ServiceCard } from "@/components/common/service-card";
import { ContactPanel } from "@/components/contact/contact-panel";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { createMetadata } from "@/lib/metadata";
import { services } from "@/lib/site-config";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = createMetadata({
  title: "Servicios | STARNET",
  description:
    "Conoce los servicios de STARNET en Neuquén Capital: soporte técnico, mantenimiento, diseño web, menú QR y sistemas web a medida.",
  path: "/servicios",
});

const extraBenefits = [
  "Arquitectura web simple y lista para escalar.",
  "CTA a WhatsApp integrados de punta a punta.",
  "Copy comercial enfocado en confianza y conversión.",
  "Base preparada para sumar portfolio, blog o nuevas landings.",
];

export default function ServicesPage() {
  return (
    <>
      <section className="section-spacing">
        <Container>
            <SectionHeading
              eyebrow="Servicios STARNET"
              title="Un portafolio pensado para resolver soporte, presencia digital y procesos"
              description="El sitio queda listo para presentar cada servicio con identidad propia, rutas escalables y un mensaje comercial claro orientado a generar consultas."
          />

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={buildWhatsAppUrl()} target="_blank">
              Pedir asesoramiento
            </ButtonLink>
            <ButtonLink href="/contacto" variant="secondary">
              Quiero dejar mis datos
            </ButtonLink>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </Container>
      </section>

      <section className="section-spacing pt-0">
        <Container>
          <div className="glass-panel grid gap-8 rounded-[2rem] p-6 lg:grid-cols-[0.9fr_1.1fr] lg:p-8">
            <div>
              <p className="eyebrow">Valor agregado</p>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                No solo mostramos servicios: construimos una base comercial usable.
              </h2>
              <p className="mt-4 max-w-xl text-base leading-8 text-slate-300">
                La propuesta unifica soporte, desarrollo y conversión. Eso permite que el sitio sea simple de mantener, rápido de entender y preparado para crecer.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {extraBenefits.map((benefit) => (
                <div key={benefit} className="rounded-[1.5rem] border border-white/10 bg-slate-950/40 p-5">
                  <CheckCircle2 className="size-5 text-brand" aria-hidden="true" />
                  <p className="mt-4 text-sm leading-7 text-slate-200">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <ContactPanel
        title="Pedí una propuesta según el servicio que necesitás"
        description="Si ya sabés qué estás buscando, podemos avanzar por formulario o por WhatsApp con un mensaje prearmado para agilizar la conversación."
        origin="services-page"
      />
    </>
  );
}

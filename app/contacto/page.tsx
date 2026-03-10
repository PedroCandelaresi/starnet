import type { Metadata } from "next";

import { ContactPanel } from "@/components/contact/contact-panel";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { createMetadata } from "@/lib/metadata";
import { faqItems } from "@/lib/site-config";

export const metadata: Metadata = createMetadata({
  title: "Contacto | STARNET",
  description:
    "Contactate con STARNET en Neuquén Capital por WhatsApp o formulario para soporte técnico, mantenimiento, diseño web y sistemas web.",
  path: "/contacto",
});

export default function ContactPage() {
  return (
    <>
      <section className="section-spacing">
        <Container>
          <SectionHeading
            eyebrow="Contacto directo"
            title="Un canal simple para iniciar consultas, presupuestos o soporte"
            description="El sitio prioriza la conversión: formulario validado, guardado de leads en base de datos y continuidad inmediata por WhatsApp."
          />
        </Container>
      </section>

      <ContactPanel
        title="Dejanos tus datos y avanzamos"
        description="Podés escribir qué equipo necesita revisión, qué tipo de web querés lanzar o qué proceso necesitás digitalizar."
        origin="contact-page"
      />

      <section className="section-spacing pt-0">
        <Container>
          <div className="glass-panel rounded-[2rem] p-6 lg:p-8">
            <SectionHeading
              eyebrow="FAQ"
              title="Preguntas frecuentes"
              description="Respuestas breves para despejar dudas comunes antes de contactarte."
            />
            <div className="mt-8 grid gap-5 lg:grid-cols-2">
              {faqItems.map((item) => (
                <article key={item.question} className="rounded-[1.6rem] border border-white/10 bg-slate-950/40 p-5">
                  <h2 className="text-xl font-semibold text-white">{item.question}</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{item.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

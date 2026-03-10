import type { Metadata } from "next";
import Image from "next/image";
import { Compass, Layers3, Signal } from "lucide-react";

import { ContactPanel } from "@/components/contact/contact-panel";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { aboutValues, processSteps } from "@/lib/site-config";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Nosotros | STARNET",
  description:
    "Conoce el enfoque de STARNET: soporte técnico y soluciones digitales con una propuesta clara, escalable y profesional en Neuquén Capital.",
  path: "/nosotros",
});

const icons = [Compass, Layers3, Signal] as const;

export default function AboutPage() {
  return (
    <>
      <section className="section-spacing">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-center">
            <div>
              <SectionHeading
                eyebrow="Nosotros"
                title="STARNET nace para acercar tecnología útil, clara y con criterio profesional"
                description="La propuesta une cercanía, soporte técnico y construcción digital sobre una arquitectura simple, mantenible y lista para producción."
              />
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {aboutValues.map((value, index) => {
                  const Icon = icons[index];

                  return (
                    <article key={value.title} className="rounded-[1.6rem] border border-white/10 bg-white/5 p-5">
                      <div className="inline-flex size-11 items-center justify-center rounded-2xl bg-brand/16 text-brand">
                        <Icon className="size-5" aria-hidden="true" />
                      </div>
                      <h2 className="mt-4 text-lg font-semibold text-white">{value.title}</h2>
                      <p className="mt-3 text-sm leading-7 text-slate-300">{value.description}</p>
                    </article>
                  );
                })}
              </div>
            </div>

            <div className="glass-panel overflow-hidden rounded-[2rem] p-4">
              <div className="relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-slate-950/60">
                <Image
                  src="/brand/brochure-preview.png"
                  alt="Material comercial de STARNET"
                  width={591}
                  height={886}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-spacing pt-0">
        <Container>
          <div className="glass-panel rounded-[2rem] p-6 lg:p-8">
            <SectionHeading
              eyebrow="Forma de trabajo"
              title="Diagnóstico, implementación y seguimiento sin ruido"
              description="STARNET no vende soluciones infladas. Cada trabajo parte de entender el contexto, elegir el alcance correcto y dejar base para evolucionar."
            />
            <div className="mt-8 grid gap-5 lg:grid-cols-4">
              {processSteps.map((step) => (
                <article key={step.step} className="rounded-[1.6rem] border border-white/10 bg-slate-950/40 p-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand">{step.step}</p>
                  <h2 className="mt-4 text-xl font-semibold text-white">{step.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <ContactPanel
        title="Si querés trabajar una solución seria, empecemos por una charla"
        description="STARNET queda presentado como una marca profesional, cercana y con foco técnico. El siguiente paso es convertir ese interés en una conversación real."
        origin="about-page"
      />
    </>
  );
}

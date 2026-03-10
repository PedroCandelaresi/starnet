import Image from "next/image";
import { Sparkles } from "lucide-react";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { reasons } from "@/lib/site-config";

export function WhyUsSection() {
  return (
    <section className="section-spacing">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Por que elegirnos"
              title="Una propuesta que transmite confianza sin perder agilidad"
              description="La idea no es sumar tecnología por moda. El objetivo es que cada solución tenga sentido operativo y comercial para tu negocio."
            />

            <div className="glass-panel mt-8 overflow-hidden rounded-[2rem] p-4">
              <div className="relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#03120d] p-3">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(30,255,136,0.18),transparent_35%)]" />
                <Image
                  src="/brand/logo-primary.jpeg"
                  alt="Identidad visual STARNET"
                  width={500}
                  height={500}
                  className="relative h-auto w-full rounded-[1.2rem] object-cover"
                />
              </div>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {reasons.map((reason) => (
              <article key={reason.title} className="glass-panel rounded-[1.8rem] p-6">
                <div className="inline-flex size-12 items-center justify-center rounded-2xl bg-brand/14 text-brand">
                  <Sparkles className="size-5" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-white">{reason.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{reason.description}</p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

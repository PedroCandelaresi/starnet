import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { processSteps } from "@/lib/site-config";

export function ProcessSection() {
  return (
    <section className="section-spacing">
      <Container>
        <SectionHeading
          eyebrow="Proceso"
          title="Un flujo de trabajo simple, ordenado y escalable"
          description="Sea para reparar un equipo o lanzar una solución digital, el proceso prioriza claridad, tiempos realistas y una entrega prolija."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-4">
          {processSteps.map((step) => (
            <article key={step.step} className="glass-panel rounded-[1.8rem] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand">{step.step}</p>
              <h3 className="mt-5 text-2xl font-semibold text-white">{step.title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-300">{step.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

import { Star } from "lucide-react";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { testimonials } from "@/lib/site-config";

export function TestimonialsSection() {
  return (
    <section className="section-spacing">
      <Container>
        <SectionHeading
          eyebrow="Testimonios editables"
          title="Prueba social lista para ajustar con casos reales"
          description="Dejamos testimonios de ejemplo con tono profesional para que el sitio pueda salir a producción y luego reemplazarlos fácilmente por clientes reales."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article key={testimonial.name} className="glass-panel rounded-[1.8rem] p-6">
              <div className="flex gap-1 text-brand">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={`${testimonial.name}-${index}`} className="size-4 fill-current" aria-hidden="true" />
                ))}
              </div>
              <p className="mt-5 text-base leading-8 text-slate-200">“{testimonial.quote}”</p>
              <div className="mt-6 border-t border-white/8 pt-4">
                <p className="font-semibold text-white">{testimonial.name}</p>
                <p className="text-sm text-slate-400">{testimonial.role}</p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

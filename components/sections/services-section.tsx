import { ServiceCard } from "@/components/common/service-card";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { services } from "@/lib/site-config";

export function ServicesSection() {
  return (
    <section className="section-spacing">
      <Container>
        <SectionHeading
          eyebrow="Servicios"
          title="Tecnología aplicada a resolver problemas concretos y generar oportunidades"
          description="STARNET combina soporte técnico y desarrollo digital para ayudarte a trabajar mejor, mostrarte mejor y vender con más claridad."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-sm leading-7 text-slate-300">
            La estructura de rutas ya queda preparada para escalar con landings especificas por servicio, casos de uso y futuras estrategias SEO.
          </p>
          <ButtonLink href="/servicios" variant="secondary">
            Ver todos los servicios
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}

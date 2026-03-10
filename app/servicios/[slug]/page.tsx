import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, CheckCircle2, CircleDashed, Target } from "lucide-react";
import { notFound } from "next/navigation";

import { ContactPanel } from "@/components/contact/contact-panel";
import { ServiceIcon } from "@/components/common/service-icon";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { createMetadata } from "@/lib/metadata";
import { serviceSlugMap, services } from "@/lib/site-config";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

type ServiceDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceSlugMap.get(slug);

  if (!service) {
    return createMetadata({
      title: "Servicio no encontrado | STARNET",
      description: "La página solicitada no existe dentro del catálogo de STARNET.",
      path: `/servicios/${slug}`,
    });
  }

  return createMetadata({
    title: `${service.title} | STARNET`,
    description: `${service.summary} Servicio disponible con referencia local en Neuquén Capital.`,
    path: `/servicios/${service.slug}`,
  });
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = serviceSlugMap.get(slug);

  if (!service) {
    notFound();
  }

  const relatedServices = services.filter((item) => item.slug !== service.slug).slice(0, 3);

  return (
    <>
      <section className="section-spacing">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-center">
            <div>
              <span className="eyebrow">Servicio específico</span>
              <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm text-slate-200">
                <ServiceIcon className="size-4 text-brand" icon={service.icon} />
                {service.shortTitle}
              </div>
              <h1 className="mt-6 text-balance text-4xl font-semibold text-white sm:text-5xl">
                {service.title}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">{service.description}</p>
              <p className="mt-4 text-sm leading-7 text-slate-400">{service.timeline}</p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink
                  href={buildWhatsAppUrl({ service: service.service })}
                  target="_blank"
                >
                  Consultar por WhatsApp
                </ButtonLink>
                <ButtonLink href="/contacto" variant="secondary">
                  Quiero una propuesta
                </ButtonLink>
              </div>
            </div>

            <div className="glass-panel overflow-hidden rounded-[2rem] p-4">
              <div className="relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-slate-950/50">
                {service.image ? (
                  <div className="relative aspect-[16/11]">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 45vw, 100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                  </div>
                ) : (
                  <div className="flex aspect-[16/11] items-center justify-center bg-[radial-gradient(circle_at_top,rgba(34,216,111,0.18),transparent_50%),linear-gradient(180deg,#04170f,#0a130f)]">
                    <ServiceIcon className="size-16 text-brand" icon={service.icon} />
                  </div>
                )}
                <div className="absolute bottom-4 left-4 right-4 rounded-[1.4rem] border border-white/10 bg-slate-950/70 p-4 backdrop-blur">
                  <p className="text-sm font-semibold text-white">Qué resuelve este servicio</p>
                  <p className="mt-2 text-sm leading-7 text-slate-300">{service.summary}</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-spacing pt-0">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            <article className="glass-panel rounded-[1.8rem] p-6">
              <div className="inline-flex size-12 items-center justify-center rounded-2xl bg-brand/16 text-brand">
                <Target className="size-5" aria-hidden="true" />
              </div>
              <h2 className="mt-5 text-2xl font-semibold text-white">Resultados esperados</h2>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-200">
                {service.outcomes.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-1 size-4 shrink-0 text-brand" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="glass-panel rounded-[1.8rem] p-6">
              <div className="inline-flex size-12 items-center justify-center rounded-2xl bg-brand/16 text-brand">
                <CircleDashed className="size-5" aria-hidden="true" />
              </div>
              <h2 className="mt-5 text-2xl font-semibold text-white">Entregables base</h2>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-200">
                {service.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-1 size-4 shrink-0 text-brand" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="glass-panel rounded-[1.8rem] p-6">
              <div className="inline-flex size-12 items-center justify-center rounded-2xl bg-brand/16 text-brand">
                <ArrowRight className="size-5" aria-hidden="true" />
              </div>
              <h2 className="mt-5 text-2xl font-semibold text-white">Ideal para</h2>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-200">
                {service.idealFor.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-1 size-4 shrink-0 text-brand" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </Container>
      </section>

      <section className="section-spacing pt-0">
        <Container>
          <div className="glass-panel rounded-[2rem] p-6 lg:p-8">
            <div className="max-w-3xl">
              <span className="eyebrow">Servicios relacionados</span>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                Si necesitás una solución más amplia, STARNET también puede ayudarte con esto
              </h2>
            </div>

            <div className="mt-8 grid gap-5 lg:grid-cols-3">
              {relatedServices.map((item) => (
                <article key={item.slug} className="rounded-[1.6rem] border border-white/10 bg-slate-950/45 p-5">
                  <div className="inline-flex size-11 items-center justify-center rounded-2xl bg-brand/16 text-brand">
                    <ServiceIcon className="size-5" icon={item.icon} />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{item.summary}</p>
                  <ButtonLink href={`/servicios/${item.slug}`} variant="ghost" className="mt-5 px-0">
                    Ver servicio
                  </ButtonLink>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <ContactPanel
        title={`Consultar por ${service.shortTitle}`}
        description="El formulario queda listo para guardar leads en base de datos y ofrecer continuidad inmediata por WhatsApp."
        origin={`service-${service.slug}`}
        initialService={service.service}
      />
    </>
  );
}

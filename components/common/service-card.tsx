import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

import { ServiceIcon } from "@/components/common/service-icon";
import { ButtonLink } from "@/components/ui/button-link";
import type { ServiceItem } from "@/lib/site-config";

type ServiceCardProps = {
  service: ServiceItem;
};

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="glass-panel group relative overflow-hidden rounded-[1.75rem] p-5 transition duration-300 hover:-translate-y-1 hover:border-brand/30 hover:bg-white/8">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/60 to-transparent" />
      <div className="relative mb-5 overflow-hidden rounded-[1.4rem] border border-white/10 bg-slate-950/60">
        {service.image ? (
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
              sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
          </div>
        ) : (
          <div className="flex aspect-[16/10] items-center justify-center bg-[radial-gradient(circle_at_top,#17c96433,transparent_55%),linear-gradient(180deg,#04150f,#08110d)]">
            <ServiceIcon className="size-14 text-brand" icon={service.icon} />
          </div>
        )}
        <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-brand/25 bg-slate-950/70 px-3 py-1 text-xs font-semibold text-brand backdrop-blur">
          <ServiceIcon className="size-3.5" icon={service.icon} />
          {service.shortTitle}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-2xl font-semibold text-white">{service.title}</h3>
          <p className="mt-3 text-sm leading-7 text-slate-300">{service.summary}</p>
        </div>

        <ul className="space-y-2 text-sm leading-6 text-slate-200">
          {service.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>

        <div className="pt-2">
          <ButtonLink href={`/servicios/${service.slug}`} variant="secondary">
            Ver detalle
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}

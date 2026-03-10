import type { Metadata } from "next";
import { LeadStatus, Prisma } from "@prisma/client";
import { Clock3, Filter, Inbox, LockKeyhole, Mail, MapPinned, MessageSquareText, PhoneCall } from "lucide-react";

import { AdminSubmitButton } from "@/components/admin/admin-submit-button";
import { LeadStatusBadge } from "@/components/admin/lead-status-badge";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { createMetadata } from "@/lib/metadata";
import { prisma } from "@/lib/prisma";
import {
  type LeadService,
  leadServiceLabels,
  leadServiceOptions,
  leadServiceValues,
  leadStatusOptions,
  leadStatusValues,
  type LeadStatusValue,
} from "@/lib/lead-form";
import { isAdminAuthenticated, isAdminConfigured } from "@/lib/admin-auth";

import { loginAdmin, logoutAdmin } from "./actions";

export const metadata: Metadata = {
  ...createMetadata({
    title: "Panel de leads | STARNET",
    description: "Panel privado para visualizar las consultas recibidas desde el sitio web de STARNET.",
    path: "/admin/leads",
  }),
  robots: {
    index: false,
    follow: false,
  },
};

type LeadsPageProps = {
  searchParams: Promise<{
    service?: string;
    status?: string;
    error?: string;
    page?: string;
    statusMessage?: string;
  }>;
};

const dateFormatter = new Intl.DateTimeFormat("es-AR", {
  dateStyle: "medium",
  timeStyle: "short",
});

function isLeadServiceFilter(value?: string): value is LeadService {
  return value ? leadServiceValues.includes(value as LeadService) : false;
}

function isLeadStatusFilter(value?: string) {
  return value ? leadStatusValues.includes(value as LeadStatusValue) : false;
}

export default async function AdminLeadsPage({ searchParams }: LeadsPageProps) {
  const params = await searchParams;
  const configured = isAdminConfigured();
  const authenticated = await isAdminAuthenticated();

  if (!configured) {
    return (
      <section className="section-spacing">
        <Container>
          <div className="glass-panel mx-auto max-w-3xl rounded-[2rem] p-8 text-center sm:p-10">
            <span className="eyebrow">Panel privado</span>
            <h1 className="mt-6 text-3xl font-semibold text-white sm:text-4xl">
              Configurá `ADMIN_SECRET` para habilitar el panel de leads.
            </h1>
            <p className="mt-4 text-base leading-8 text-slate-300">
              El proyecto ya está preparado para proteger `/admin/leads` con una clave simple por entorno.
              Definí la variable y reiniciá el servidor para activarlo.
            </p>
            <div className="mt-8 flex justify-center">
              <ButtonLink href="/contacto" variant="secondary">
                Volver al sitio
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  if (!authenticated) {
    const errorMessage =
      params.error === "invalid"
        ? "La clave de administrador no es correcta."
        : params.error === "config"
          ? "Falta configurar la protección del panel."
          : params.status === "logged_out"
            ? "Sesión cerrada correctamente."
            : null;

    return (
      <section className="section-spacing">
        <Container>
          <div className="glass-panel mx-auto grid max-w-5xl gap-8 overflow-hidden rounded-[2rem] p-6 lg:grid-cols-[0.95fr_1.05fr] lg:p-8">
            <div>
              <span className="eyebrow">Acceso restringido</span>
              <h1 className="mt-5 text-3xl font-semibold text-white sm:text-4xl">
                Panel de leads de STARNET
              </h1>
              <p className="mt-4 max-w-xl text-base leading-8 text-slate-300">
                Ingresá la clave de administración para visualizar las consultas guardadas, filtrarlas y revisar el detalle completo.
              </p>
              <div className="mt-8 space-y-4 text-sm leading-7 text-slate-200">
                <div className="rounded-[1.4rem] border border-white/10 bg-white/5 p-4">
                  <p className="font-semibold text-white">Qué vas a ver</p>
                  <p className="mt-2 text-slate-300">Fecha, contacto, servicio, estado y mensaje completo de cada lead.</p>
                </div>
                <div className="rounded-[1.4rem] border border-white/10 bg-white/5 p-4">
                  <p className="font-semibold text-white">Protección simple y razonable</p>
                  <p className="mt-2 text-slate-300">La ruta usa una clave por entorno y una cookie httpOnly para mantener la sesión.</p>
                </div>
              </div>
            </div>

            <div className="rounded-[1.8rem] border border-white/10 bg-slate-950/45 p-6 sm:p-8">
              <div className="inline-flex size-12 items-center justify-center rounded-2xl bg-brand/16 text-brand">
                <LockKeyhole className="size-5" aria-hidden="true" />
              </div>
              <h2 className="mt-5 text-2xl font-semibold text-white">Ingresar</h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                Usá la clave definida en `ADMIN_SECRET`.
              </p>
              {errorMessage ? (
                <div
                  aria-live="polite"
                  className="mt-5 rounded-2xl border border-amber-400/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-50"
                >
                  {errorMessage}
                </div>
              ) : null}
              <form action={loginAdmin} className="mt-6 space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-200" htmlFor="secret">
                    Clave de administración
                  </label>
                  <input
                    id="secret"
                    name="secret"
                    type="password"
                    autoComplete="current-password"
                    className="w-full rounded-2xl border border-white/12 bg-slate-950/55 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-brand/55 focus:bg-slate-950"
                    placeholder="Ingresá la clave"
                  />
                </div>
                <AdminSubmitButton className="w-full" pendingLabel="Validando...">
                  Acceder al panel
                </AdminSubmitButton>
              </form>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  const serviceFilter = isLeadServiceFilter(params.service) ? params.service : undefined;
  const statusFilter = isLeadStatusFilter(params.status) ? params.status : undefined;

  const where: Prisma.LeadWhereInput = {
    ...(serviceFilter ? { service: serviceFilter } : {}),
    ...(statusFilter ? { status: statusFilter as LeadStatus } : {}),
  };

  const [leads, totalCount, newCount, activeCount, closedCount] = await prisma.$transaction([
    prisma.lead.findMany({
      where,
      orderBy: [{ createdAt: "desc" }],
      take: 100,
    }),
    prisma.lead.count(),
    prisma.lead.count({ where: { status: LeadStatus.NEW } }),
    prisma.lead.count({ where: { status: { in: [LeadStatus.CONTACTED, LeadStatus.QUALIFIED, LeadStatus.QUOTED] } } }),
    prisma.lead.count({ where: { status: { in: [LeadStatus.WON, LeadStatus.LOST] } } }),
  ]);

  const summaryCards = [
    { label: "Total histórico", value: totalCount, tone: "border-white/10 bg-white/5" },
    { label: "Nuevos", value: newCount, tone: "border-cyan-400/20 bg-cyan-500/10" },
    { label: "En seguimiento", value: activeCount, tone: "border-blue-400/20 bg-blue-500/10" },
    { label: "Cerrados", value: closedCount, tone: "border-brand/20 bg-brand/10" },
  ] as const;

  return (
    <section className="section-spacing">
      <Container>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="eyebrow">Panel privado</span>
            <h1 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Leads recibidos</h1>
            <p className="mt-3 max-w-3xl text-base leading-8 text-slate-300">
              Consultas almacenadas desde el formulario del sitio, ordenadas de forma descendente y listas para seguimiento comercial.
            </p>
          </div>
          <form action={logoutAdmin}>
            <AdminSubmitButton pendingLabel="Cerrando...">Cerrar sesión</AdminSubmitButton>
          </form>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {summaryCards.map((card) => (
            <article key={card.label} className={`rounded-[1.6rem] border p-5 ${card.tone}`}>
              <p className="text-sm uppercase tracking-[0.22em] text-slate-400">{card.label}</p>
              <p className="mt-3 text-3xl font-semibold text-white">{card.value}</p>
            </article>
          ))}
        </div>

        <div className="glass-panel mt-8 rounded-[2rem] p-5 sm:p-6">
          <form className="grid gap-4 lg:grid-cols-[1fr_1fr_auto_auto] lg:items-end" aria-label="Filtros de leads">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-200" htmlFor="service-filter">
                Filtrar por servicio
              </label>
              <select
                id="service-filter"
                name="service"
                defaultValue={serviceFilter ?? ""}
                className="w-full rounded-2xl border border-white/12 bg-slate-950/55 px-4 py-3 text-sm text-white outline-none transition focus:border-brand/55 focus:bg-slate-950"
              >
                <option value="">Todos los servicios</option>
                {leadServiceOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-200" htmlFor="status-filter">
                Filtrar por estado
              </label>
              <select
                id="status-filter"
                name="status"
                defaultValue={statusFilter ?? ""}
                className="w-full rounded-2xl border border-white/12 bg-slate-950/55 px-4 py-3 text-sm text-white outline-none transition focus:border-brand/55 focus:bg-slate-950"
              >
                <option value="">Todos los estados</option>
                {leadStatusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <AdminSubmitButton pendingLabel="Filtrando...">
              <Filter className="size-4" aria-hidden="true" />
              Aplicar filtros
            </AdminSubmitButton>
            <ButtonLink href="/admin/leads" variant="secondary">
              Limpiar
            </ButtonLink>
          </form>
        </div>

        {leads.length === 0 ? (
          <div className="glass-panel mt-8 rounded-[2rem] p-8 text-center sm:p-10">
            <div className="mx-auto inline-flex size-14 items-center justify-center rounded-2xl bg-white/6 text-slate-200">
              <Inbox className="size-6" aria-hidden="true" />
            </div>
            <h2 className="mt-5 text-2xl font-semibold text-white">No hay leads para mostrar</h2>
            <p className="mt-3 text-base leading-8 text-slate-300">
              Ajustá los filtros o esperá nuevas consultas desde el formulario del sitio.
            </p>
          </div>
        ) : (
          <>
            <div className="mt-8 grid gap-4 lg:hidden">
              {leads.map((lead) => (
                <article key={lead.id} className="glass-panel rounded-[1.6rem] p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-white">{lead.name}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">
                        {dateFormatter.format(lead.createdAt)}
                      </p>
                    </div>
                    <LeadStatusBadge status={lead.status as LeadStatusValue} />
                  </div>
                  <div className="mt-4 space-y-2 text-sm text-slate-300">
                    <p className="inline-flex items-center gap-2"><PhoneCall className="size-4 text-brand" aria-hidden="true" />{lead.phone}</p>
                    <p className="inline-flex items-center gap-2 break-all"><Mail className="size-4 text-brand" aria-hidden="true" />{lead.email}</p>
                    <p className="inline-flex items-center gap-2"><MapPinned className="size-4 text-brand" aria-hidden="true" />{leadServiceLabels[lead.service]}</p>
                  </div>
                  <details className="mt-4 rounded-[1.2rem] border border-white/10 bg-white/5 px-4 py-3">
                    <summary className="cursor-pointer list-none text-sm font-medium text-white">
                      Ver mensaje completo
                    </summary>
                    <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-300">{lead.message}</p>
                  </details>
                </article>
              ))}
            </div>

            <div className="glass-panel mt-8 hidden overflow-hidden rounded-[2rem] lg:block">
              <div className="overflow-x-auto">
                <table className="min-w-full border-separate border-spacing-0">
                  <caption className="sr-only">
                    Listado de leads con fecha, contacto, servicio, estado y detalle del mensaje.
                  </caption>
                  <thead>
                    <tr className="bg-white/5 text-left text-xs uppercase tracking-[0.2em] text-slate-400">
                      <th scope="col" className="px-5 py-4">Fecha</th>
                      <th scope="col" className="px-5 py-4">Nombre</th>
                      <th scope="col" className="px-5 py-4">Teléfono</th>
                      <th scope="col" className="px-5 py-4">Email</th>
                      <th scope="col" className="px-5 py-4">Servicio</th>
                      <th scope="col" className="px-5 py-4">Estado</th>
                      <th scope="col" className="px-5 py-4">Detalle</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map((lead) => (
                      <tr key={lead.id} className="border-t border-white/8 text-sm text-slate-200">
                        <td className="px-5 py-4 align-top text-slate-400">{dateFormatter.format(lead.createdAt)}</td>
                        <td className="px-5 py-4 align-top font-medium text-white">{lead.name}</td>
                        <td className="px-5 py-4 align-top">
                          <a className="transition hover:text-brand" href={`tel:${lead.phone.replace(/\s+/g, "")}`}>
                            {lead.phone}
                          </a>
                        </td>
                        <td className="px-5 py-4 align-top">
                          <a className="transition hover:text-brand" href={`mailto:${lead.email}`}>
                            {lead.email}
                          </a>
                        </td>
                        <td className="px-5 py-4 align-top">{leadServiceLabels[lead.service]}</td>
                        <td className="px-5 py-4 align-top">
                          <LeadStatusBadge status={lead.status as LeadStatusValue} />
                        </td>
                        <td className="px-5 py-4 align-top">
                          <details className="max-w-md rounded-[1.2rem] border border-white/10 bg-white/5 px-4 py-3">
                            <summary className="inline-flex cursor-pointer list-none items-center gap-2 text-sm font-medium text-white">
                              <MessageSquareText className="size-4 text-brand" aria-hidden="true" />
                              Expandir mensaje
                            </summary>
                            <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-300">{lead.message}</p>
                          </details>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        <div className="mt-8 flex items-center gap-3 text-sm text-slate-400">
          <Clock3 className="size-4 text-brand" aria-hidden="true" />
          Se muestran hasta 100 leads ordenados por fecha descendente.
        </div>
      </Container>
    </section>
  );
}

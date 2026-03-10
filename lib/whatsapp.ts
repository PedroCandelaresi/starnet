import { leadServiceLabels, type LeadFormValues, type LeadService } from "@/lib/lead-form";
import { siteConfig } from "@/lib/site-config";

const normalizeWhatsappNumber = (value: string) => value.replace(/\D/g, "") || "5492994668764";

export function buildWhatsAppUrl(data?: Partial<LeadFormValues> & { service?: LeadService }) {
  const service = data?.service ?? "GENERAL";
  const lines = [
    `Hola STARNET, quiero consultar por ${leadServiceLabels[service]}.`,
    data?.name ? `Nombre: ${data.name}` : null,
    data?.phone ? `Telefono: ${data.phone}` : null,
    data?.email ? `Email: ${data.email}` : null,
    data?.message ? `Mensaje: ${data.message}` : null,
    `Ubicacion de referencia: ${siteConfig.location}`,
  ].filter(Boolean);

  return `https://wa.me/${normalizeWhatsappNumber(siteConfig.whatsappNumber)}?text=${encodeURIComponent(
    lines.join("\n"),
  )}`;
}

import { z } from "zod";

export const leadServiceValues = [
  "GENERAL",
  "TECH_SUPPORT",
  "MAINTENANCE",
  "WEB_DESIGN",
  "QR_MENU",
  "CUSTOM_SYSTEMS",
] as const;

export type LeadService = (typeof leadServiceValues)[number];

export const leadStatusValues = [
  "NEW",
  "CONTACTED",
  "QUALIFIED",
  "QUOTED",
  "WON",
  "LOST",
] as const;

export type LeadStatusValue = (typeof leadStatusValues)[number];

export const leadServiceLabels: Record<LeadService, string> = {
  GENERAL: "Quiero asesoramiento general",
  TECH_SUPPORT: "Servicio técnico en computadoras y notebooks",
  MAINTENANCE: "Mantenimiento y optimización de equipos",
  WEB_DESIGN: "Diseño de páginas web",
  QR_MENU: "Menú QR para negocios",
  CUSTOM_SYSTEMS: "Sistemas web a medida",
};

export const leadServiceOptions = leadServiceValues.map((value) => ({
  value,
  label: leadServiceLabels[value],
}));

export const leadStatusLabels: Record<LeadStatusValue, string> = {
  NEW: "Nuevo",
  CONTACTED: "Contactado",
  QUALIFIED: "Calificado",
  QUOTED: "Presupuestado",
  WON: "Cerrado ganado",
  LOST: "Cerrado perdido",
};

export const leadStatusOptions = leadStatusValues.map((value) => ({
  value,
  label: leadStatusLabels[value],
}));

const normalizeSpaces = (value: string) => value.replace(/\s+/g, " ").trim();

const sanitizeInline = (value: string) =>
  normalizeSpaces(value.replace(/[<>]/g, ""));

const sanitizeMultiline = (value: string) =>
  value
    .replace(/[<>]/g, "")
    .split(/\r?\n/)
    .map((line) => normalizeSpaces(line))
    .filter(Boolean)
    .join("\n");

export const leadFormSchema = z.object({
  name: z
    .string()
    .transform(sanitizeInline)
    .pipe(z.string().min(2, "Indicá tu nombre").max(80, "Máximo 80 caracteres")),
  phone: z
    .string()
    .transform(sanitizeInline)
    .pipe(
      z
        .string()
        .min(8, "Indicá un teléfono válido")
        .max(24, "Máximo 24 caracteres")
        .regex(/^[0-9+()\-\s]+$/, "Usá solo números y símbolos telefónicos"),
    ),
  email: z
    .string()
    .transform(sanitizeInline)
    .pipe(z.string().email("Ingresá un email válido").max(120, "Máximo 120 caracteres")),
  service: z.enum(leadServiceValues),
  message: z
    .string()
    .transform(sanitizeMultiline)
    .pipe(
      z
        .string()
        .min(10, "Contanos al menos un poco más del proyecto")
        .max(1200, "Máximo 1200 caracteres"),
    ),
  origin: z
    .string()
    .optional()
    .transform((value) => sanitizeInline(value ?? "website"))
    .pipe(z.string().min(2).max(60)),
  company: z
    .string()
    .optional()
    .transform((value) => sanitizeInline(value ?? ""))
    .pipe(z.string().max(200)),
  turnstileToken: z
    .string()
    .optional()
    .transform((value) => sanitizeInline(value ?? ""))
    .pipe(z.string().max(2048)),
});

export type LeadFormInput = z.input<typeof leadFormSchema>;
export type LeadFormValues = z.output<typeof leadFormSchema>;

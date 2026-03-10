import type { Lead } from "@prisma/client";
import nodemailer from "nodemailer";

import { leadServiceLabels } from "@/lib/lead-form";
import { siteConfig } from "@/lib/site-config";

type LeadEmailPayload = Pick<Lead, "name" | "phone" | "email" | "service" | "message" | "origin" | "createdAt">;

type SmtpConfig = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  from: string;
  to: string[];
};

function getSmtpConfig(): SmtpConfig | null {
  const host = process.env.SMTP_HOST?.trim();
  const port = Number(process.env.SMTP_PORT ?? "0");
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  const from = process.env.EMAIL_FROM?.trim();
  const to = process.env.EMAIL_TO?.split(",").map((value) => value.trim()).filter(Boolean);
  const secure = process.env.SMTP_SECURE === "true" || port === 465;

  if (!host || !port || !user || !pass || !from || !to?.length) {
    return null;
  }

  return {
    host,
    port,
    secure,
    user,
    pass,
    from,
    to,
  };
}

export function isLeadEmailEnabled() {
  return Boolean(getSmtpConfig());
}

export async function sendLeadNotificationEmail(lead: LeadEmailPayload) {
  const config = getSmtpConfig();

  if (!config) {
    return {
      enabled: false,
      sent: false,
    };
  }

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });

  const serviceLabel = leadServiceLabels[lead.service];
  const subject = `[STARNET] Nuevo lead: ${serviceLabel}`;
  const createdAt = new Intl.DateTimeFormat("es-AR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(lead.createdAt);

  await transporter.sendMail({
    from: config.from,
    to: config.to,
    replyTo: lead.email,
    subject,
    text: [
      `Nuevo lead recibido en ${siteConfig.name}.`,
      `Fecha: ${createdAt}`,
      `Nombre: ${lead.name}`,
      `Teléfono: ${lead.phone}`,
      `Email: ${lead.email}`,
      `Servicio: ${serviceLabel}`,
      `Origen: ${lead.origin}`,
      "",
      lead.message,
    ].join("\n"),
    html: `
      <div style="font-family: Arial, sans-serif; color: #0f172a; line-height: 1.6;">
        <h2 style="margin-bottom: 12px;">Nuevo lead recibido en ${siteConfig.name}</h2>
        <p style="margin: 0 0 12px;"><strong>Fecha:</strong> ${createdAt}</p>
        <p style="margin: 0 0 8px;"><strong>Nombre:</strong> ${lead.name}</p>
        <p style="margin: 0 0 8px;"><strong>Teléfono:</strong> ${lead.phone}</p>
        <p style="margin: 0 0 8px;"><strong>Email:</strong> ${lead.email}</p>
        <p style="margin: 0 0 8px;"><strong>Servicio:</strong> ${serviceLabel}</p>
        <p style="margin: 0 0 16px;"><strong>Origen:</strong> ${lead.origin}</p>
        <div style="padding: 16px; border-radius: 12px; background: #f8fafc; border: 1px solid #cbd5e1; white-space: pre-wrap;">${lead.message}</div>
      </div>
    `,
  });

  return {
    enabled: true,
    sent: true,
  };
}

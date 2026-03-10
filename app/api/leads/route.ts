import { ZodError } from "zod";
import { NextResponse } from "next/server";

import { getClientIp, rateLimitLeadSubmission } from "@/lib/bot-protection";
import { sendLeadNotificationEmail } from "@/lib/email";
import { leadFormSchema } from "@/lib/lead-form";
import { prisma } from "@/lib/prisma";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const clientIp = getClientIp(request);
    const rateLimit = rateLimitLeadSubmission(clientIp);

    if (!rateLimit.allowed) {
      const retryAfterSeconds = Math.max(
        Math.ceil((rateLimit.resetAt - Date.now()) / 1000),
        1,
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Recibimos varias consultas seguidas desde esta conexión. Esperá un momento o escribinos por WhatsApp.",
          whatsappUrl: buildWhatsAppUrl(),
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(retryAfterSeconds),
          },
        },
      );
    }

    const body = await request.json();
    const payload = leadFormSchema.parse(body);
    const whatsappUrl = buildWhatsAppUrl(payload);

    if (payload.company) {
      return NextResponse.json({
        success: true,
        message: "Recibimos tu consulta. Si querés, podés continuar por WhatsApp.",
        whatsappUrl,
      });
    }

    const lead = await prisma.lead.create({
      data: {
        name: payload.name,
        phone: payload.phone,
        email: payload.email,
        service: payload.service,
        message: payload.message,
        origin: payload.origin,
      },
    });

    try {
      await sendLeadNotificationEmail({
        name: lead.name,
        phone: lead.phone,
        email: lead.email,
        service: lead.service,
        message: lead.message,
        origin: lead.origin,
        createdAt: lead.createdAt,
      });
    } catch (emailError) {
      console.error("Lead notification email error", emailError);
    }

    return NextResponse.json({
      success: true,
      message: "Consulta enviada correctamente. También podés seguir la conversación por WhatsApp.",
      whatsappUrl,
    }, {
      headers: {
        "X-RateLimit-Remaining": String(rateLimit.remaining),
      },
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: error.issues[0]?.message ?? "Revisá los datos ingresados y volvé a intentar.",
          whatsappUrl: buildWhatsAppUrl(),
        },
        { status: 422 },
      );
    }

    console.error("Lead submission error", error);

    return NextResponse.json(
      {
        success: false,
        message:
          "No pudimos guardar la consulta en este momento. Probá por WhatsApp y retomamos desde ahí.",
        whatsappUrl: buildWhatsAppUrl(),
      },
      { status: 500 },
    );
  }
}

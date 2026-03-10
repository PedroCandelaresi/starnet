import { ZodError } from "zod";
import { NextResponse } from "next/server";

import { leadFormSchema } from "@/lib/lead-form";
import { prisma } from "@/lib/prisma";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
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

    await prisma.lead.create({
      data: {
        name: payload.name,
        phone: payload.phone,
        email: payload.email,
        service: payload.service,
        message: payload.message,
        origin: payload.origin,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Consulta enviada correctamente. También podés seguir la conversación por WhatsApp.",
      whatsappUrl,
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

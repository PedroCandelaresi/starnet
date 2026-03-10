"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, MessageCircleMore, SendHorizonal } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import {
  leadFormSchema,
  leadServiceOptions,
  type LeadFormInput,
  type LeadFormValues,
  type LeadService,
} from "@/lib/lead-form";
import { cn } from "@/lib/utils";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

type SubmitState =
  | {
      type: "success";
      message: string;
      whatsappUrl: string;
    }
  | {
      type: "error";
      message: string;
      whatsappUrl: string;
    }
  | null;

type ContactFormProps = {
  origin: string;
  initialService?: LeadService;
};

const fieldClassName =
  "w-full rounded-2xl border border-white/12 bg-slate-950/55 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-brand/55 focus:bg-slate-950";

export function ContactForm({ origin, initialService = "GENERAL" }: ContactFormProps) {
  const [submitState, setSubmitState] = useState<SubmitState>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormInput, unknown, LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      service: initialService,
      message: "",
      origin,
      company: "",
      turnstileToken: "",
    },
  });

  const watchedValues = watch();

  const whatsappUrl = useMemo(
    () =>
      buildWhatsAppUrl({
        ...watchedValues,
        origin,
        service: watchedValues.service ?? initialService,
      }),
    [initialService, origin, watchedValues],
  );

  const onSubmit = handleSubmit(async (values) => {
    setSubmitState(null);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...values, origin }),
      });

      const data = (await response.json()) as {
        success: boolean;
        message: string;
        whatsappUrl: string;
      };

      if (!response.ok || !data.success) {
        throw new Error(data.message || "No se pudo enviar la consulta.");
      }

      setSubmitState({ type: "success", message: data.message, whatsappUrl: data.whatsappUrl });
      reset({
        name: "",
        phone: "",
        email: "",
        service: initialService,
        message: "",
        origin,
        company: "",
        turnstileToken: "",
      });
    } catch (error) {
      setSubmitState({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "No pudimos guardar la consulta en este momento. Probá por WhatsApp.",
        whatsappUrl,
      });
    }
  });

  return (
    <form className="space-y-5" onSubmit={onSubmit} noValidate aria-busy={isSubmitting}>
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-200" htmlFor="name">
            Nombre
          </label>
          <input
            id="name"
            className={fieldClassName}
            placeholder="Tu nombre"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            {...register("name")}
          />
          {errors.name ? (
            <p id="name-error" className="mt-2 text-sm text-rose-300">
              {errors.name.message}
            </p>
          ) : null}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-200" htmlFor="phone">
            Teléfono
          </label>
          <input
            id="phone"
            className={fieldClassName}
            placeholder="+54 9 ..."
            inputMode="tel"
            autoComplete="tel"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            {...register("phone")}
          />
          {errors.phone ? (
            <p id="phone-error" className="mt-2 text-sm text-rose-300">
              {errors.phone.message}
            </p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-200" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            className={fieldClassName}
            placeholder="tuemail@dominio.com"
            inputMode="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            {...register("email")}
          />
          {errors.email ? (
            <p id="email-error" className="mt-2 text-sm text-rose-300">
              {errors.email.message}
            </p>
          ) : null}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-200" htmlFor="service">
            Servicio de interés
          </label>
          <select
            id="service"
            className={fieldClassName}
            aria-invalid={Boolean(errors.service)}
            aria-describedby={errors.service ? "service-error" : undefined}
            {...register("service")}
          >
            {leadServiceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.service ? (
            <p id="service-error" className="mt-2 text-sm text-rose-300">
              {errors.service.message}
            </p>
          ) : null}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-200" htmlFor="message">
          Mensaje
        </label>
        <textarea
          id="message"
          className={cn(fieldClassName, "min-h-36 resize-y")}
          placeholder="Contanos qué necesitás, el estado del equipo o el objetivo del proyecto."
          autoComplete="off"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          {...register("message")}
        />
        {errors.message ? (
          <p id="message-error" className="mt-2 text-sm text-rose-300">
            {errors.message.message}
          </p>
        ) : null}
      </div>

      <input type="hidden" {...register("origin")} defaultValue={origin} />
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Empresa</label>
        <input id="company" tabIndex={-1} autoComplete="off" {...register("company")} />
      </div>
      <input type="hidden" {...register("turnstileToken")} defaultValue="" />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-brand/60 bg-brand px-6 text-sm font-semibold text-slate-950 shadow-[0_18px_40px_rgba(28,233,122,0.22)] transition hover:bg-brand-strong disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? <LoaderCircle className="size-4 animate-spin" aria-hidden="true" /> : <SendHorizonal className="size-4" aria-hidden="true" />}
          {isSubmitting ? "Enviando..." : "Enviar consulta"}
        </button>

        <a
          href={submitState?.whatsappUrl ?? whatsappUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Continuar la consulta por WhatsApp"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/12 bg-white/6 px-6 text-sm font-semibold text-white transition hover:border-brand/40 hover:bg-white/10"
        >
          <MessageCircleMore className="size-4" aria-hidden="true" />
          Continuar por WhatsApp
        </a>
      </div>

      {submitState ? (
        <div
          aria-live="polite"
          role={submitState.type === "success" ? "status" : "alert"}
          className={cn(
            "rounded-3xl border px-5 py-4 text-sm leading-7",
            submitState.type === "success"
              ? "border-brand/25 bg-brand/10 text-slate-100"
              : "border-amber-400/20 bg-amber-500/10 text-amber-50",
          )}
        >
          {submitState.message}
        </div>
      ) : null}

      <p className="text-xs leading-6 text-slate-500">
        Validación cliente y servidor activas. El formulario queda listo para sumar captcha o protección anti-spam adicional cuando haga falta.
      </p>
    </form>
  );
}

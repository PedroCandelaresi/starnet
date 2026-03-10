import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";

export default function NotFoundPage() {
  return (
    <section className="section-spacing min-h-[60vh]">
      <Container>
        <div className="glass-panel mx-auto max-w-3xl rounded-[2rem] p-8 text-center sm:p-12">
          <span className="eyebrow">404</span>
          <h1 className="mt-6 text-4xl font-semibold text-white sm:text-5xl">La página que buscás no existe.</h1>
          <p className="mt-4 text-base leading-8 text-slate-300">
            Volve al inicio o revisa los servicios disponibles para seguir navegando dentro del sitio de STARNET.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/">Ir al inicio</ButtonLink>
            <ButtonLink href="/servicios" variant="secondary">
              Ver servicios
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}

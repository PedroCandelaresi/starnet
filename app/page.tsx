import { ContactPanel } from "@/components/contact/contact-panel";
import { HeroSection } from "@/components/sections/hero-section";
import { ProcessSection } from "@/components/sections/process-section";
import { ServicesSection } from "@/components/sections/services-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { WhyUsSection } from "@/components/sections/why-us-section";
import { LocalBusinessSchema } from "@/components/seo/local-business-schema";

export default function HomePage() {
  return (
    <>
      <LocalBusinessSchema />
      <HeroSection />
      <ServicesSection />
      <WhyUsSection />
      <ProcessSection />
      <TestimonialsSection />
      <ContactPanel
        title="Conversemos sobre tu necesidad técnica o digital"
        description="Si querés reparar un equipo, mejorar tu presencia online o evaluar una solución a medida, STARNET deja un canal simple para empezar rápido."
        origin="home-contact"
      />
    </>
  );
}

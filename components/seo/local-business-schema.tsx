import { services, siteConfig } from "@/lib/site-config";

export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.legalName,
    description: siteConfig.description,
    areaServed: siteConfig.location,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.location,
      addressRegion: siteConfig.province,
      addressCountry: "AR",
    },
    telephone: siteConfig.phoneDisplay,
    url: siteConfig.siteUrl,
    image: `${siteConfig.siteUrl}/brand/og-cover.jpg`,
    sameAs: [],
    serviceType: services.map((service) => service.title),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

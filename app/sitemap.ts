import type { MetadataRoute } from "next";

import { services, siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { route: "", changeFrequency: "weekly" as const, priority: 1 },
    { route: "/servicios", changeFrequency: "monthly" as const, priority: 0.8 },
    { route: "/nosotros", changeFrequency: "monthly" as const, priority: 0.8 },
    { route: "/contacto", changeFrequency: "monthly" as const, priority: 0.8 },
  ];

  return [
    ...staticRoutes.map((item) => ({
      url: `${siteConfig.siteUrl}${item.route}`,
      changeFrequency: item.changeFrequency,
      priority: item.priority,
      lastModified: new Date(),
    })),
    ...services.map((service) => ({
      url: `${siteConfig.siteUrl}/servicios/${service.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      lastModified: new Date(),
    })),
  ];
}

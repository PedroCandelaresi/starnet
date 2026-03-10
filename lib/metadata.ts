import type { Metadata } from "next";

import { siteConfig } from "@/lib/site-config";
import { safeSiteUrl } from "@/lib/utils";

const metadataBase = safeSiteUrl(siteConfig.siteUrl);

export function createMetadata({
  title,
  description,
  path = "/",
}: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const absoluteUrl = new URL(path, metadataBase);

  return {
    metadataBase,
    title,
    description,
    alternates: {
      canonical: absoluteUrl,
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl,
      type: "website",
      locale: "es_AR",
      siteName: siteConfig.name,
      images: [
        {
          url: "/brand/og-cover.jpg",
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} | ${siteConfig.slogan}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/brand/og-cover.jpg"],
    },
  };
}

import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "STARNET",
    short_name: "STARNET",
    description: "Servicios tecnológicos y soluciones digitales",
    start_url: "/",
    display: "standalone",
    background_color: "#04170f",
    theme_color: "#04170f",
    lang: "es-AR",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}

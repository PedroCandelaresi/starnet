# STARNET

Sitio web full-stack para STARNET construido con Next.js App Router, TypeScript, Tailwind CSS, Prisma y PostgreSQL.

## Stack

- Next.js 16 con App Router
- TypeScript
- Tailwind CSS v4
- Prisma ORM 7
- PostgreSQL
- React Hook Form + Zod
- ESLint
- Nodemailer para notificaciones opcionales por email

## Estructura

```text
app/
components/
lib/
prisma/
public/brand/
imagenes/
```

## Requisitos

- Node.js 20 o superior
- npm 10 o superior
- Docker y Docker Compose para PostgreSQL local

## Variables de entorno

El proyecto incluye `.env.example` con la configuración completa para desarrollo y para las mejoras de fase 2:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/starnet?schema=public"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NEXT_PUBLIC_WHATSAPP_NUMBER="5492994668764"
CONTACT_EMAIL="hola@starnet.ar"
ADMIN_SECRET="cambia-esta-clave"
SMTP_HOST=""
SMTP_PORT="587"
SMTP_SECURE="false"
SMTP_USER=""
SMTP_PASS=""
EMAIL_FROM=""
EMAIL_TO=""
LEAD_RATE_LIMIT_MAX="5"
LEAD_RATE_LIMIT_WINDOW_MS="600000"
NEXT_PUBLIC_TURNSTILE_SITE_KEY=""
TURNSTILE_SECRET_KEY=""
```

### Variables obligatorias

- `DATABASE_URL`: conexión a PostgreSQL.
- `NEXT_PUBLIC_SITE_URL`: URL base del sitio para canonical, OG y sitemap.
- `NEXT_PUBLIC_WHATSAPP_NUMBER`: número usado en los CTA de WhatsApp.

### Variables recomendadas

- `CONTACT_EMAIL`: email visible de contacto.
- `ADMIN_SECRET`: clave simple para proteger `/admin/leads`.

### Variables opcionales

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`
- `EMAIL_FROM`
- `EMAIL_TO`

Si las variables SMTP están completas, el sitio enviará una notificación por email cada vez que entre un lead. Si fallan o no están definidas, el lead igual se guarda en base de datos.

### Anti-spam y captcha futuro

- `LEAD_RATE_LIMIT_MAX`: máximo de envíos por ventana.
- `LEAD_RATE_LIMIT_WINDOW_MS`: duración de la ventana en milisegundos.
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` y `TURNSTILE_SECRET_KEY`: reservadas para integrar Cloudflare Turnstile en una fase posterior.

## Instalación

```bash
npm install
cp .env.example .env
```

## PostgreSQL local

Levantar la base con Docker:

```bash
npm run db:up
```

Detenerla:

```bash
npm run db:down
```

## Prisma

Generar cliente Prisma:

```bash
npm run db:generate
```

Crear y aplicar migraciones:

```bash
npm run db:migrate
```

Si solo querés sincronizar esquema sin migración:

```bash
npm run db:push
```

Abrir Prisma Studio:

```bash
npm run db:studio
```

## Ejecutar el proyecto

Modo desarrollo:

```bash
npm run dev
```

Lint:

```bash
npm run lint
```

Chequeo de tipos:

```bash
npm run typecheck
```

Build de producción:

```bash
npm run build
```

Servidor de producción:

```bash
npm run start
```

## Funcionalidades implementadas

### Sitio comercial

- Home con hero orientado a conversión
- Páginas de servicios, contacto y nosotros
- Landing dinámica por servicio en `/servicios/[slug]`
- CTA visibles a WhatsApp en desktop y mobile
- Branding real integrado con assets de la marca
- SEO base con metadata, Open Graph, robots, sitemap, manifest y JSON-LD

### Formulario y leads

- Validación cliente y servidor con Zod
- Sanitización básica
- Guardado de leads en PostgreSQL vía Prisma
- Honeypot anti-spam
- Rate limiting básico en memoria para el endpoint de leads
- Continuidad por WhatsApp con mensaje prearmado
- Estructura preparada para sumar Turnstile o reCAPTCHA

### Panel privado

Ruta:

```text
/admin/leads
```

Características:

- Protección simple por entorno usando `ADMIN_SECRET`
- Sesión por cookie `httpOnly`
- Listado ordenado por fecha descendente
- Filtros por servicio y estado
- Vista mobile y desktop
- Estado vacío prolijo cuando no hay resultados

### Notificación por email

- Integración opcional con SMTP usando Nodemailer
- El guardado en base es prioritario
- Si el email falla, el lead igual se persiste
- El error se registra en servidor sin romper la experiencia del usuario

## Assets de marca

Los originales se conservan en `imagenes/`.

El proyecto normaliza los assets usados por la web en `public/brand/`:

- `logo-primary.jpeg`
- `logo-circle.jpeg`
- `logo-horizontal.jpeg`
- `logo-mark.jpeg`
- `brochure-preview.png`
- `service-web.png`
- `service-hardware.png`
- `service-qr.png`
- `og-cover.jpg`
- `icon-192.png`
- `icon-512.png`

Si querés reemplazar imágenes:

1. Copiá el nuevo archivo en `public/brand/`.
2. Mantené el mismo nombre si no querés tocar el código.
3. Si cambiás el nombre, actualizalo en `lib/site-config.ts` o en el componente que lo referencie.

## Backend interno

El formulario usa:

- validación cliente con React Hook Form + Zod
- validación y sanitización en servidor con Zod
- endpoint interno en `app/api/leads/route.ts`
- persistencia en PostgreSQL vía Prisma
- CTA para continuar por WhatsApp con mensaje prearmado
- honeypot y rate limiting listos para endurecer anti-spam
- notificación opcional por email sin afectar el guardado

## Modelo Prisma

El modelo principal es `Lead`, con campos para:

- datos de contacto
- servicio de interés
- mensaje
- origen
- estado
- fecha de alta y actualización
- campos previstos para notas internas, presupuesto y seguimiento

## Rutas incluidas

- `/`
- `/servicios`
- `/servicios/[slug]`
- `/nosotros`
- `/contacto`
- `/admin/leads`

## Despliegue

1. Configurá las variables de entorno reales.
2. Usá una base PostgreSQL administrada o un contenedor persistente.
3. Ejecutá migraciones con Prisma en el entorno de destino.
4. Publicá la app en Vercel, Railway, Render o infraestructura propia compatible con Next.js.
5. Verificá `NEXT_PUBLIC_SITE_URL` con la URL final del dominio.
6. Si activás SMTP, probá el flujo de email con credenciales reales antes de publicar.

## Notas

- El diseño toma la estética real del folleto y los logos entregados.
- La arquitectura deja espacio para agregar portfolio, blog o nuevas landings de servicio.
- El rate limiting actual es en memoria por instancia: para producción distribuida, conviene migrarlo a Redis o un servicio equivalente.

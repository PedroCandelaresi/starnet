# STARNET

Sitio web full-stack para STARNET construido con Next.js App Router, TypeScript, Tailwind CSS, Prisma y PostgreSQL.

## Stack

- Next.js 16 con App Router
- TypeScript
- Tailwind CSS v4
- Prisma ORM
- PostgreSQL
- React Hook Form + Zod
- ESLint

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

El proyecto incluye `.env.example` con la configuracion base:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/starnet?schema=public"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NEXT_PUBLIC_WHATSAPP_NUMBER="5492994668764"
CONTACT_EMAIL="hola@starnet.ar"
```

Para desarrollo local ya se dejo un `.env` con esos mismos valores. Si queres cambiar algo, ajustalo segun tu entorno.

## Instalacion

```bash
npm install
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
npm run db:migrate -- --name init
```

Si solo queres sincronizar esquema sin migracion:

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

Build de produccion:

```bash
npm run build
```

Servidor de produccion:

```bash
npm run start
```

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

Si queres reemplazar imagenes:

1. Copia el nuevo archivo en `public/brand/`.
2. Mantene el mismo nombre si no queres tocar el codigo.
3. Si cambias el nombre, actualizalo en `lib/site-config.ts` o en los componentes que lo referencian.

## Backend interno

El formulario usa:

- validacion cliente con React Hook Form + Zod
- validacion y sanitizacion en servidor con Zod
- endpoint interno en `app/api/leads/route.ts`
- persistencia en PostgreSQL via Prisma
- CTA para continuar por WhatsApp con mensaje prearmado
- honeypot listo para endurecer anti-spam a futuro

## Modelo Prisma

El modelo principal es `Lead`, con campos para:

- datos de contacto
- servicio de interes
- mensaje
- origen
- estado
- fecha de alta
- campos previstos para notas internas, presupuesto y seguimiento

## SEO implementado

- metadata por pagina
- Open Graph basico
- `robots.ts`
- `sitemap.ts`
- `manifest.ts`
- JSON-LD tipo `ProfessionalService`
- copy orientado a busquedas locales en Neuquen Capital

## Rutas incluidas

- `/`
- `/servicios`
- `/servicios/[slug]`
- `/nosotros`
- `/contacto`

## Despliegue

Para desplegar luego:

1. Configura las variables de entorno reales.
2. Usa una base PostgreSQL administrada o un contenedor persistente.
3. Ejecuta migraciones con Prisma en el entorno de destino.
4. Publica la app en Vercel, Railway, Render o infraestructura propia compatible con Next.js.
5. Verifica `NEXT_PUBLIC_SITE_URL` con la URL final del dominio.

## Notas

- El diseño toma la estetica real del folleto y logos entregados.
- La arquitectura deja espacio para agregar portfolio, blog o nuevas landings de servicio.
- Si queres sumar envio de email, el proyecto ya deja `CONTACT_EMAIL` preparado como configuracion futura.

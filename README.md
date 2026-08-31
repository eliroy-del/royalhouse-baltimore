# Royalhouse Baltimore

The digital front door for Royalhouse Baltimore: a Next.js App Router site built
for first-time visitors, members and church staff. Production-oriented from the
start — typed content models, a single design system, WCAG 2.2 AA accessibility,
structured data and a CMS-ready content layer.

## Stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, React 19, Server Components) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 with design tokens in `src/app/globals.css` |
| Primitives | Radix UI (navigation menu, dialog, accordion) |
| Motion | Framer Motion + CSS keyframes, all reduced-motion aware |
| Forms | React Hook Form + Zod, posted to App Router API routes |
| Icons | Lucide, plus hand-built SVG social glyphs |

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in what you have
npm run dev                  # http://localhost:3000
```

Useful scripts:

```bash
npm run build          # production build
npm run lint           # eslint
npm run typecheck      # tsc --noEmit

# QA against a running server (defaults to http://localhost:3210)
npm run audit -- http://localhost:3000               # crawl every route: links, console, images, axe, screenshots
npm run audit:interactions -- http://localhost:3000  # menus, search, invalid forms, focus order

# Section-by-section visual review of long pages
ROUTES="/,/plan-a-visit,/give" npm run audit:frames
```

All three scripts write to `.audit/` — `report.json` plus screenshots at mobile,
tablet and desktop widths, and viewport-sized frames under `.audit/frames`. They
run with reduced motion enabled so entrance animations cannot be misread as
contrast failures.

## What the church still needs to supply

Nothing about the church is invented. Every unknown is an empty value with a
`TODO`, and the UI degrades gracefully wherever a value is missing (for example,
"Sunday mornings — exact times confirmed weekly" instead of a fabricated time).

Fill in `src/config/church.ts`:

- Street address, ZIP and map query
- Service times (day, time, label)
- Phone, email, prayer email, office hours
- Social URLs (Instagram, Facebook, YouTube, TikTok, WhatsApp)
- Giving provider, hosted giving URL and the funds the church actually receives
- Livestream platform, channel and embed URL
- Visit details: parking, arrival, dress, kids, accessibility, service length

Then the brand asset — see `public/logo/README.md`. The official Royalhouse Chapel
mark is installed at `public/logo/royalhouse-chapel.png` and rendered, unaltered,
in the header, footer and loading screen, paired with the local wordmark
**Royalhouse Baltimore**.

Sample events, sermons, ministries, testimonies and leadership placeholders live
in `src/content/` and are clearly marked as sample content. Copy is written in US
English throughout — please keep replacement content the same.

## Environment variables

See `.env.example`. All are optional: the site builds and runs without them, and
analytics scripts are only injected when their IDs are present.

## Architecture

```
src/
  app/            routes, API handlers, sitemap, robots, error and loading states
  components/
    brand/        logo lockup and social glyphs
    cards/        event, sermon, ministry, testimony, leader, next-step cards
    forms/        visit, prayer, contact, testimony, newsletter
    home/         the homepage narrative, section by section
    layout/       header, footer, mobile sticky bar, analytics
    media/        video player, live status
    motion/       reveal, stagger, count-up, parallax
    navigation/   desktop and mobile navigation
    sections/     page hero, service card, map, FAQ, fact list, legal shell
    ui/           button, card, badge, field, container, section, empty state
  config/         church facts, brand assets, navigation, images, site metadata
  content/        sample content, replaceable by a CMS
  hooks/          scroll, body-lock, form submission
  lib/            content adapters, validation, schema.org, dates, rate limiting
  types/          content models
```

### Content and CMS readiness

Pages never import from `src/content/` directly. They call the async adapters in
`src/lib/content.ts` (`getEvents`, `getSermonBySlug`, `getMinistries`, …). To move
to Sanity, Payload, Strapi, WordPress or Supabase, reimplement those functions
against the CMS; the components and types stay as they are.

### Forms and security

Every form posts to an App Router route handler that runs the shared pipeline in
`src/lib/api.ts`: Zod validation, a honeypot field, per-IP rate limiting and
normalised error responses. Prayer requests are never logged, cached or displayed
publicly, and testimonies require moderation before they can appear.

Two things to wire up before launch:

1. **Delivery.** The route handlers validate and accept submissions but do not
   yet send them anywhere. Add an email/CRM call where each handler notes it.
2. **Rate limiting.** `src/lib/rate-limit.ts` is in-memory, which is per-instance.
   Move it to Redis or Upstash for multi-instance hosting.

Security headers, including a CSP that allows sermon video and map embeds, are
set in `next.config.ts`.

### Design system

Tokens (colour, type scale, spacing, radii, shadows, easing, keyframes) live in
`src/app/globals.css`. Two rules worth knowing:

- Gold is an accent. Fills, rules and icons use `gold-500`/`gold-400`/`gold-300`;
  small gold **text** uses `gold-800`, which clears AA on white, cream and mist.
- Muted body copy uses `text-navy-900/65` or darker on light surfaces.

### Accessibility

Semantic landmarks, a skip link, visible gold focus rings, labelled fields with
`aria-describedby` hints and `role="alert"` errors, keyboard-operable menus and
overlays, and `prefers-reduced-motion` support throughout. The audit scripts
report zero axe violations across all routes and interaction states.

### Analytics

`src/components/layout/Analytics.tsx` renders Google Analytics, GTM and the Meta
Pixel only when the matching environment variable is set, so no tracking runs by
default.

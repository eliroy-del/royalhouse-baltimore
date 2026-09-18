# Resend email setup — Royalhouse Baltimore

Form submissions (contact, plan a visit, prayer, serve, newsletter, testimony) are delivered with [Resend](https://resend.com) from Next.js API routes. The API key stays on the server only — never use `NEXT_PUBLIC_RESEND_API_KEY`.

## 1. Create a Resend account

1. Sign up at [https://resend.com](https://resend.com).
2. Open **Domains** and add `royalhousebaltimore.org`.
3. Add the DNS records Resend shows (SPF, DKIM, and any verification TXT) at your DNS host for `royalhousebaltimore.org`.
4. Wait until the domain status is **Verified**.

Until the domain is verified you can still test with Resend’s onboarding sender, but production must use a verified address on your domain.

## 2. Create an API key

1. In Resend go to **API Keys** → **Create API Key**.
2. Give it send permission only (no need for full account access).
3. Copy the key once — it will not be shown again.

## 3. Local environment

Copy `.env.example` to `.env.local` and set:

```bash
RESEND_API_KEY=re_xxxxxxxx
FORM_FROM_EMAIL="Royalhouse Baltimore <website@royalhousebaltimore.org>"
# Optional overrides:
# FORM_TO_EMAIL=baltimore@royalhousemd.org
# PRAYER_TO_EMAIL=baltimore@royalhousemd.org
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Defaults (when overrides are empty):

| Setting | Default |
| --- | --- |
| From | `Royalhouse Baltimore <website@royalhousebaltimore.org>` |
| Office inbox | `baltimore@royalhousemd.org` |
| Prayer inbox | `baltimore@royalhousemd.org` (or `PRAYER_TO_EMAIL`) |

Restart `npm run dev` after changing env vars.

## 4. Vercel

1. Project → **Settings** → **Environment Variables**.
2. Add `RESEND_API_KEY` for Production (and Preview if you want preview deploys to send mail).
3. Add `FORM_FROM_EMAIL` with the verified sender string.
4. Optionally set `FORM_TO_EMAIL` / `PRAYER_TO_EMAIL` and `NEXT_PUBLIC_SITE_URL=https://royalhousebaltimore.org`.
5. Redeploy so the new variables are picked up.

Do not duplicate empty variables in the Vercel importer — delete blank rows if the UI warns that a key already exists.

## 5. How delivery works

| Endpoint | Notification subject | Confirmation subject |
| --- | --- | --- |
| `POST /api/contact` | New Contact Request — {name} | Thanks for Connecting With Royalhouse Baltimore |
| `POST /api/plan-a-visit` | New Plan a Visit Request — {name} | We're Looking Forward to Meeting You — Royalhouse Baltimore |
| `POST /api/prayer` | New Prayer Request — Royalhouse Baltimore | We've Received Your Prayer Request (if email given) |
| `POST /api/serve` | New Launch Team Submission — {name} | Thanks for Joining the Launch Team — Royalhouse Baltimore |
| `POST /api/newsletter` | Newsletter Signup — {email} | You're Subscribed — Royalhouse Baltimore |

- Validation: Zod (+ honeypot `companyWebsite`).
- Rate limits: per IP + form scope in `src/lib/rate-limit.ts`.
- Reply-To is set to the submitter when we have their address.
- Prayer request bodies are never written to client-side logs; server logs store only non-sensitive metadata.
- Without `RESEND_API_KEY` in development, submissions are logged and return success so UI can be tested. In production a missing key fails closed (502).

`POST /api/visit` re-exports `/api/plan-a-visit` for older clients.

## 6. Test each form

With the app running (`npm run dev`) and Resend configured:

```bash
# Contact
curl -sS -X POST http://localhost:3000/api/contact \
  -H 'Content-Type: application/json' \
  -d '{"name":"Test User","email":"you@example.com","phone":"","reason":"General Question","message":"This is a test contact message.","companyWebsite":""}'

# Plan a visit
curl -sS -X POST http://localhost:3000/api/plan-a-visit \
  -H 'Content-Type: application/json' \
  -d '{"firstName":"Test","lastName":"Visitor","email":"you@example.com","phone":"","adults":1,"children":0,"preferredService":"","questions":"","wantsContact":true,"consent":true,"companyWebsite":""}'

# Prayer
curl -sS -X POST http://localhost:3000/api/prayer \
  -H 'Content-Type: application/json' \
  -d '{"name":"Test","email":"you@example.com","phone":"","category":"Personal","request":"Please pray for our church launch.","keepPrivate":true,"anonymous":false,"wantsFollowUp":false,"companyWebsite":""}'

# Serve
curl -sS -X POST http://localhost:3000/api/serve \
  -H 'Content-Type: application/json' \
  -d '{"name":"Test User","email":"you@example.com","phone":"","team":"Media Team","areas":"Video","experience":"","message":"","consent":true,"companyWebsite":""}'

# Newsletter
curl -sS -X POST http://localhost:3000/api/newsletter \
  -H 'Content-Type: application/json' \
  -d '{"email":"you@example.com","consent":true,"companyWebsite":""}'
```

Also submit once through each on-site form and confirm both the office notification and the visitor confirmation arrive.

## 7. Replace the sender later

Update `FORM_FROM_EMAIL` (local and Vercel) to any verified address on the domain, for example:

```bash
FORM_FROM_EMAIL="Royalhouse Baltimore <hello@royalhousebaltimore.org>"
```

Code default lives in `src/lib/email/config.ts` — prefer env overrides over editing code.

## 8. Code map

- `src/lib/email/config.ts` — from / recipients / brand colors
- `src/lib/email/client.ts` — Resend client (server-only)
- `src/lib/email/send.ts` — render + send + safe logging
- `src/emails/*` — React Email templates
- `src/app/api/*/route.ts` — form endpoints

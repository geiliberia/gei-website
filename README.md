# Greenpeace Environmental Initiative – Liberia website

Next.js 15 (App Router) + Tailwind CSS 3 + TypeScript. Three pages: Home, Our work, Get involved.

## Run it
```bash
npm install
cp .env.example .env.local   # fill in values
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
```

## Replace before launch
1. **Photos** – placeholders live in `public/images/*.svg`. Add real photos (JPG/WebP) to the same folder and update the paths in `lib/images.ts`. Each placeholder says what photo belongs there.
2. **Contact email** – set `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` (resend.com). Until set, the form shows a "call us instead" message in production rather than losing messages.
3. **Site URL** – set `NEXT_PUBLIC_SITE_URL` (canonical links, sitemap, social previews).
4. **Real activity** – add dated reports to `lib/projects.ts`; a "Recent planting days" list then appears on /our-work. Empty list = nothing shown.
5. **Facts to confirm** – address spelling, phone format (leading 0 dropped for +231), participant numbers (brief said "150,00"; not displayed), and the wording of the "Peace" pillar on the home page.

## Brand
Colours sampled from the logo (`tailwind.config.ts`): forest `#0B4A2A`, leaf `#0AA050`, sun `#F07C1E`. Fonts: Zilla Slab (headings, echoes the slab lettering on the flyer) and Public Sans (body), self-hosted via Fontsource, so no calls to Google.

## Security
- Strict headers in `next.config.mjs`: CSP, HSTS, X-Frame-Options DENY, nosniff, Referrer-Policy, Permissions-Policy.
- `/api/contact`: same-origin check, JSON only, 10 KB cap, per-IP rate limit, honeypot, server-side validation and control-character stripping, plain-text email with fixed subject (no header or HTML injection), generic error messages.
- No `dangerouslySetInnerHTML` except JSON-LD with `<` escaped. No database, no user accounts, no third-party scripts.
- Rate limiter is in-memory; on serverless/multi-instance hosting swap in Redis (Upstash).
- `npm audit` still reports advisories in PostCSS bundled inside Next (build-time only); they clear with Next 16 when you choose to upgrade.

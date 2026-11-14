# Progress Notes — Dr. Zia's OPD Clinic Website

Status: **BUILD PASSING · LINT CLEAN · PREVIEW-TESTED (HTTP 200) — remaining work is photos + manual QA.**

## Session ownership
Two agent sessions edited this project concurrently (19:17–19:42). The user designated
**this session as the sole owner**. The other session's good work was adopted; its spec
deviations were corrected (see below). If files change unexpectedly, another session may
still be open — close it.

## Completed

### Build setup (fixed this session)
- **`vite.config.ts` now registers `@tailwindcss/vite`** — it was installed but never wired up,
  so Tailwind was emitting raw `@theme`/`@tailwind` at-rules and generating **zero utilities**
  (`.bg-navy` etc. were missing from the bundle). Added `plugins: [tailwindcss(), react()]`.
- `npm run build` → passes (`tsc -b && vite build`, no errors, no warnings).
- `npm run lint` → passes with **0 warnings** (fixed `Date`-in-render in Footer → module scope;
  fixed sync `setState`-in-effect in Reveal → lazy `useState` initializer for reduced-motion).

### All sections/components written
| File | Status |
|---|---|
| `src/App.tsx` | Done — skip-link, Navbar, main (Hero → About → Services → Timings → Enquiry → Location → Contact → FAQ), Footer, FloatingActions |
| `src/components/DoctorProfile.tsx` | Done — #about, white bg: photo + corner accent, quick-facts dl (location/phone/OPD), quals badge, truthful copy, "What to expect" list, CTAs |
| `src/components/Services.tsx` | Done — #services, ivory bg: 6 cards, icon map `gauge/heart/wind/stethoscope/utensils/brain`, hover lift + gold border, footnote with tel link |
| `src/components/OPDSchedule.tsx` | Done — #timings, **navy bg + ivory schedule card**: table with day rows (Mon/Tue/Wed/Sat/Sun only), Sunrise/Sunset/Sun session chips, "Today" row gold-highlighted + badge, reading-note (today = reference only), legend, notice box, Call Now + WhatsApp buttons |
| `src/components/AppointmentEnquiry.tsx` | Done — #enquiry, white bg: name / Indian mobile `^[6-9]\d{9}$` (normalises +91/91/0/spaces) / day select (5 days) / dynamic session radios (built from the chosen day; always includes Flexible) / optional notes, `noValidate` custom validation + `role="alert"` errors + focus-first-invalid, loading → popup opened inside the click gesture → confirmation panel that clearly says **NOT booked until the clinic confirms**, blocked-popup fallback button, sticky navy "Prefer to call?" aside |
| `src/components/Location.tsx` | Done — #location, ivory bg: address card, Google Maps **search** + **directions** links (no fabricated pin/embed), copy-address with clipboard fallback + `aria-live`, typographic map panel |
| `src/components/Contact.tsx` | Done — #contact, white bg: call card (tel), WhatsApp card (wa.me prefilled), address strip → #location, disclaimer |
| `src/components/FAQ.tsx` | Done — #faq, ivory bg: accessible accordion (`button aria-expanded/aria-controls`, `role="region"`, `hidden`), single-open, call strip |
| `src/components/Footer.tsx` | Done — navy: emblem, tagline, tel/WhatsApp, quick links, services, **auto-grouped weekly timings** (derived from `weeklySchedule`), disclaimer + dynamic year |
| `src/components/FloatingActions.tsx` | Done — desktop: back-to-top (appears after 500 px) + WhatsApp float; mobile: sticky Call + WhatsApp bottom bar with `env(safe-area-inset-bottom)` |
| `src/components/Emblem.tsx` | Done — removed unused `tone` prop (TS6133); cross/pulse paths refined (external edit adopted) |
| `src/components/Reveal.tsx` | Done — reduced-motion now handled via lazy state init (no setState-in-effect warning) |
| `src/index.css` | Done — `.eyebrow` text darkened to `#8a6d33` (gold-on-white was 2.2:1, fails AA); new `.eyebrow-gold` for navy sections (6.2:1) |
| `public/favicon.svg` | Done — emblem SVG |
| `public/og-image.png` | Done — 1200×630, verified visually: navy, emblem, clinic name, "Medical Consultation · Kupwara", quals, address + phone. Referenced by `index.html` ✓ |

### Housekeeping
- Scaffold leftovers removed: `src/App.css`, `src/assets/*`, `public/icons.svg` (no references remain — verified by grep).
- `src/main.tsx` verified: imports `index.css` + `App.tsx` only.

## Spec-compliance pass (this session, after reconciliation)
All required copy from the brief is now exact:
- **About** h2 → "Meet Your Doctor" + name line + designation `PHYSICIAN` + `MBBS | DNB General Medicine` chip.
- **Services** h2 → "Medical Consultation" + supporting "Medical consultation for a range of common health conditions."
- **Timings** h2 → "Clinic Hours & OPD Schedule" + supporting "Plan your visit according to the regular consultation schedule."
- **Enquiry** h2 → "Plan Your Visit" (eyebrow now "Appointment Enquiry"); field labels renamed to spec:
  Patient Name / Phone Number / Preferred Consultation Day / Brief Enquiry (optional);
  session options now always include **Flexible** (`Flexible — any suitable session or time`).
- **Footer** brand column now shows `Dr. Zia Ul Islam` + quals + full address (was missing).
- Tailwind v4 `!important` prefix syntax (`!py-3`, `!rounded-none`) removed from Navbar +
  FloatingActions — plain utilities win over component classes via cascade layers anyway.
- Verified: no `!`-prefixed classes remain; dist CSS contains `.bg-navy`, `.field-input`,
  `.eyebrow-gold`, `.rounded-none` etc.; **only the three approved time ranges exist anywhere
  in project files** (grep audit) — no poster/special timing anywhere.
- `npm run build` + `npm run lint` pass; `vite preview` served HTML/og-image/favicon → 200.

## Doctor corrections + real photo (latest update round)
Applied from the doctor's supplied WhatsApp screenshots (weekly timetable photo, promo poster,
clinic photograph of the doctor):
- **Qualifications**: `MD` removed everywhere → `MBBS | DNB General Medicine`.
  New designation **Physician** added (`clinic.doctor.designation`), shown uppercase "PHYSICIAN"
  in the Hero name plate, About section and Footer. "Consultant" / "Consulting Physician"
  removed (About intro rewritten per brief). Grep-verified: zero `MD|Consultant|consulting`
  matches in `src/` + `index.html`.
- **Schedule**: all **seven days** displayed; Thursday & Friday marked **OFF** (neutral grey
  pill + subtle grey row tint, `off: true` in `weeklySchedule`). Saturday is **evening only**
  (04:30 PM – 06:30 PM — doctor's latest instruction; morning session removed). Available
  sessions use subtle forest-green pills
  (`border-forest/25 bg-forest/[0.07]`, Sunrise/Sunset/Sun icons distinguish sessions);
  legend now includes OFF and is visible on mobile too. Notice text updated to:
  "Please confirm consultation availability by contacting the clinic before visiting."
- **Photo**: `public/images/doctor.jpg` (880×1100, 4:5, ~119 KB) cropped from the supplied
  clinic photograph by `make-photo.ps1` — no WhatsApp UI, no special dates. Used by Hero and
  About (Portrait emblem fallback intact).
- **SEO**: meta/OG/Twitter descriptions + JSON-LD description updated (Physician, no MD);
  JSON-LD `jobTitle: "Physician"`; openingHoursSpecification unchanged (already correct).
  `og-image.png` regenerated via `make-og.ps1` → "Dr. Zia Ul Islam · PHYSICIAN /
  MBBS · DNB General Medicine" (navy corner pixel verified 20,43,69).
- **Enquiry form**: day dropdown lists all 7 days; OFF days labelled "Thursday — OFF";
  selecting one offers the Flexible session option.
- FAQ timings answer now states "Thursday and Friday are off."
- **Schedule is standing, not weekly**: the card no longer says "This week's schedule" —
  these are fixed timings, identical every week (no rotation/date logic; `todayIndex()` only
  highlights today's row). Subtitle keeps "regular consultation schedule".
- **Not used from the poster**: special appointment date "Sunday 23 August 2026" and its
  8:30 AM–4:00 PM timing — deliberately excluded everywhere (grep-verified).

## Notes on concurrent edits (19:17–19:19, another session/user)
- `src/data/clinic.ts`: icon key `'lungs'` → **`'wind'`** (lucide-react 1.x has no `Lung` icon) — adopted in `Services.tsx`.
- `src/components/Emblem.tsx`: cross + pulse path tweaks — kept.
- `public/og-image.png` created; scaffold files deleted.
- ⚠️ If another agent session is still open, close it before continuing to avoid clobbering.

## TODO (remaining)

1. **Photos still missing.** Poster + timetable not yet in this folder. Once present:
   - Crop doctor's photo from poster → `public/images/doctor.jpg` (PowerShell GDI+ or similar).
     Until then `Portrait` shows the emblem fallback panel (works, but the hero looks better with the photo).
   - **Verify all times against the timetable photo** (currently from `clinic.ts`).
   - Confirm the poster's special/one-off appointment date is NOT used anywhere (it is not).
2. **Manual QA** — `npm run dev`, then check on mobile + desktop:
   - nav scroll-spy + mobile menu (Escape/scroll-lock), skip-link
   - enquiry form: validation errors, WhatsApp message content, blocked-popup fallback
   - copy-address button, FAQ keyboard operation, back-to-top, `prefers-reduced-motion`
   - all tel/wa.me/maps links
3. Re-check JSON-LD `openingHoursSpecification` in `index.html` against the timetable photo.

## Design decisions (as built)
- Navy `#142B45` (structure/footer), Forest `#174D3A` (CTAs/icons), Ivory `#F7F8F5` (bg),
  Gold `#C5A66A` (accents), Ink `#344054` (body), Line `#E4E8E3` (borders), dark-gold `#8A6D33` (small text on light)
- Headings: Source Serif 4 · Body: DM Sans
- Section rhythm as built (keeps nav order Location → Contact): Hero ivory → About white →
  Services ivory → **Timings navy** → Enquiry white → **Location ivory → Contact white** → FAQ ivory → Footer navy
- No fabricated experience/awards/reviews/stats anywhere

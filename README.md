# AarogyaSetu · ఆరోగ్య సేతు

**Door → Doctor → Door care concierge for Hyderabad** — an interactive, mobile-first HTML prototype.

Verified drivers and trained medical attendants (MBBS interns, nursing students, paramedics) take patients from home to partner hospitals, stay with them inside for OP visits, labs, scans, billing and pharmacy, and bring them home.

**Hospitality** covers patients travelling in from other states: airport / railway / bus-station meet & greet, partner stays near the hospital, regional-language interpreters, diet meals, daily stay ↔ hospital transfers, Care Companion on visits and the departure drop.

## Pages

| Page | What it is |
|---|---|
| `index.html` | Start page linking to everything |
| `app.html` | Mobile app — **Patient & family** (Uber-style pickup map, booking, live tracker), **Medical attendant** (duty checklist, OTP handovers, medical notes, vitals), **Driver** (trip console, drop gate, handover OTP). **Travel** tab = Hospitality planner (with one-tap *Fill demo data*) & live itinerary |
| `register.html` | Partner registration wizard for attendants and drivers (KYC, Telangana TS/TG vehicle validation, document upload, live application status) |
| `admin.html` | Hyderabad Ops Command Center — KPIs, demand heatmap, zone supply/demand, verification queue, live trips, **Hospitality desk** (arrivals, stays, interpreters), partner hospitals |

`assets/theme.js` holds the design tokens; `assets/common.js` holds the Hyderabad sample data, trip engine and shared `localStorage` store, so all pages stay in sync in the same browser.

## Run locally

```bash
python -m http.server 8000
```

Open `http://localhost:8000/` — or `http://<your-PC-IP>:8000/app.html` on a phone on the same Wi-Fi.

## Tech

Plain HTML5 + Tailwind CSS (CDN) + Lucide icons + Leaflet (Esri light-grey basemap) + vanilla JavaScript. No build step.

> Prototype only — all people, phone numbers, IDs, prices and hospital details are illustrative sample data. Not an emergency service; in emergencies call 108.

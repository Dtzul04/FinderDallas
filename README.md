[![CI](https://github.com/Dtzul04/FinderDallas/actions/workflows/ci.yml/badge.svg)](https://github.com/Dtzul04/FinderDallas/actions/workflows/ci.yml)

# FinderDallas

Find community resources in Dallas — food banks, shelters, job centers, and medical centers.

**Live demo:** https://finder-dallas.vercel.app/

Pick a category, load live places from Google Places, then filter by name or address in the browser.

## Stack

Next.js · TypeScript · Tailwind · Google Places API · Vercel

## How it works

```
page.tsx → GET /api/places?category=… → Google Places Text Search → filter in browser (SearchBar)
```

The API route caps Google Places calls at **300 requests per day** (in-memory counter for this showcase).

## Project structure

```
src/app/          page, layout, api/places/route.ts
src/components/   Header, CategoryGrid, CategorySearch, SearchBar, ResultsPanel, Footer
src/lib/          fetchPlaces.ts, googlePlaces.ts
src/constants/    categories.ts
src/types/        Place, CategoryId
```

## Roadmap

| Status | Item |
|--------|------|
| Done | Next.js migration from React + Vite |
| Done | Category grid + search + results |
| Done | Clean repo root structure (`src/` at top level) |
| Done | Connect `/api/places` to Google Places |
| Done | Daily request cap (300) for showcase usage |
| Done | Search bar + text filtering |
| Done | UI styling (Tailwind layout, cards, header/footer) |

## Data & attribution

Results come from the **Google Places API** (Text Search) for Dallas queries. Always confirm hours and services with each organization — this app is not an official city listing.

Category ids in the app: `food_bank`, `shelter`, `job_center`, `medical_center`.

## Local development

```bash
npm install
cp .env.example .env.local   # add Google Places API key
npm run dev
npm test                     # Vitest; live Places tests skip without the API key
```

### Environment variables

Copy `.env.example` to `.env.local` and add your key from Google Cloud (**APIs & Services → Credentials**). Enable the Places API (New) for that project. The key is read only on the server when a request loads places.

| Variable | What it is |
|----------|------------|
| `GOOGLE_PLACES_API_KEY` | Google Places API key (server-side only) |

## Deploy (Vercel)

- Root directory: **`.`**
- Add `GOOGLE_PLACES_API_KEY` under **Settings → Environment Variables**
- Redeploy after adding it

## API

`GET /api/places?category=<id>` → JSON array of `{ place_id, name, formatted_address }`

Returns `429` when the daily 300-request cap is reached.

## License

- **Code:** [ISC](LICENSE)
- **Data:** live results from Google Places; confirm details with each organization

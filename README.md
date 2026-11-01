[![CI](https://github.com/Dtzul04/FinderDallas/actions/workflows/ci.yml/badge.svg)](https://github.com/Dtzul04/FinderDallas/actions/workflows/ci.yml)

# FinderDallas

Find community resources in Dallas — food banks, shelters, job centers, and medical centers.

**Live demo:** https://finder-dallas.vercel.app/

Pick a category, load places from Supabase, then filter by name or address in the browser.

## Stack

Next.js · TypeScript · Tailwind · Supabase (PostgreSQL) · Vercel

## How it works

```
page.tsx → GET /api/places?category=… → Supabase → filter in browser (SearchBar)
```

## Project structure

```
src/app/          page, layout, api/places/route.ts
src/components/   Header, CategoryGrid, CategorySearch, SearchBar, ResultsPanel, Footer
src/lib/          fetchPlaces.ts, supabase.ts
src/constants/    categories.ts
src/types/        Place, CategoryId
```

## Roadmap

| Status | Item |
|--------|------|
| Done | Next.js migration from React + Vite |
| Done | Category grid + search + results |
| Done | Clean repo root structure (`src/` at top level) |
| Done | Supabase (PostgreSQL) |
| Done | Connect `/api/places` to Supabase |
| Done | Search bar + text filtering |
| Done | UI styling (Tailwind layout, cards, header/footer) |

## Data & attribution

Listings are stored in Supabase and were built from public directories, mainly the **[Now Forward Dallas Area Guide to Emergency Assistance](https://now-forward.org/)** (emergency assistance guidebook). Always confirm hours and services with each organization — this app is not an official city listing.

Category values in the database must match the app: `food_bank`, `shelter`, `job_center`, `medical_center`.

## Local development

```bash
npm install
cp .env.example .env.local   # add Supabase URL + anon key
npm run dev
npm test                     # Vitest; DB integration tests skip without env vars
```

### Environment variables

Copy `.env.example` to `.env.local` and fill in both values from the Supabase project (**Project Settings → API**). The app reads them only when a request loads places. If one is missing, the server log names it.

| Variable | What it is |
|----------|------------|
| `FINDER_DALLAS_API_URL` | Supabase project URL |
| `SUPABASE_ANON_KEY` | Supabase anon (public) key |

## Deploy (Vercel)

- Root directory: **`.`**
- Add the same two variables under **Settings → Environment Variables**
- Redeploy after adding them

## API

`GET /api/places?category=<id>` → JSON array of `{ place_id, name, formatted_address }`

## License

- **Code:** [ISC](LICENSE)
- **Data:** factual listings from third-party guides (see Data & attribution above); not redistributed as a standalone dataset

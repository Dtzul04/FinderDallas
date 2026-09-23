[![CI](https://github.com/Dtzul04/FinderDallas/actions/workflows/ci.yml/badge.svg)](https://github.com/Dtzul04/FinderDallas/actions/workflows/ci.yml)

# FinderDallas

Find community resources in Dallas — food banks, shelters, job centers, and medical centers.

**Live demo:** https://finder-dallas.vercel.app/

## Stack

| Layer | Tech |
|-------|------|
| UI | Next.js, React, TypeScript, Tailwind CSS |
| API | Next.js Route Handler (`/api/places`) |
| Data | Typed mock data (`Place[]`) — ready to swap for Supabase/Postgres |
| Deploy | Vercel (repo root) |

**Production = Vercel only** (UI + API on one URL).

## Architecture

```
Browser (page.tsx)
    → GET /api/places?category=food_bank
    → app/api/places/route.ts   (validate request)
    → getPlaces(category)       (data layer)
    → Place[]                   (same shape always)
```

| File | Role |
|------|------|
| `src/types/index.ts` | Shared types: `Place`, `CategoryId`, `Category` |
| `src/app/page.tsx` | State + handlers; composes UI components |
| `src/lib/fetchPlaces.ts` | API client (`GET /api/places`) |
| `src/components/` | Header, CategoryGrid, ResultsPanel, Footer |
| `src/data/mockPlaces.ts` | Sample data + `getPlaces()` |
| `src/app/api/places/route.ts` | HTTP handler only |

**Why mock first?** Demos stay fast and free. The UI only depends on `Place[]`. To use Supabase later, change **only** `getPlaces` — keep returning `Place[]`.

## Project structure

```
src/
  app/
    page.tsx              home page (category select + search)
    layout.tsx            shell (Header, Footer)
    api/places/route.ts   API route
  components/             Header, CategoryGrid, ResultsPanel, Footer
  constants/              categories.ts
  lib/                    fetchPlaces.ts
  data/                   mockPlaces.ts
  types/                  index.ts
.github/workflows/ci.yml
```

## Roadmap

| Status | Item |
|--------|------|
| Done | Next.js migration from React + Vite |
| Done | Category grid + search + results (mock data) |
| Done | Clean repo root structure (`src/` at top level) |
| Done | Supabase (PostgreSQL) |
| Done | Connect `/api/places` to Supabase |
| Next | Search bar + text filtering |
| Next | Submit form for new resources |
| Next | Map view (Leaflet.js) |
| Next | User ratings |

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Deploy (Vercel)

1. Push to GitHub  
2. Vercel → your project → **Settings → General → Root Directory**  
3. Set Root Directory to **`.`** (repo root — was `frontend`, then `finder-next`)  
4. Save and redeploy  

No extra env vars needed for mock data. When Supabase is added, set server-side keys in Vercel (never commit `.env`).

## CI

GitHub Actions runs on every push and pull request to `main`:

- **app** — `npm run lint` and `npm run build`

Workflow: `.github/workflows/ci.yml`

## API

`GET /api/places?category=<id>`

Categories: `food_bank` | `shelter` | `job_center` | `medical_center`

Returns a JSON array of `{ place_id, name, formatted_address }`.

### Bring your own database (optional)

`Place` shape:

```ts
type Place = {
  place_id: string;
  name: string;
  formatted_address: string;
};
```

Example table:

```sql
CREATE TABLE places (
  place_id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  formatted_address TEXT NOT NULL,
  category TEXT NOT NULL
);
```

Then replace the body of `getPlaces` with a Supabase query filtered by `category`.

## Notes

- Migrated from React + Vite and optional Express to Next.js in September 2026.
- OpenStreetMap Nominatim was explored for live search; rate limits made mock + typed contract the reliable demo path.

## License

ISC

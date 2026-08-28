[![CI](https://github.com/Dtzul04/FinderDallas/actions/workflows/ci.yml/badge.svg)](https://github.com/Dtzul04/FinderDallas/actions/workflows/ci.yml)

# FinderDallas

Find community resources in Dallas — food banks, shelters, job centers, and medical centers.

**Live demo:** https://finder-dallas.vercel.app/

## Stack

| Layer | Tech |
|-------|------|
| UI | React, TypeScript, Vite, Tailwind CSS |
| API | Vercel Serverless Function (`/api/places`) |
| Data | Typed mock data (`Place[]`) — ready to swap for Postgres or any API |
| Local practice | Express + TypeScript (`backend/`) — optional |

**Production = Vercel only** (frontend + API on one URL).

## Architecture 

```
Browser (App.tsx)
    → GET /api/places?category=food_bank
    → api/places.ts          (validate request)
    → getPlaces(category)    (data layer)
    → Place[]                (same shape always)
```

| File | Role |
|------|------|
| `frontend/src/types.ts` | Shared types: `Place`, `CategoryId` |
| `frontend/src/App.tsx` | State + handlers; composes UI components |
| `frontend/src/lib/fetchPlaces.ts` | API client (`GET /api/places`) |
| `frontend/src/components/` | Header, CategoryGrid, ResultsPanel, Footer |
| `frontend/src/data/mockPlaces.ts` | Sample data + `getPlaces()` |
| `frontend/api/places.ts` | HTTP handler only (must stay here for Vercel) |
| `backend/` | Local Express (OSM try + mock fallback) — not used in production |

**Why mock first?** Demos stay fast and free. The UI only depends on `Place[]`. To use your own database or API later, change **only** `getPlaces` — keep returning `Place[]`.

## Project structure

```
frontend/
  src/
    components/   Header, CategoryGrid, ResultsPanel, Footer
    constants/    categories.ts
    lib/          fetchPlaces.ts
    data/         mockPlaces.ts
    types.ts
    App.tsx       state + handlers
  api/
    places.ts     Vercel serverless handler (do not move)
backend/          optional Express API for local practice
.github/workflows/ci.yml
```

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

Then replace the body of `getPlaces` with a query filtered by `category`. Hosts: local Postgres, Neon, Supabase, etc. — any Postgres with a connection string works the same idea.

## Local development

```bash
# Optional: Express API on port 5001
cd backend && npm install && npm run dev

# Frontend on port 5173
cd frontend && npm install && npm run dev
```

Open http://localhost:5173

- With Express: set `VITE_API_URL=http://localhost:5001` in `frontend/.env` (see `.env.example`)
- Without Express: use `vercel dev` in `frontend/` so `/api/places` works, or keep pointing at the live API for UI-only work

## Deploy

1. Push to GitHub  
2. Vercel → import repo → **Root Directory:** `frontend`  
3. Do **not** set `VITE_API_URL` (production uses same-origin `/api/places`)  
4. Deploy  

## CI

GitHub Actions runs on every push and pull request to `main`:

- **frontend** — `npm run lint` and `npm run build`
- **backend** — `npm run build`

Workflow: `.github/workflows/ci.yml`

## API

`GET /api/places?category=<id>`

Categories: `food_bank` | `shelter` | `job_center` | `medical_center`

Returns a JSON array of `{ place_id, name, formatted_address }`.

## Notes

- Started with a separate Express host (Render); free-tier cold starts were slow, so production API moved onto Vercel.
- OpenStreetMap Nominatim was explored for live search; rate limits made mock + typed contract the reliable demo path.

## License

ISC

[![CI](https://github.com/Dtzul04/FinderDallas/actions/workflows/ci.yml/badge.svg)](https://github.com/Dtzul04/FinderDallas/actions/workflows/ci.yml)

# FinderDallas

Find community resources in Dallas — food banks, shelters, job centers, and medical centers.

**Live demo:** https://finder-dallas.vercel.app/

## Stack

| Layer | Tech |
|-------|------|
| UI | Next.js, React, TypeScript, Tailwind CSS |
| API | Next.js Route Handler (`/api/places`) |
| Data | Supabase (PostgreSQL); `Place[]` contract in TypeScript |
| Deploy | Vercel (repo root) |

**Production = Vercel only** (UI + API on one URL).

## Architecture

```
Browser (page.tsx)
    → GET /api/places?category=food_bank
    → app/api/places/route.ts   (validate request)
    → Supabase query            (data layer)
    → Place[]                   (same shape always)
```

| File | Role |
|------|------|
| `src/types/index.ts` | Shared types: `Place`, `CategoryId`, `Category` |
| `src/app/page.tsx` | State + handlers; composes UI components |
| `src/lib/fetchPlaces.ts` | API client (`GET /api/places`) |
| `src/lib/supabase.ts` | Server-side Supabase client (env vars) |
| `src/components/` | Header, CategoryGrid, ResultsPanel, Footer |
| `src/app/api/places/route.ts` | HTTP handler + DB query |

## Project structure

```
src/
  app/
    page.tsx              home page (category select + search)
    layout.tsx            shell (Header, Footer)
    api/places/route.ts   API route
  components/             Header, CategoryGrid, ResultsPanel, Footer, SearchBar
  constants/              categories.ts
  lib/                    fetchPlaces.ts, supabase.ts
  types/                  index.ts
.github/workflows/ci.yml
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

Set Supabase env vars in Vercel (same names as `.env.local`; see `.env.example`). Never commit `.env.local`.

## Notes

- Migrated from React + Vite and optional Express to Next.js in September 2026.

## License

Help me figure this out soon 


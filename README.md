# FinderDallas

A full-stack web app that helps Dallas residents find community resources — food banks, shelters, job centers, and health services.

**Live demo:** [Add your Vercel URL here]

## What We Built

| Layer | Tech | Where it runs |
|-------|------|---------------|
| Frontend | React, TypeScript, Vite, Tailwind CSS | Vercel |
| API | Vercel Serverless Function (`/api/places`) | Vercel (same domain) |
| Local API (dev only) | Express + TypeScript | `localhost:5001` |

**Production = Vercel only.** One deploy hosts both the website and the API. No separate backend server.

## How Data Works

The live API returns **sample Dallas resource data** (mock) so search is fast and reliable for demos.

- **Production (Vercel):** `/api/places` returns mock data instantly
- **Local dev (Express):** tries [OpenStreetMap Nominatim](https://nominatim.org/) first, falls back to the same mock data if the API is slow or rate-limited

The mock data uses the same shape as a real places API (`place_id`, `name`, `formatted_address`), so you can swap in Google Places, Yelp, or any API later without changing the frontend.

## Project Structure

```
FinderDallas/
├── frontend/
│   ├── src/App.tsx          # React UI
│   ├── api/places.ts        # Vercel serverless API (production)
│   └── ...
├── backend/                 # Express API (local dev only)
│   └── src/routes/places.ts
└── README.md
```

## Local Dev

```bash
# Terminal 1 — Express backend (optional, port 5001)
cd backend && npm install && npm run dev

# Terminal 2 — frontend (port 5173)
cd frontend && npm install && npm run dev
```

Open `http://localhost:5173`

The frontend uses `VITE_API_URL=http://localhost:5001` locally (see `frontend/.env.example`).

## Deploy (Vercel)

1. Push repo to GitHub
2. [vercel.com](https://vercel.com) → **Add New Project** → import repo
3. **Root Directory:** `frontend`
4. **Do not set `VITE_API_URL`** — production uses `/api/places` on the same Vercel URL
5. Deploy

Search should return results in under a second.

## API

| Endpoint | Description |
|----------|-------------|
| `GET /api/places?category=food_bank` | Search resources |

**Categories:** `food_bank`, `shelter`, `job_center`, `medical_center`

## Why Not Render?

We initially deployed the Express backend on Render, but the free tier spins down after inactivity — the first search could take 60+ seconds. Moving the API to Vercel serverless functions on the same domain fixed that.

## License

ISC

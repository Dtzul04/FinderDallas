# FinderDallas

A full-stack web app that helps Dallas residents find community resources — food banks, shelters, job centers, and health services.

**Data:** The backend tries [OpenStreetMap Nominatim](https://nominatim.org/) first. If that fails (rate limits, no results, etc.) it falls back to **sample mock data** in the same response shape — so the app always works for demos. Swap in Google Places, Yelp, or any API you prefer for production.

## Tech Stack

- **Frontend:** React, TypeScript, Vite, Tailwind CSS
- **Backend:** Node.js, Express, TypeScript
- **Deploy:** Vercel (frontend) + Render (backend)

## Local Dev

```bash
# Terminal 1 — backend (port 5001)
cd backend && npm install && npm run dev

# Terminal 2 — frontend (port 5173)
cd frontend && npm install && npm run dev
```

Open `http://localhost:5173`

## Deploy

### 1. Push to GitHub

```bash
git init   # if not done yet
git add .
git commit -m "FinderDallas — ready to deploy"
git remote add origin https://github.com/YOUR_USERNAME/FinderDallas.git
git push -u origin main
```

### 2. Backend on Render

1. Go to [render.com](https://render.com) → **New Web Service** → connect your repo
2. Settings:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
3. **Environment variables:**

   | Key | Value |
   |-----|-------|
   | `FRONTEND_URL` | Your Vercel URL (add after step 3, e.g. `https://finder-dallas.vercel.app`) |

4. Deploy → copy your Render URL (e.g. `https://finderdallas-api.onrender.com`)

### 3. Frontend on Vercel

1. Go to [vercel.com](https://vercel.com) → **Add New Project** → import repo
2. Settings:
   - **Root Directory:** `frontend`
   - **Framework:** Vite (auto-detected)
3. **Environment variable:**

   | Key | Value |
   |-----|-------|
   | `VITE_API_URL` | Your Render URL (no trailing slash) |

4. Deploy

### 4. Connect them

Go back to Render → set `FRONTEND_URL` to your Vercel URL → **Manual Deploy** to restart.

Test: open Vercel URL → pick a category → Search.

## API

| Endpoint | Description |
|----------|-------------|
| `GET /api/health` | Health check |
| `GET /api/places?category=food_bank` | Search resources |

Categories: `food_bank`, `shelter`, `job_center`, `medical_center`

## License

ISC

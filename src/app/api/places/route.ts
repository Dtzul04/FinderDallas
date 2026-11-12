import { NextRequest, NextResponse } from "next/server";
import { searchPlaces } from "@/lib/googlePlaces";
import type { CategoryId } from "@/types";

const DAILY_LIMIT = 300;
let requestCount = 0;
let countDate = ""; // e.g. "2026-11-12"

// GET /api/places?category=food_bank
export async function GET(request: NextRequest) {
  const category = request.nextUrl.searchParams.get("category");

  if (!category) {
    return NextResponse.json(
      { error: "Category is required" },
      { status: 400 },
    );
  }

  const key = category as CategoryId;
  const today = new Date().toISOString().slice(0, 10);

  // new day → start the count over
  if (countDate !== today) {
    countDate = today;
    requestCount = 0;
  }

  if (requestCount >= DAILY_LIMIT) {
    return NextResponse.json(
      { error: "Daily Places request limit reached. Try again tomorrow." },
      { status: 429 },
    );
  }

  try {
    const data = await searchPlaces(key);
    requestCount += 1;
    return NextResponse.json(data);
  } catch (err) {
    // missing key or Google errors land here; log the real reason
    console.error("Places API error:", err);
    return NextResponse.json(
      { error: "Something went wrong loading resources. Please try again." },
      { status: 500 },
    );
  }
}

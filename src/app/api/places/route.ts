import { NextRequest, NextResponse } from "next/server";
import { categoryQueries, getPlaces } from "@/data/mockPlaces";
import type { CategoryId } from "@/types";

export async function GET(request: NextRequest) {
  const category = request.nextUrl.searchParams.get("category");

  if (!category) {
    return NextResponse.json(
      { error: "Category is required" },
      { status: 400 },
    );
  }

  const key = category as CategoryId;
  if (!categoryQueries[key]) {
    return NextResponse.json({ error: "Invalid category" }, { status: 400 });
  }

  return NextResponse.json(getPlaces(key));
}

import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import type { CategoryId } from "@/types";

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

  const { data, error } = await getSupabase()
    .from("places")
    .select("place_id, name, formatted_address")
    .eq("category", key); // must match CategoryId in types

  if (error) {
    // real error goes to the server log, users get a friendly message
    console.error("Supabase error:", error.message);
    return NextResponse.json(
      { error: "Something went wrong loading resources. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json(data ?? []);
}

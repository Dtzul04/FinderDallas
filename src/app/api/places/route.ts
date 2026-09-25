import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
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

  const { data, error } = await supabase
    .from("places")
    .select("place_id, name, formatted_address")
    .eq("category", key); // must match CategoryId in types

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data ?? []);
}

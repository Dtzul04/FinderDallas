import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import type { CategoryId } from "@/types";

export async function GET(request: NextRequest) {
  // Read category from URL 
  const category = request.nextUrl.searchParams.get("category");
  const key = category as CategoryId;

  // Validating category
  if (!category) {
    return NextResponse.json(
      { error: "Category is required" },
      { status: 400 },
    );
  }

  // Fetch data using Query Supabase
  const { data, error } = await supabase 
    .from("places")
    .select("place_id, name, formatted_address")
    .eq("category", key);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

// Return JSON array when succeed
return NextResponse.json(data ?? []);
}

import type { VercelRequest, VercelResponse } from "@vercel/node";
import type { CategoryId } from "../src/types";
import { categoryQueries, getPlaces } from "../src/data/mockPlaces";

/** Thin handler: validate category → data layer → JSON. */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const category = req.query.category as string;

  if (!category) {
    return res.status(400).json({ error: "Category is required" });
  }

  const key = category as CategoryId;
  if (!categoryQueries[key]) {
    return res.status(400).json({ error: "Invalid category" });
  }

  return res.json(getPlaces(key));
}

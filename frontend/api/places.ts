import type { VercelRequest, VercelResponse } from "@vercel/node";
import type { CategoryId } from "../src/types.js";
import { categoryQueries, getPlaces } from "../src/data/mockPlaces.js";

/** Thin handler: validate category → data layer → JSON. */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // #region agent log
  fetch('http://127.0.0.1:7286/ingest/cf03b19b-d106-4227-ac8d-7614104160a2',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'1b6380'},body:JSON.stringify({sessionId:'1b6380',location:'places.ts:handler',message:'Handler invoked',data:{category:req.query.category},timestamp:Date.now(),hypothesisId:'H2'})}).catch(()=>{});
  // #endregion

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

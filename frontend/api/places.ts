import type { VercelRequest, VercelResponse } from "@vercel/node";

const categoryQueries: Record<string, string> = {
  food_bank: "food bank",
  shelter: "homeless shelter",
  job_center: "job center",
  medical_center: "hospital",
};

const mockPlaces: Record<string, { place_id: string; name: string; formatted_address: string }[]> = {
  food_bank: [
    { place_id: "mock-fb-1", name: "North Texas Food Bank", formatted_address: "3677 Mapleshade Ln, Plano, TX 75075" },
    { place_id: "mock-fb-2", name: "Crossroads Community Services", formatted_address: "4500 S Cockrell Hill Rd, Dallas, TX 75236" },
    { place_id: "mock-fb-3", name: "Sharing Life Community Outreach", formatted_address: "3544 E Emporium Cir, Mesquite, TX 75149" },
  ],
  shelter: [
    { place_id: "mock-sh-1", name: "The Bridge Homeless Recovery Center", formatted_address: "1818 Corsicana St, Dallas, TX 75201" },
    { place_id: "mock-sh-2", name: "Union Gospel Mission Dallas", formatted_address: "4815 Cass St, Dallas, TX 75235" },
  ],
  job_center: [
    { place_id: "mock-jc-1", name: "Workforce Solutions Greater Dallas", formatted_address: "500 N Akard St, Dallas, TX 75201" },
    { place_id: "mock-jc-2", name: "Texas Workforce Commission", formatted_address: "2800 N Interstate 35E, Dallas, TX 75204" },
  ],
  medical_center: [
    { place_id: "mock-mc-1", name: "Parkland Memorial Hospital", formatted_address: "5200 Harry Hines Blvd, Dallas, TX 75235" },
    { place_id: "mock-mc-2", name: "Baylor Scott & White Medical Center", formatted_address: "3500 Gaston Ave, Dallas, TX 75246" },
  ],
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const category = req.query.category as string;

  if (!category) {
    return res.status(400).json({ error: "Category is required" });
  }

  const searchTerm = categoryQueries[category];
  if (!searchTerm) {
    return res.status(400).json({ error: "Invalid category" });
  }

  // On Vercel, return mock data instantly (no cold start, no rate limits)
  return res.json(mockPlaces[category] ?? []);
}

import type { Category, CategoryId } from "@/types";

// used by the UI and by Google Places search queries below
export const categories: Category[] = [
  { id: "food_bank", name: "Food Bank", description: "Food Banks provide food to those in need." },
  { id: "shelter", name: "Shelter", description: "Shelters provide housing to those in need." },
  { id: "job_center", name: "Job Center", description: "Job Centers provide job training and employment services." },
  { id: "medical_center", name: "Medical Center", description: "Medical Centers provide medical services to those in need." },
];

// each category becomes a Dallas search string for Google Places
export const categorySearchQueries: Record<CategoryId, string> = {
  food_bank: "food bank in Dallas, TX",
  shelter: "homeless shelter in Dallas, TX",
  job_center: "job center in Dallas, TX",
  medical_center: "medical clinic in Dallas, TX",
};

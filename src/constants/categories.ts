import type { Category } from "@/types";

// id strings must match the database
export const categories: Category[] = [
  { id: "food_bank", name: "Food Bank", description: "Food Banks provide food to those in need." },
  { id: "shelter", name: "Shelter", description: "Shelters provide housing to those in need." },
  { id: "job_center", name: "Job Center", description: "Job Centers provide job training and employment services." },
  { id: "medical_center", name: "Medical Center", description: "Medical Centers provide medical services to those in need." },
];

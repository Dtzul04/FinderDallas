// same JSON shape the API returns
export type Place = {
    place_id: string;
    name: string;
    formatted_address: string;
};

export type Category = {
    id: CategoryId;
    name: string;
    description: string;
};

// also used as the category column in Supabase
export type CategoryId = "food_bank" | "shelter" | "job_center" | "medical_center";
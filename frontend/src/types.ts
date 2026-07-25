export type Place = {
    place_id: string;
    name: string;
    formatted_address: string;
};

/** Type for the category ID. */
export type CategoryId =  "food_bank" | "shelter" | "job_center" | "medical_center";
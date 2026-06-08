import { Router } from "express";

const router = Router();
const categoryQueries = {
    food_bank: "food bank",
    shelter: "homeless shelter",
    job_center: "job center",
    medical_center: "hospital"
};

// Sample Dallas results — same shape as Nominatim. Used when the live API is unavailable.
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

router.get("/", async (req, res) => {
    const category = req.query.category as string;
    if (!category) {
        res.json({ error: "Category is required" });
        return;
    }

    const searchTerm = categoryQueries[category as keyof typeof categoryQueries];
    if (!searchTerm) {
        res.json({ error: "Invalid category" });
        return;
    }

    const query = `${searchTerm} Dallas Texas`;
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=10&viewbox=-97.0,32.6,-96.5,33.0&bounded=1`;

    try {
        const response = await fetch(url, {
            headers: {
                "User-Agent": "FinderDallas/1.0 (portfolio app)"
            }
        });

        if (response.ok) {
            const data = await response.json();
            if (Array.isArray(data) && data.length > 0) {
                const results = data.map((place: { place_id: string; name?: string; display_name: string }) => ({
                    place_id: place.place_id,
                    name: place.name || place.display_name.split(",")[0],
                    formatted_address: place.display_name
                }));
                res.json(results);
                return;
            }
        }
    } catch {
        // fall through to mock data
    }

    res.json(mockPlaces[category] ?? []);
});

export default router;

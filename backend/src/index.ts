import express from "express";
import placesRoutes from "./routes/places"; // Import the places routes
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5001;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

app.use(cors({
    origin: FRONTEND_URL
}));

app.use("/api/places",placesRoutes);

app.get("/api/health", (req, res) => {
    res.json({ message: "FinderDallas backend is running" })
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

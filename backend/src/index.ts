import express from "express";
import placesRoutes from "./routes/places"; // Import the places routes
import cors from "cors";

/** Initialize the Express app. */
const app = express();
const PORT = process.env.PORT || 5001;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

/** Configure CORS to allow requests from the frontend. */
app.use(cors({
    origin: FRONTEND_URL
}));

/** Mount the places routes. */
app.use("/api/places",placesRoutes);

/** Health check endpoint. */
app.get("/api/health", (req, res) => {
    res.json({ message: "FinderDallas backend is running" })
});

/** Start the server. */
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

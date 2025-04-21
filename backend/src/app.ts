import express from "express";
import cors from "cors";
import restaurantRoutes from "./routes/restaurants";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/restaurants", restaurantRoutes);
export default app;

import express from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const router = express.Router();

router.get("/", async (req, res) => {
  const { cuisine, price } = req.query;
  const restaurants = await prisma.restaurant.findMany({
    where: {
      cuisineType: cuisine ? String(cuisine) : undefined,
      priceRange: price ? String(price) : undefined
    },
    take: 50
  });
  res.json(restaurants);
});

router.get("/:id", async (req, res) => {
  const restaurant = await prisma.restaurant.findUnique({
    where: { id: Number(req.params.id) }
  });
  if (!restaurant) return res.status(404).json({ error: "Not found" });
  res.json(restaurant);
});

export default router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const router = express_1.default.Router();
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
    if (!restaurant)
        return res.status(404).json({ error: "Not found" });
    res.json(restaurant);
});
exports.default = router;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    await prisma.restaurant.createMany({
        data: [
            {
                name: "Sushi Place",
                cuisineType: "Japanese",
                priceRange: "$$$",
                latitude: 37.7749,
                longitude: -122.4194,
                description: "Fresh sushi downtown."
            },
            {
                name: "Burger Joint",
                cuisineType: "American",
                priceRange: "$",
                latitude: 37.7751,
                longitude: -122.4185,
                description: "Tasty burgers and fries."
            }
        ]
    });
}
main().finally(() => prisma.$disconnect());

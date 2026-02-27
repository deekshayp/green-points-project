require("dotenv").config();
const mongoose = require("mongoose");
const House = require("../models/House");

console.log("➡️ Seed script started...");
console.log("➡️ Mongo URI:", process.env.MONGO_URI);

const seedHouses = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");

    const countBefore = await House.countDocuments();
    console.log("📊 Documents before:", countBefore);

    await House.deleteMany();

    let houses = [];
    for (let i = 1; i <= 10000; i++) {
      houses.push({
        houseNo: i,
        totalWasteKg: Math.floor(Math.random() * 10),
        greenPoints: Math.floor(Math.random() * 1000),
      });
    }

    await House.insertMany(houses);
    console.log("🎉 10000 Houses Seeded Successfully");

    const countAfter = await House.countDocuments();
    console.log("📊 Documents after:", countAfter);

    process.exit();
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seedHouses();


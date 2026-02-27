const express = require("express");
const router = express.Router();
const House = require("../models/House");

/**
 * ===============================
 * 1️⃣ LOG WASTE + CALCULATE POINTS
 * ===============================
 * POST /api/houses/log-waste
 * Body: { houseNo, wasteKg }
 */
router.post("/log-waste", async (req, res) => {
  try {
    const { houseNo, wasteKg } = req.body;

    if (!houseNo || !wasteKg) {
      return res.status(400).json({ message: "houseNo and wasteKg required" });
    }

    const house = await House.findOne({ houseNo });

    if (!house) {
      return res.status(404).json({ message: "House not found" });
    }

    house.totalWasteKg += wasteKg;
    house.greenPoints += wasteKg * 100; // 1kg = 100 points

    await house.save();

    res.json({
      message: "Waste logged successfully",
      house,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * ===============================
 * 2️⃣ GET ALL HOUSES
 * ===============================
 * GET /api/houses
 */
router.get("/", async (req, res) => {
  try {
    const houses = await House.find().sort({ houseNo: 1 });
    res.json(houses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * ===============================
 * 3️⃣ RESET DATABASE (TESTING)
 * ===============================
 * POST /api/houses/reset
 */
router.post("/reset", async (req, res) => {
  try {
    await House.updateMany(
      {},
      { totalWasteKg: 0, greenPoints: 0 }
    );

    res.json({ message: "Database reset successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

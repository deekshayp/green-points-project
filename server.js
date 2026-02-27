require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const houseRoutes = require("./routes/houseRoutes");

const app = express();
connectDB();

app.use(express.json());

// ✅ THIS SERVES public/index.html
app.use(express.static("public"));

// ✅ API routes
app.use("/api/houses", houseRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

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

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

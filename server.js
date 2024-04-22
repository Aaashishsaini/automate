const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const autoRoutes = require("./Routes/autoRoutes");
const driverRoutes = require("./Routes/driverRoutes");
const dailyCollectionRoutes = require("./Routes/dailyCollectionRoutes");
const authRoutes = require("./Routes/adminRoutes");

dotenv.config();

// Database connection
const connectDb = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb://localhost:27017/automatevehicle"
    );
    //   console.log(`${conn.connection.host}`);
    console.log(`${conn}`);
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

connectDb();

const app = express();

// middlewear
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// routes
app.use("/api", autoRoutes);
app.use("/api", driverRoutes);
app.use("/api", dailyCollectionRoutes);
app.use("/api", authRoutes);

// rest api
app.get("/", (req, res) => {
  res.send({
    message: "Welcome to automate",
  });
});

const PORT = 5000 || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

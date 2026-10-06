require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const contactRoutes = require("./routes/contactRoutes");

const app = express();

// Port
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Contact Management System API is running"
  });
});

// Contact routes
app.use("/contacts", contactRoutes);

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Atlas connected successfully");

    // Start server only after database connection
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`API URL: http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:");
    console.error(error.message);
    process.exit(1);
  });
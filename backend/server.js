import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Enquiry from "./models/Enquiry.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is working");
});

app.post("/api/enquiries", async (req, res) => {
  try {
    const { name, email, interest } = req.body;

    if (!name || !email || !interest) {
      return res.status(400).json({
        message: "Please enter name, email and interest",
      });
    }

    const newEnquiry = await Enquiry.create({
      name,
      email,
      interest,
    });

    res.status(201).json({
      message: "Data saved in MongoDB",
      data: newEnquiry,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to save data",
      error: error.message,
    });
  }
});

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`Backend running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("MongoDB connection error:", error.message);
  }
}

startServer();

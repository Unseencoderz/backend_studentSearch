import express from "express";
import Student from "../models/Student.js";

const router = express.Router();
router.use(express.json());

router.post("/search", async (req, res) => {
  try {
    const query = req.body.query;
    if (!query) {
      return res.status(200).json({ message: "Start searching!!" });
    }
    
    const regex = new RegExp(`^${query}`, "i");
    const results = await Student.find({ Name: regex });

    return res.status(200).json(results);
  } catch (error) {
    console.error("Error searching students:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

export default router;

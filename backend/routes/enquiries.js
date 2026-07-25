import { Router } from "express";
import Enquiry from "../models/Enquiry.js";

const router = Router();
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post("/", async (req, res, next) => {
  try {
    const { name, email, interest } = req.body;
    if (!name?.trim() || !emailPattern.test(email || "")) {
      return res
        .status(400)
        .json({ message: "Please provide a valid name and email address." });
    }
    const enquiry = await Enquiry.create({ name, email, interest });
    return res
      .status(201)
      .json({
        message: `Thank you, ${enquiry.name.split(" ")[0]}. We will be in touch shortly.`,
      });
  } catch (error) {
    return next(error);
  }
});

export default router;

import express from "express";
import jwt from "jsonwebtoken";
import { User } from "./signup";

const router = express.Router();

router.post("/", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });
  if (user) {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return res.status(500).json({
        success: false,
        error: "JWT_SECRET is not defined",
      });
    }
    if (user.password === req.body.password) {
      const token = jwt.sign(
        {
          id: user._id,
        },
        secret,
      );
      return res.status(200).json({
        success: true,
        message: "Login successful",
        token,
      });
    } else {
      return res.status(401).json({
        success: false,
        error: "Incorrect password",
      });
    }
  } else {
    return res.status(404).json({
      success: false,
      error: "User not found",
    });
  }
});

export default router;

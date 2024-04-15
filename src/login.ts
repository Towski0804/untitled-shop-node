import express from "express";
import jwt from "jsonwebtoken";
import { User } from "./signup";

const router = express.Router();

router.post("/", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });
  if (user) {
    const secret = process.env.JWT_SECRET || "";
    if (!secret) {
      res.status(500).json({
        success: false,
        message: "JWT_SECRET is not defined",
      });
    }
    if (user.password === req.body.password) {
      const token = jwt.sign(
        {
          id: user.id,
        },
        secret,
      );
      res.json({
        success: true,
        message: "Login successful",
        token,
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }
  } else {
    res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
});

export default router;

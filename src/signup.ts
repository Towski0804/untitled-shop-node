import mongoose from "mongoose";
import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  cartData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export const User = mongoose.model("User", UserSchema);

router.post("/", async (req, res) => {
  let check = await User.findOne({ email: req.body.email });
  if (check) {
    return res.status(400).json({
      error: "User already exists",
    });
  }
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    cartData: {},
  });
  await user.save();

  const data = {
    id: user._id,
  };

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return res.status(500).json({
      error: "JWT_SECRET is not defined",
    });
  }

  const token = jwt.sign(data, secret);
  return res.status(200).json({
    success: true,
    token,
  });
});

export default router;

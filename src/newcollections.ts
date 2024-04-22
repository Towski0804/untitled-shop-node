import express from "express";
import { Product } from "./product";

const router = express.Router();

router.get("/", async (req, res) => {
  const collections = await Product.find({});
  const newcollection = collections.slice(-8);
  res.json(newcollection);
});

export default router;

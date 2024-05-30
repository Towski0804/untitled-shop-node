import express from "express";
import { Product } from "./product";

const router = express.Router();

router.get("/", async (req, res) => {
  const newcollection = await Product.find({}).limit(8).sort({ date: -1 });
  res.json(newcollection);
});

// get related products api endpoint
router.get("/:category", async (req, res) => {
  const collections = await Product.find({
    category: req.params.category,
  }).limit(4);
  res.json(collections);
});

export default router;

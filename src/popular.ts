import express from "express";
import { Product } from "./product";

const router = express.Router();

router.get("/:category", async (req, res) => {
  let product = await Product.find({ category: req.params.category });
  res.json(product.slice(0, 4));
});

export default router;

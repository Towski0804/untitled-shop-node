import express from "express";
import mongoose from "mongoose";

const router = express.Router();

const ProductSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

const Product = mongoose.model("Product", ProductSchema);

router.post("/", async (req, res) => {
  let products = await Product.find({});
  let id;
  if (products.length > 0) {
    id = products[products.length - 1].id + 1;
  } else {
    id = 1;
  }
  const product = new Product({
    id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });
  console.log(product);
  await product.save();
  console.log("Product saved");
  res.json({
    success: true,
    name: req.body.name,
  });
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const product = await Product.findOneAndDelete({
    id,
  });
  if (!product) {
    res.json({
      success: false,
      message: "Product not found",
    });
    return;
  }
  res.json({
    success: true,
    name: product?.name,
  });
});

router.get("/", async (req, res) => {
  const products = await Product.find({});
  console.log("All products fetched");
  res.json(products);
});

export default router;

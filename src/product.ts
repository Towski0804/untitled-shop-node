import express from "express";
import mongoose from "mongoose";

const router = express.Router();

const ProductSchema = new mongoose.Schema({
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
  description: {
    type: String,
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

export const Product = mongoose.model("Product", ProductSchema);

router.post("/", async (req, res) => {
  const product = new Product({
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
    description: req.body.description,
  });
  console.log(product);
  await product.save();
  console.log("Product saved");
  res.json({
    success: true,
    name: req.body.name,
  });
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const product = await Product.findOne({
    _id: id,
  });
  if (!product) {
    res.json({
      success: false,
      message: "Product not found",
    });
    return;
  }
  res.json({
    _id: product?._id,
    name: product?.name,
    image: product?.image,
    category: product?.category,
    new_price: product?.new_price,
    old_price: product?.old_price,
    description: product?.description,
  });
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const product = await Product.findOne({
    _id: id,
  });
  if (!product) {
    res.json({
      success: false,
      message: "Product not found",
    });
    return;
  }
  res.json({
    _id: product?._id,
    name: product?.name,
    image: product?.image,
    category: product?.category,
    new_price: product?.new_price,
    old_price: product?.old_price,
    description: product?.description,
  });
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const product = await Product.findOneAndDelete({
    _id: id,
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

// get all products without category
// get all products without category
router.get("/", async (req, res) => {
  const products = await Product.find({});
  console.log("All products fetched");
  res.json(products);
});

// get products with category
router.get("/category/:category", async (req, res) => {
  const products = await Product.find({
    category: req.params.category,
  }).limit(10);
  console.log("All products fetched");
  if (!products) {
    res.json({
      success: false,
      message: "No product not found",
    });
    return;
  }
  res.json(products);
});

export default router;

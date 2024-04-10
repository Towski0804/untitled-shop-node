import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import "dotenv/config";

import uploadHandler from "./upload";
import productHandler from "./product";
import useDB from "./useDB";

const port = process.env.PORT || 4000;
const app = express();
// Connect to MongoDB
useDB();

app.use(express.json());
app.use(cors());

app.use("/images", express.static("./upload/images"));
app.use("/upload", uploadHandler);
app.use("/product", productHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port} at ${new Date()}`);
});

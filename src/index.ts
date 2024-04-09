import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import multer from "multer";
import "dotenv/config";

const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 4000;

const dbUrl = process.env.DB_URL || ""; // Set a default value for DB_URL if it is undefined

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(dbUrl);
});

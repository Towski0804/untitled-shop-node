import express from "express";
import multer from "multer";
import { extname } from "path";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${extname(file.originalname)}`,
    );
  },
});
const upload = multer({ storage });

router.post("/", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${process.env.PORT}/images/${req.file?.filename}`,
  });
});

export default router;

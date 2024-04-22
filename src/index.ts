import express from "express";
import cors from "cors";
import "dotenv/config";

import uploadHandler from "./upload";
import productHandler from "./product";
import signupHandler from "./signup";
import loginHandler from "./login";
import newcollectionsHandler from "./newcollections";
import popularHandler from "./popular";
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
app.use("/signup", signupHandler);
app.use("/login", loginHandler);
app.use("/newcollections", newcollectionsHandler);
app.use("/popular", popularHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port} at ${new Date()}`);
});

export default app;

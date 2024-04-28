import express from "express";
import cors from "cors";
import "dotenv/config";

import uploadHandler from "./upload";
import productHandler from "./product";
import signupHandler from "./signup";
import loginHandler from "./login";
import newcollectionsHandler from "./newcollections";
import popularHandler from "./popular";
import cartitemsHandler from "./cartitems";
import useDB from "./useDB";

const port = Number(process.env.PORT) || 4000;
const app = express();
// Connect to MongoDB
useDB();
app.use(express.json());
app.use(cors());

app.use("/images", express.static("./upload/images"));
app.use("/api/v1/upload", uploadHandler);
app.use("/api/v1/product", productHandler);
app.use("/api/v1/signup", signupHandler);
app.use("/api/v1/login", loginHandler);
app.use("/api/v1/newcollections", newcollectionsHandler);
app.use("/api/v1/popular", popularHandler);
app.use("/api/v1/cartitems", cartitemsHandler);

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port} at ${new Date()}`);
});

export default app;

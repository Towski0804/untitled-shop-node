import mongoose from "mongoose";

const isDev = process.env.SERVE_MODE === "dev";

const dbUrl = process.env.DB_URL || "";
const useDB = () =>
  mongoose.connect(isDev ? `${dbUrl}/eshop_dev` : `${dbUrl}/eshop`);

export default useDB;

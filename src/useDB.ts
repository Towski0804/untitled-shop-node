import mongoose from "mongoose";

const dbUrl = process.env.DB_URL || "";
const useDB = () => mongoose.connect(`${dbUrl}/eshop`);

export default useDB;

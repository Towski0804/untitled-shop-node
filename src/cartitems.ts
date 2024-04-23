import express from "express";
import jwt from "jsonwebtoken";
import { User } from "./signup";

const router = express.Router();

const secret = process.env.JWT_SECRET;

// the old codes are working, but are a pile of shit
// export async function getUserByJWT(
//   req: express.Request,
//   res: express.Response,
// ) {
//   const token = req.headers["auth-token"] as string;
//   if (!token) return res.status(401).json({ error: "No token provided" });
//   if (!secret)
//     return res.status(500).json({ error: "JWT_SECRET is not defined" });
//   const payload = jwt.verify(token, secret) as { user: string };
//   if (!payload) return res.status(401).json({ error: "Invalid token" });
//   return await User.findOne({ _id: payload.user.id });
// }

// router.post("/", async (req, res) => {
//   const userData = await getUserByJWT(req, res);
//   if (!userData) return res.status(404).json({ error: "User not found" });
//   const itemID = req.body["itemID"];
//   console.log(itemID);
//   userData.cartData = { ...userData.cartData } || {};
//   userData.cartData[itemID] = userData.cartData[itemID] + 1 || 1;
//   console.log(userData.cartData);
//   await User.updateOne({ _id: userData.id }, { cartData: userData.cartData });
//   return res.status(200).json({ success: true });
// });

export async function getUserByToken(token: string) {
  if (!token || !secret) return null;

  try {
    const { id } = jwt.verify(token, secret) as { id: string };
    return await User.findById(id);
  } catch {
    return null;
  }
}

router.post("/", async (req, res) => {
  const { itemID } = req.body;
  const user = await getUserByToken(req.headers["auth-token"] as string);
  if (!user) return res.status(404).json({ error: "User not found" });
  const cartData = { ...(user.cartData || {}) };
  cartData[itemID] = (cartData[itemID] || 0) + 1;
  await User.updateOne({ _id: user.id }, { cartData });
  return res
    .status(200)
    .json({ success: true, message: `Item ${itemID} added to cart` });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await getUserByToken(req.headers["auth-token"] as string);
  if (!user) return res.status(404).json({ error: "User not found" });
  const cartData = { ...(user.cartData || {}) };
  cartData[id] -= 1;
  if (cartData[id] <= 0) delete cartData[id];
  await User.updateOne({ _id: user.id }, { cartData });
  return res
    .status(200)
    .json({ success: true, message: `Item ${id} removed from cart` });
});

export default router;

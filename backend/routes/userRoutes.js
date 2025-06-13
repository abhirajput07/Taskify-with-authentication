import express from "express";
import { loginUser, registerUser } from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/protected", protect, (req, res) => {
  res.json({ message: "Protected route accessed", user: req.user });
});
export default router;

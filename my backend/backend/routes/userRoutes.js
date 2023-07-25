import express from "express";
import {
  authUser,
  findAll,
  registerUser,
  updateUserProfile,
} from "../controllers/userController.js";
const router = express.Router();
router.route('/getall').get(findAll)
router.route("/").post(registerUser);
router.post("/login", authUser);
router.route("/profile").post(updateUserProfile);

export default router;

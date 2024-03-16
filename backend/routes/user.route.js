import express from "express";
import {
  createUser,
  getUser,
  getUsers,
  deleteUser,
  updateUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/user", getUsers);
router.post("/user", createUser);
router.delete("/user/:id", deleteUser);
router.get("/user/:id", getUser);
router.patch("/user/:id", updateUser);

export default router;

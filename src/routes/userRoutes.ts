import { Router } from "express";
import { register, login } from "../controllers/userController";

const router = Router();

// Register a new user
router.post("/register", register);

// Login a user
router.post("/login", login);

export default router;

import { Router } from "express";
import { create, getAll, update, remove } from "../controllers/todoController";
import { authenticate } from "../middlewares/auth";

const router = Router();

router.use(authenticate);

// Create a new to-do item
router.post("/", create);

// Get all to-do items
router.get("/", getAll);

// Update a to-do item
router.put("/:id", update);

// Delete a to-do item
router.delete("/:id", remove);

export default router;

import { Request, Response, NextFunction } from "express";
import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} from "../services/todoService";
import {
  ValidationError,
  ForbiddenError,
  NotFoundError,
} from "../utils/errors";

// Create a new to-do item
export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, description } = req.body;
    if (!title) {
      throw new ValidationError("Title is required");
    }

    const todo = await createTodo({
      title,
      description,
      completed: false,
      userId: req.user!.userId,
    });

    res.status(201).json(todo);
  } catch (error) {
    next(error);
  }
};

// Get all to-do items for a user
export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const { data, total } = await getTodos(req.user!.userId, page, limit);

    res.json({ data, page, limit, total });
  } catch (error) {
    next(error);
  }
};

// Update a to-do item
export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    const todo = await updateTodo(parseInt(id), req.user!.userId, {
      title,
      description,
      completed,
    });

    if (!todo) {
      throw new ForbiddenError("You are not allowed to update this item");
    }

    res.json(todo);
  } catch (error) {
    next(error);
  }
};

// Delete a to-do item
export const remove = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    await deleteTodo(parseInt(id), req.user!.userId);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

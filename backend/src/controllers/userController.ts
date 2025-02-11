import { Request, Response, NextFunction } from "express";
import { createUser, findUserByEmail } from "../services/userService";
import { generateToken } from "../utils/jwt";
import { ValidationError, UnauthorizedError } from "../utils/errors";
import bcrypt from "bcrypt";

// Register a new user
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      throw new ValidationError("Name, email, and password are required");
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      console.log(`User with email ${email} already exists`);
      throw new ValidationError("Email already in use");
    }

    const user = await createUser({ name, email, password });
    const token = generateToken({ userId: user.id, email: user.email });

    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

// Login user
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new ValidationError("Email and password are required");
    }

    const user = await findUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedError("Invalid email or password");
    }

    const token = generateToken({ userId: user.id, email: user.email });
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

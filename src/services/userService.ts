import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { User } from "../types";

const prisma = new PrismaClient();
const SALT_ROUNDS = 10;

// Create a new user
export const createUser = async (
  userData: Omit<User, "id" | "createdAt" | "updatedAt">
): Promise<User> => {
  const hashedPassword = await bcrypt.hash(userData.password, SALT_ROUNDS);

  const user = await prisma.user.create({
    data: {
      ...userData,
      password: hashedPassword,
    },
  });
  return user;
};

// Find user by email
export const findUserByEmail = async (email: string): Promise<User | null> => {
  return prisma.user.findUnique({
    where: { email },
  });
};

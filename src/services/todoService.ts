import { PrismaClient } from "@prisma/client";
import { Todo } from "../types";

const prisma = new PrismaClient();

// Create a new to-do item
export const createTodo = async (
  todoData: Omit<Todo, "id" | "createdAt" | "updatedAt">
): Promise<Todo> => {
  return prisma.todo.create({
    data: todoData,
  });
};

// Get all to-do items for a user
export const getTodos = async (
  userId: number,
  page: number,
  limit: number
): Promise<{ data: Todo[]; total: number }> => {
  const [data, total] = await prisma.$transaction([
    prisma.todo.findMany({
      where: { userId },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.todo.count({ where: { userId } }),
  ]);

  return { data, total };
};

// Update a to-do item
export const updateTodo = async (
  id: number,
  userId: number,
  todoData: Partial<Todo>
): Promise<Todo | null> => {
  return prisma.todo.update({
    where: { id, userId },
    data: todoData,
  });
};

// Delete a to-do item
export const deleteTodo = async (id: number, userId: number): Promise<void> => {
  await prisma.todo.deleteMany({
    where: { id, userId },
  });
};

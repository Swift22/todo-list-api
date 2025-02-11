import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default async () => {
  await prisma.todo.deleteMany();
  await prisma.user.deleteMany();

  const hashedPassword = await bcrypt.hash("password123", 10);

  const user = await prisma.user.create({
    data: {
      email: "testuser@example.com",
      name: "Test User",
      password: hashedPassword,
    },
  });

  console.log("User created:", user);
};

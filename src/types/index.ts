export interface User {
  id: number;
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Todo {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface JwtPayload {
  userId: number;
  email: string;
}

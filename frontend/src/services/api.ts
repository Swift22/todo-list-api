import axios from "axios";

// Create axios instance with our API base URL
const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

// Add request interceptor to include auth token in all requests
api.interceptors.request.use((config) => {
  // Get token from localStorage if it exists
  const token = localStorage.getItem("token");

  if (token) {
    // Add token to request headers
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Auth endpoints
export const auth = {
  // Register new user
  register: async (name: string, email: string, password: string) => {
    const response = await api.post("/users/register", {
      name,
      email,
      password,
    });
    return response.data;
  },

  // Login user
  login: async (email: string, password: string) => {
    const response = await api.post("/users/login", {
      email,
      password,
    });
    return response.data;
  },
};

// Todo endpoints
export const todos = {
  // Get all todos with pagination
  getAll: async (page = 1, limit = 10) => {
    const response = await api.get(`/todos?page=${page}&limit=${limit}`);
    return response.data;
  },

  // Create new todo
  create: async (title: string, description?: string) => {
    const response = await api.post("/todos", {
      title,
      description,
    });
    return response.data;
  },

  // Update todo
  update: async (
    id: number,
    data: { title?: string; description?: string; completed?: boolean }
  ) => {
    const response = await api.put(`/todos/${id}`, data);
    return response.data;
  },

  // Delete todo
  delete: async (id: number) => {
    await api.delete(`/todos/${id}`);
  },
};

export default api;

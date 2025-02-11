import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import { errorHandler } from "./middlewares/errorHandler";
import { ErrorRequestHandler } from "express";
import userRoutes from "./routes/userRoutes";
import todoRoutes from "./routes/todoRoutes";

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Basic route
app.get("/", (req, res) => {
  res.json({ message: "Todo List API" });
});

// User routes
app.use("/api/users", userRoutes);

// Todo routes
app.use("/api/todos", todoRoutes);

// Error handling middleware
app.use(errorHandler as ErrorRequestHandler);

export default app;

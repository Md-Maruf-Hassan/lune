import express from "express";
import helmet from "helmet";
import cors from "cors";
import { healthRouter } from "./routes/health.routes.js";
import authRoutes from "./routes/auth.routes.js";
import { notFound } from "./middleware/not-found.js";
import { errorHandler } from "./middleware/error-handler.js";

const app = express();

app.disable("x-powered-by");
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true
}));
app.use(express.json({ limit: "1mb" }));

app.use("/api/health", healthRouter);
app.use("/api/auth", authRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
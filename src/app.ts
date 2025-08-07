import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db";
import adminRoutes from "./routes/admin.routes";
import teacherRoutes from "./routes/teacher.routes";
import { errorHandler } from "./middlewares/error.middleware";
import authRoutes from "./routes/auth.routes";
import { verifyJWT } from "./middlewares/verifyJWT";
import { authorizeRole } from "./middlewares/authorizeRole";

// Load env variables
dotenv.config();

// Init express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allow all origins
app.use(express.json()); // to parse JSON bodies

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", verifyJWT, authorizeRole("admin"), adminRoutes);
app.use("/api/teacher", verifyJWT, authorizeRole("teacher"), teacherRoutes);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start server
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
};

startServer();

app.use(errorHandler);

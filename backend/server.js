import { configDotenv } from "dotenv";
import express from "express";
import connectDB from "./config/connection.js";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
const app = express();
configDotenv();
connectDB();
const corsOptions = {
  origin: ["*"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("server is running");
});
app.use("/api/users", userRoutes);
app.use("/api/todos", todoRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server Started at PORT:${PORT}`);
});

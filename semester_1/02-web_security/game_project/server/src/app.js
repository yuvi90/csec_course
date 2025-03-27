import express from "express";

// Config
import config from "../config/index.js";

// Initializing App
const app = express();

app.use(express.json());

// Using Routes
import authRoute from "./routes/auth.js";
app.use("/test", (req, res) => {
  res.json({ message: "Test Route" });
});
app.use("/auth", authRoute);

// Error Middleware
import { errorMiddleware } from "./middlewares/error.js";
app.use(errorMiddleware);

app.listen(config.port, () => {
  console.log("Server running on port 3000");
});

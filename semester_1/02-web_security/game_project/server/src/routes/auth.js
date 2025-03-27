import express from "express";
import AuthController from "../controllers/auth.js";

const router = express.Router();

// Route - /auth/register
router.post("/register", AuthController.registerUser);

// Route - /auth/login
// router.post("/login", AuthController.loginUser);

// Route - /auth/logout
// router.get("/logout", AuthController.logoutUser);

// Route - /auth/refresh
// router.get("/refresh", AuthController.refreshAccessToken);

export default router;

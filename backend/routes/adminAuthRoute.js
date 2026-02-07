import express from "express";
import { adminLogin } from "../controllers/adminAuthController.js";

const router = express.Router();

/* ADMIN LOGIN */
router.post("/", adminLogin);

export default router;
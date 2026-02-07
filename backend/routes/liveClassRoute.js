import express from "express";
import {
  getLiveClassesForStudent,
  createLiveClass,
  getAllLiveClassesForAdmin,
  deleteLiveClass
} from "../controllers/liveClassController.js";

const router = express.Router();

router.get("/live-classes", getLiveClassesForStudent);
router.get("/live-classes/admin", getAllLiveClassesForAdmin);
router.post("/live-classes", createLiveClass);
router.delete("/live-classes/:id", deleteLiveClass);
export default router;
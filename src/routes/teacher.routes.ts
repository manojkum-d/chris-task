import express from "express";
import {
  createMarks,
  getAllMarks,
  getMarksByStudentId,
  updateMarks,
  deleteMarks,
  downloadMarksExcel,
} from "../controllers/teacher.controller";

const router = express.Router();

router.post("/marks", createMarks);
router.get("/marks", getAllMarks);
router.get("/marks/:studentId", getMarksByStudentId);
router.put("/marks/:studentId", updateMarks);
router.delete("/marks/:studentId", deleteMarks);

router.get("/marks/:studentId/download", downloadMarksExcel);

export default router;

import { Request, Response } from "express";
import * as teacherService from "../services/teacher.service";
import { Student } from "../models/student.model";
import { generateStudentMarksExcel } from "../utils/excelGenerator";

export const createMarks = async (req: Request, res: Response) => {
  try {
    const marks = await teacherService.createMarks(req.body);
    res.status(201).json(marks);
  } catch (err) {
    res.status(500).json({ message: "Failed to add marks", error: err });
  }
};

export const getAllMarks = async (_req: Request, res: Response) => {
  try {
    const marks = await teacherService.getAllMarks();
    res.json(marks);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch marks", error: err });
  }
};

export const getMarksByStudentId = async (req: Request, res: Response) => {
  try {
    const marks = await teacherService.getMarksByStudentId(
      req.params.studentId
    );
    if (!marks) return res.status(404).json({ message: "Marks not found" });
    res.json(marks);
  } catch (err) {
    res.status(500).json({ message: "Error fetching marks", error: err });
  }
};

export const updateMarks = async (req: Request, res: Response) => {
  try {
    const updated = await teacherService.updateMarks(
      req.params.studentId,
      req.body
    );
    if (!updated) return res.status(404).json({ message: "Marks not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update marks", error: err });
  }
};

export const deleteMarks = async (req: Request, res: Response) => {
  try {
    const deleted = await teacherService.deleteMarks(req.params.studentId);
    if (!deleted) return res.status(404).json({ message: "Marks not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete marks", error: err });
  }
};

export const downloadMarksExcel = async (req: Request, res: Response) => {
  try {
    const studentId = req.params.studentId;

    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ message: "Student not found" });

    const marks = await teacherService.getMarksByStudentId(studentId);
    if (!marks) return res.status(404).json({ message: "Marks not found" });

    const excelBuffer = await generateStudentMarksExcel(student, marks);

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${student.name}-marks.xlsx`
    );

    res.send(excelBuffer);
  } catch (err) {
    console.error("Download error:", err);
    res.status(500).json({ message: "Failed to generate Excel", error: err });
  }
};

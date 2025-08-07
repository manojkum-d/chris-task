import { Request, Response } from "express";
import * as teacherService from "../services/teacher.service";

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

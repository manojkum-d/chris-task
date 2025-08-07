import { Request, Response } from "express";
import * as adminService from "../services/admin.service";

export const createStudent = async (req: Request, res: Response) => {
  try {
    const student = await adminService.createStudent(req.body);
    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({ message: "Failed to create student", error: err });
  }
};

export const getAllStudents = async (_req: Request, res: Response) => {
  try {
    const students = await adminService.getAllStudents();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch students", error: err });
  }
};

export const getStudentById = async (req: Request, res: Response) => {
  try {
    const student = await adminService.getStudentById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: "Error fetching student", error: err });
  }
};

export const updateStudent = async (req: Request, res: Response) => {
  try {
    const updated = await adminService.updateStudent(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: "Student not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update student", error: err });
  }
};

export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const deleted = await adminService.deleteStudent(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Student not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete student", error: err });
  }
};

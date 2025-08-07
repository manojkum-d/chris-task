import { Student, IStudent } from "../models/student.model";

export const createStudent = async (
  data: Partial<IStudent>
): Promise<IStudent> => {
  const student = new Student(data);
  return await student.save();
};

export const getAllStudents = async (): Promise<IStudent[]> => {
  return await Student.find();
};

export const getStudentById = async (id: string): Promise<IStudent | null> => {
  return await Student.findById(id);
};

export const updateStudent = async (
  id: string,
  data: Partial<IStudent>
): Promise<IStudent | null> => {
  return await Student.findByIdAndUpdate(id, data, { new: true });
};

export const deleteStudent = async (id: string): Promise<IStudent | null> => {
  return await Student.findByIdAndDelete(id);
};

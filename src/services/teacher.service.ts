import { Marks, IMarks } from "../models/marks.model";

export const createMarks = async (data: Partial<IMarks>): Promise<IMarks> => {
  const marks = new Marks(data);
  return await marks.save();
};

export const getAllMarks = async (): Promise<IMarks[]> => {
  return await Marks.find().populate("student");
};

export const getMarksByStudentId = async (
  studentId: string
): Promise<IMarks | null> => {
  return await Marks.findOne({ student: studentId }).populate("student");
};

export const updateMarks = async (
  studentId: string,
  data: Partial<IMarks>
): Promise<IMarks | null> => {
  return await Marks.findOneAndUpdate({ student: studentId }, data, {
    new: true,
  });
};

export const deleteMarks = async (
  studentId: string
): Promise<IMarks | null> => {
  return await Marks.findOneAndDelete({ student: studentId });
};

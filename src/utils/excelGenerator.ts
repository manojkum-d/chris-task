import ExcelJS from "exceljs";
import { IStudent } from "../models/student.model";
import { IMarks } from "../models/marks.model";

export const generateStudentMarksExcel = async (
  student: IStudent,
  marks: IMarks
) => {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Marks");

  sheet.columns = [
    { header: "Student Name", key: "name", width: 25 },
    { header: "Roll Number", key: "rollNumber", width: 20 },
    { header: "Math", key: "math", width: 10 },
    { header: "English", key: "english", width: 10 },
    { header: "Science", key: "science", width: 10 },
    { header: "History", key: "history", width: 10 },
    { header: "Computer", key: "computer", width: 10 },
  ];

  sheet.addRow({
    name: student.name,
    rollNumber: student.rollNumber,
    ...marks.subjectMarks,
  });

  // Write to buffer to send as response
  const buffer = await workbook.xlsx.writeBuffer();
  return buffer;
};

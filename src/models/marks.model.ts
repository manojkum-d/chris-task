import mongoose, { Schema, Document } from "mongoose";

export interface IMarks extends Document {
  student: mongoose.Types.ObjectId;
  subjectMarks: {
    math: number;
    english: number;
    science: number;
    history: number;
    computer: number;
  };
}

const MarksSchema: Schema = new Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
    unique: true,
  },
  subjectMarks: {
    math: { type: Number, required: true },
    english: { type: Number, required: true },
    science: { type: Number, required: true },
    history: { type: Number, required: true },
    computer: { type: Number, required: true },
  },
});

export const Marks = mongoose.model<IMarks>("Marks", MarksSchema);

import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
  name:  { type: String },
  grade: { type: String },
  score: { type: Number },
}, { _id: false });

const noticeSchema = new mongoose.Schema({
  date: { type: String },
  text: { type: String },
}, { _id: false });

const feesSchema = new mongoose.Schema({
  status: { type: String },
  next:   { type: String },
  amount: { type: String },
}, { _id: false });

const childSchema = new mongoose.Schema({
  id:             { type: Number },
  name:           { type: String },
  year:           { type: String },
  avatar:         { type: String },
  attendance:     { type: Number },
  gpa:            { type: String },
  nextAssessment: { type: String },
  fees:           { type: feesSchema },
  subjects:       { type: [subjectSchema] },
  notices:        { type: [noticeSchema] },
}, { _id: false });

const accountSchema = new mongoose.Schema(
  {
    email:    { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    name:     { type: String, required: true, trim: true },
    children: { type: [childSchema], default: [] },
  },
  { timestamps: true }
);

export const Account = mongoose.model("Account", accountSchema);

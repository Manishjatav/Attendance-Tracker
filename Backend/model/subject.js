import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema(
  {
    subjects: [
      {
        name: {
          type: String,
          required: true,
          trim: true,
          minlength: 2,
          maxlength: 50,
        },

        presentCount: {
          type: Number,
          default: 0,
          min: 0,
        },

        absentCount: {
          type: Number,
          default: 0,
          min: 0,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Subject", subjectSchema);
import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    records: [
      {
        date: {
          type: Date,
          required: true,
        },

        status: {
          type: String,
          enum: ["present", "absent"],
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Attendance", attendanceSchema);
import mongoose from "mongoose";

const cgpaSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  semesters: [
    {
      semester: Number,
      sgpa: Number,
    },
  ],
});

export default mongoose.model("CGPA", cgpaSchema);
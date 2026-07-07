import User from "../model/user.js";
import Subject from "../model/subject.js";
import Attendance from "../model/attendance.js";
import jwt from "jsonwebtoken";


export const valid = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: "Token Missing"
        });
    }

    const token = authHeader.split(" ")[1];

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: "Invalid Token"
        });

    }
};



export const getDashboardData = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            data: user
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};



export const addSubject = async (req, res) => {
    try {
        const userId = req.user.id;
        const { subjectName } = req.body;

        // 1. Find User
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "You are not registered user"
            });
        }
        
        // 2. Find Subject Collection
        const subjectDoc = await Subject.findById(user.subjectCollectionId);
        
        if (!subjectDoc) {
            return res.status(404).json({
                success: false,
                message: "Subject collection not found"
            });
        }

        // 3. Add Subject
        subjectDoc.subjects.push({
            name: subjectName
        });

        await subjectDoc.save();

        // 4. Get Newly Added Subject
        const newSubject = subjectDoc.subjects[subjectDoc.subjects.length - 1];

        // 5. Create Attendance Document
        await Attendance.create({
            subjectId: newSubject._id,
            records: []
        });

        return res.status(201).json({
            success: true,
            message: "Subject Added Successfully"
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });

    }
};



export const getSubjects = async (req, res) => {

    try {

        // 1. JWT middleware se userId lo
        const userId = req.user.id;

        // 2. User find karo
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // 3. Subject Collection find karo
        const subjectDoc = await Subject.findById(user.subjectCollectionId);

        if (!subjectDoc) {
            return res.status(404).json({
                success: false,
                message: "Subject collection not found"
            });
        }

        // 4. Subjects return karo
        return res.status(200).json({
            success: true,
            subjects: subjectDoc.subjects
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });

    }
};



// markAttendace

export const markAttendance = async (req, res) => {
  try {

    const { subjectId, date, status } = req.body;

    // Validation
    if (!subjectId || !date || !status) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Find Attendance Document
    const attendanceDoc = await Attendance.findOne({ subjectId });

    if (!attendanceDoc) {
      return res.status(404).json({
        success: false,
        message: "Attendance document not found",
      });
    }

    // Duplicate Date Check
    const alreadyMarked = attendanceDoc.records.find(
      (record) =>
        new Date(record.date).toDateString() ===
        new Date(date).toDateString()
    );

    if (alreadyMarked) {
      return res.status(400).json({
        success: false,
        message: "Attendance already marked for this date",
      });
    }

    // Save Attendance
    attendanceDoc.records.push({
      date,
      status,
    });

    await attendanceDoc.save();

    // Update Subject Counts
    const subjectCollection = await Subject.findOne({
      "subjects._id": subjectId,
    });

    if (subjectCollection) {

      const subject = subjectCollection.subjects.id(subjectId);

      if (status === "present") {
        subject.presentCount += 1;
      } else {
        subject.absentCount += 1;
      }

      await subjectCollection.save();
    }

    return res.status(200).json({
      success: true,
      message: "Attendance marked successfully",
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });

  }
};

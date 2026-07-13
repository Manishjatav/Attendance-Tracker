import User from "../model/user.js";
import Subject from "../model/subject.js";
import Attendance from "../model/attendance.js";
import jwt from "jsonwebtoken";
import CGPA from "../model/cgpa.js";


export const valid = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: "You are Logout"
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
            message: "Log Out"
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

    // Attendance Document
    const attendanceDoc = await Attendance.findOne({ subjectId });

    if (!attendanceDoc) {
      return res.status(404).json({
        success: false,
        message: "Attendance document not found",
      });
    }

    // Subject Document
    const subjectCollection = await Subject.findOne({
      "subjects._id": subjectId,
    });

    if (!subjectCollection) {
      return res.status(404).json({
        success: false,
        message: "Subject not found",
      });
    }

    const subject = subjectCollection.subjects.id(subjectId);

    // Check if attendance already exists for same date
    const existingRecord = attendanceDoc.records.find(
      (record) =>
        new Date(record.date).toDateString() ===
        new Date(date).toDateString()
    );

    if (existingRecord) {
      // Same status -> nothing to update
      if (existingRecord.status === status) {
        return res.status(200).json({
          success: true,
          message: "Attendance already up to date",
        });
      }

      // Remove old count
      if (existingRecord.status === "present") {
        subject.presentCount -= 1;
      } else {
        subject.absentCount -= 1;
      }

      // Add new count
      if (status === "present") {
        subject.presentCount += 1;
      } else {
        subject.absentCount += 1;
      }

      // Update status
      existingRecord.status = status;

      await attendanceDoc.save();
      await subjectCollection.save();

      return res.status(200).json({
        success: true,
        message: "Attendance updated successfully",
      });
    }

    // New attendance
    attendanceDoc.records.push({
      date,
      status,
    });

    if (status === "present") {
      subject.presentCount += 1;
    } else {
      subject.absentCount += 1;
    }

    await attendanceDoc.save();
    await subjectCollection.save();

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



// update subject
export const updateSubject = async (req, res) => {
  try {
    const userId = req.user.id;
    const { subjectId } = req.params;
    const { subjectName } = req.body;

    if (!subjectName || !subjectName.trim()) {
      return res.status(400).json({
        success: false,
        message: "Subject name is required",
      });
    }

    // Find User
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Find Subject Document
    const subjectDoc = await Subject.findById(user.subjectCollectionId);

    if (!subjectDoc) {
      return res.status(404).json({
        success: false,
        message: "Subject collection not found",
      });
    }

    // Find Subject
    const subject = subjectDoc.subjects.id(subjectId);

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: "Subject not found",
      });
    }

    subject.name = subjectName.trim();

    await subjectDoc.save();

    return res.status(200).json({
      success: true,
      message: "Subject updated successfully",
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};




export const deleteSubject = async (req, res) => {
  try {
    const userId = req.user.id;
    const { subjectId } = req.params;

    // Find User
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Find Subject Collection
    const subjectDoc = await Subject.findById(user.subjectCollectionId);

    if (!subjectDoc) {
      return res.status(404).json({
        success: false,
        message: "Subject collection not found",
      });
    }

    // Check Subject Exists
    const subject = subjectDoc.subjects.id(subjectId);

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: "Subject not found",
      });
    }

    // Delete Attendance
    await Attendance.findOneAndDelete({
      subjectId,
    });

    // Delete Subject
    subjectDoc.subjects.pull(subjectId);

    await subjectDoc.save();

    return res.status(200).json({
      success: true,
      message: "Subject deleted successfully",
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};




// CGPA section
export const addSemester = async (req, res) => {
  try {
    const { semester, sgpa } = req.body;
    const userId = req.user.id;

    // Validation
    if (semester === undefined || sgpa === undefined) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Find user's CGPA document
    let cgpaDoc = await CGPA.findOne({ userId });

    // Create document if it doesn't exist
    if (!cgpaDoc) {
      await CGPA.create({
        userId,
        semesters: [{ semester, sgpa }],
      });

      return res.status(201).json({
        success: true,
        message: "Semester added successfully",
      });
    }

    // Check duplicate semester
    const exists = cgpaDoc.semesters.find(
      (sem) => sem.semester === semester
    );

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Semester already exists",
      });
    }

    // Add semester
    cgpaDoc.semesters.push({
      semester,
      sgpa,
    });

    await cgpaDoc.save();

    return res.status(200).json({
      success: true,
      message: "Semester added successfully",
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};


export const getCgpa = async (req, res) => {
  try {
    const userId = req.user.id;

    const cgpaDoc = await CGPA.findOne({ userId });

    if (!cgpaDoc) {
      return res.status(200).json({
        success: true,
        semesters: [],
      });
    }

    const semesters = [...cgpaDoc.semesters].sort(
      (a, b) => a.semester - b.semester
    );

    return res.status(200).json({
      success: true,
      semesters,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const deleteSemester = async (req, res) => {
  try {
    const { semesterId } = req.params;
    const userId = req.user.id;

    const cgpaDoc = await CGPA.findOne({ userId });

    if (!cgpaDoc) {
      return res.status(404).json({
        success: false,
        message: "CGPA record not found",
      });
    }

    const semester = cgpaDoc.semesters.id(semesterId);

    if (!semester) {
      return res.status(404).json({
        success: false,
        message: "Semester not found",
      });
    }

    semester.deleteOne();

    await cgpaDoc.save();

    return res.status(200).json({
      success: true,
      message: "Semester deleted successfully",
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
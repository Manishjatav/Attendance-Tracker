import { useState, useEffect } from "react";
import { FaBook, FaEdit, FaTrash } from "react-icons/fa";
import CalendarDialog from "@/components/CalendarDialog.jsx";
import { Button } from "./ui/button";
import { toast } from "sonner";

export default function SubjectAttendance({btn}) {

  const [subjects, setSubjects] = useState([]);

  // Calendar Dialog State
  const [openCalendar, setOpenCalendar] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);

  const fetchSubjects = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("https://attendance-tracker-ydnp.onrender.com/api/dashboard/subjects", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setSubjects(data.subjects);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };



  const handleDelete = async (subjectId) => {
  const confirmDelete = window.confirm(
    "Delete this subject?\n\nAll attendance records associated with this subject will be permanently deleted."
  );

  if (!confirmDelete) return;

  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `https://attendance-tracker-ydnp.onrender.com/api/dashboard/subjects/${subjectId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (data.success) {
      toast.success(data.message);

      // Refresh subjects
      fetchSubjects();
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
  }
};




  useEffect(() => {
    fetchSubjects();
  }, []);

  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

        <h2 className="mb-6 text-md font-bold text-slate-800">
          Subject-wise Attendance
        </h2>

        <div className="space-y-3">

          {subjects.map((subject) => {

            const total = subject.presentCount + subject.absentCount;

            const attendance =
              total === 0
                ? 0
                : Math.round((subject.presentCount / total) * 100);

            const badge =
              attendance >= 90
                ? "bg-green-100 text-green-600"
                : attendance >= 75
                ? "bg-orange-100 text-orange-500"
                : "bg-red-100 text-red-600";

            return (
              <button
                key={subject._id}
                onClick={() => {
                  setSelectedSubject(subject);
                  setOpenCalendar(true);
                }}
                className="flex w-full items-center gap-3 rounded-xl bg-blue-50 p-3 transition hover:bg-blue-100 cursor-pointer"
              >

                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-100">
                  <FaBook className="text-lg text-blue-600" />
                </div>

                <div className="flex-1 text-left">

                  <div className="mb-2 flex items-center justify-between">

                    <h3 className="text-sm text-slate-800">
                      {subject.name}
                    </h3>

                    <div className="flex items-center gap-2">

                      <span
                        className={`rounded-lg px-3 py-1 text-xs font-semibold ${badge}`}
                      >
                        {attendance}%
                      </span>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(subject._id);
                        }}
                      >
                        <FaTrash className="ml-3" />
                      </button>

                      {btn && <Button>Mark</Button>}

                    </div>

                  </div>


                  <div className="h-1 overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="h-full rounded-full bg-blue-600 transition-all duration-500"
                      style={{ width: `${attendance}%` }}
                    />
                  </div>

                </div>


              </button>
            );
          })}

          {subjects.length === 0 && (
            <p className="text-center text-sm text-slate-500">
              No subjects added yet.
            </p>
          )}

        </div>

      </div>

      <CalendarDialog
        open={openCalendar}
        setOpen={setOpenCalendar}
        subject={selectedSubject}
      />

    </>
  );
}
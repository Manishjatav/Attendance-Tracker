import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { Button } from "./ui/button";
import "react-day-picker/dist/style.css";
import "./Calendar.css";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";


const CalendarDialog = ({ open, setOpen, subject }) => {

    const [selectedDate, setSelectedDate] = useState(new Date());

    const markAttendance = async (status) => {
    try {

        const token = localStorage.getItem("token");

        const response = await fetch("/api/dashboard/attendance", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                subjectId: subject._id,
                date: selectedDate,
                status: status,
            }),
        });

        const data = await response.json();

        if (data.success) {
        alert("Attendance Marked Successfully");
        } else {
        alert(data.message);
        }

    } catch (error) {
        console.log(error);
    }
    finally{
            window.location.reload();
    }
    };



  return (
    <Dialog open={open} onOpenChange={setOpen}>

      <DialogContent className="w-[95vw] max-w-4xl rounded-3xl">

        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold mt-2">
            Attendance : {subject?.name}
          </DialogTitle>
        </DialogHeader>

        <div className="flex justify-center">
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
          />
        </div>

        <div className="flex gap-1">
            <Button
            className="w-1/2"
            onClick={() => markAttendance("present")}
            >
            Present
            </Button>
            <Button
            className="w-1/2"
            onClick={() => markAttendance("absent")}
            >
            Absent
            </Button>
        </div>

        {/* Debug (baad me hata dena) */}
        <div className="mt-4 text-center text-sm text-slate-600">
          <p>Subject ID: {subject?._id}</p>
          <p>Present: {subject?.presentCount}</p>
          <p>Absent: {subject?.absentCount}</p>
        </div>

      </DialogContent>

    </Dialog>
  );
};

export default CalendarDialog;
import DashNav from '@/components/Navbar/DashNav'
import SubjectAttendance from '@/components/SubjectAttendance'
import { PiGraduationCapLight } from "react-icons/pi";
import { useState } from 'react';
import React from 'react'
import DialogDemo from './DialogDemo.jsx';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const TodayAttendance = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/");
        }
    }, []);

  return (
    <div>
        <DashNav/>

        {/*containers  */}
        <div className='flex justify-center md:justify-'>

          <div className="flex flex-col w-[90vw] md:w-[70vw] gap-4 mb-6">

              {/* Welcome Card */}
              <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex flex-col">
                  <h1 className="text-sm font-medium text-slate-800">
                    Welcome back, Student! 👋
                  </h1>

                  <p className="mt-1 text-xs text-slate-500">
                    Here's your academic overview.
                  </p>
                </div>
              </div>

              <DialogDemo/>
            
              <SubjectAttendance btn={true}/>
              {/* <CalendarDialog subName="srm"/> */}
          </div>

        </div>

    </div>
  )
}

export default TodayAttendance
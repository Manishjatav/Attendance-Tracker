import DashNav from '@/components/Navbar/DashNav'
import SubjectAttendance from '@/components/SubjectAttendance'
import { PiGraduationCapLight } from "react-icons/pi";
import { useState } from 'react';
import React from 'react'
import DialogDemo from './DialogDemo.jsx';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import CalendarDialog from '@/components/CalendarDialog.jsx';
import { FaS } from 'react-icons/fa6';

const Dashbaord = () => {
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

              {/* CGPA Card */}
              <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex flex-col">
                  <h3 className="text-sm font-medium text-slate-800">
                    Current CGPA
                  </h3>

                  <h1 className="mt-1 text-2xl font-bold text-blue-600">
                    NaN
                  </h1>

                  <p className="mt-1 text-xs text-slate-500">
                    On a scale of 10
                  </p>
                </div>

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-50">
                  {/* Icon */}
                  <PiGraduationCapLight size={30} className='text-violet-700'/>
                </div>
              </div>

              <DialogDemo/>
            
              <SubjectAttendance btn={false}/>
              {/* <CalendarDialog subName="srm"/> */}
          </div>

        </div>

    </div>
  )
}

export default Dashbaord
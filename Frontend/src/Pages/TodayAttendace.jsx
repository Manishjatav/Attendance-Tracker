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

          <div className="flex flex-col w-[90vw] md:w-[70vw] gap-4 mb-8">
            
            
              <SubjectAttendance btn={true}/>
              <DialogDemo/>


          </div>

        </div>

    </div>
  )
}

export default TodayAttendance
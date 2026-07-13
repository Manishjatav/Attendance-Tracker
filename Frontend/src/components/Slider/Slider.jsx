import { HiMenu } from "react-icons/hi";
import { RxCross1 } from "react-icons/rx";
import { FaUserGraduate } from "react-icons/fa";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdAutoGraph } from "react-icons/md";
import { IoBookOutline } from "react-icons/io5";
import { Button } from "../ui/button";
import { FaArrowRight, FaGraduationCap } from "react-icons/fa6";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { CgProfile } from "react-icons/cg";
import { LuBug } from "react-icons/lu";
import { MdOutlineReviews  } from "react-icons/md";


const btncss = "select-none hover:bg-blue-500 p-2 rounded-sm cursor-pointer flex items-center gap-2 active:bg-gray-700 p-2 rounded-sm cursor-pointer flex items-center gap-2";


export default function Slider({open, setOpen}) {

    const navigate = useNavigate();

    function handleSlider(){
      setOpen(false);
    }

    function removeSession(){
      localStorage.removeItem("token"); // Token delete

      navigate("/");  
    }

    return (
      <div className="fixed top-0 left-0 z-[9999] w-64 h-screen bg-gray-800 text-white p-5 rounded-tr-xl rounded-br-xl">
          <h1 className="flex gap-35 text-2xl font-bold mb-8 items-center">
            <div className="w-12 h-12 bg-blue-500 flex items-center justify-center rounded-xl">
              <FaGraduationCap/>
            </div>
            <RxCross1 className="cursor-pointer" onClick={handleSlider}/>
          </h1>

          <ul className="space-y-3">

            <li className={btncss} onClick={() => navigate('/dashboard')}>
              <MdOutlineSpaceDashboard size={18}/>Dashboard
            </li>

            <li className={btncss} onClick={() => navigate('/dashboard/today-attendance')}>
              <IoMdCheckmarkCircleOutline size={18}/>Today Attendance
            </li>

            <li className={btncss} onClick={() => navigate('/dashboard/cgpa')}>
              <MdAutoGraph size={18}/>CGPA
            </li>

             <li className={btncss}>
              <CgProfile size={18}/>Your Profile
            </li>

             <a className={btncss} href="https://docs.google.com/forms/d/e/1FAIpQLSe7rtV7kQxcV2pP9DhI4ktHkxa1SSGrNjla3sNCP4C9faTMmw/viewform"
                target="_blank"
                rel="noopener noreferrer" >
              <LuBug size={18}/>Report a bug
            </a>

            <a className={btncss}  href="https://docs.google.com/forms/d/e/1FAIpQLSe7rtV7kQxcV2pP9DhI4ktHkxa1SSGrNjla3sNCP4C9faTMmw/viewform"
                target="_blank"
                rel="noopener noreferrer" >
              <MdOutlineReviews  size={18}/>Suggestion
            </a>

          
          </ul>

          <hr className="border-t border-gray-500 my-4" />
          <Button className='bg-blue-500 hover:bg-gray-500' onClick={removeSession}>Logout <FaArrowRight />
          </Button>
          
      </div>
    );
}
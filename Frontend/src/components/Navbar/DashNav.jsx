import React, { useState } from 'react'
import { Button } from '../ui/button';
import { FiMenu } from "react-icons/fi";
import { GiGraduateCap } from "react-icons/gi";
import Slider from '../Slider/Slider';
import { useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { div } from 'motion/react-client';

export default function DashNav(){

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  function toggleMenu(){
    setOpen((prev) => !prev);
  }


  return (
    
    <nav className="mb-4">
      
      {open && <Slider open={open} setOpen={setOpen}/>}

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-2">

        {/* Left */}
        <div className='flex justify-between'>

          <div className="flex items-center gap-1 items-center">
            <button onClick={toggleMenu} className='cursor-pointer'>
              <FiMenu size={24}/>
            </button>
            
           <p className='text-lg'>
              AcadTrack
            </p>
            {/* <GiGraduateCap size={24}/> */}

          </div>

        </div>
        

        <div className="flex items-center gap-5">
        
          <SimpleDropdown/>

        </div>

      </div>

    </nav>
  )
}











import { IoNotificationsOutline } from "react-icons/io5";
import SimpleDropdown from '../SimpleDropdown';



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
            
            <span className="pointer-events-none z-10 h-full bg-linear-to-br from-[#233ea8] from-35% to-[#03192b] bg-clip-text text-center text-lg leading-none font-bold tracking-tighter text-balance whitespace-pre-wrap text-transparent md:text-2xl xl:text-2xl dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
                AcadTrack
            </span>
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



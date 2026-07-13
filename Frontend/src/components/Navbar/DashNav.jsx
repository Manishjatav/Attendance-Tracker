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
    
    <nav className="mb-5 mt-2">
      
      {open && <Slider open={open} setOpen={setOpen}/>}

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-2">

        {/* Left */}
        <div className='flex justify-between'>

          <div className="flex items-center gap-1 items-center">
            <button onClick={toggleMenu} className='cursor-pointer'>
              <FiMenu size={24}/>
            </button>
            
            <span className="ml-2 pointer-events-none z-10 h-full bg-linear-to-br from-[#233ea8] from-35% to-[#03192b] bg-clip-text text-center text-xl leading-none font-bold tracking-tighter text-balance whitespace-pre-wrap text-transparent md:text-2xl xl:text-2xl dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
                AcadTrack
            </span>
            {/* <GiGraduateCap size={24}/> */}

          </div>

        </div>
        

        <div className="flex items-center gap-5">
        
          {/* Notification */}
          <button className="rounded-full p-2 hover:bg-slate-100 transition cursor-pointer">
            <IoNotificationsOutline className="text-xl text-slate-700" />
          </button>

          <SimpleDropdown/>

        </div>

      </div>

    </nav>
  )
}











import { IoNotificationsOutline } from "react-icons/io5";
import SimpleDropdown from '../SimpleDropdown';

// export default function DashboardHeader() {
//   return (
//     <header className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between bg-white px-6 py-5">
      
//       {/* Left */}
//       <div>
//         <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
//           Welcome back, Student! 👋
//         </h1>

//         <p className="mt-2 text-sm md:text-base text-slate-500">
//           Here's your academic overview.
//         </p>
//       </div>

//       {/* Right */}
//       <div className="flex items-center gap-5">
        
//         {/* Notification */}
//         <button className="rounded-full p-2 hover:bg-slate-100 transition">
//           <IoNotificationsOutline className="text-2xl text-slate-700" />
//         </button>

//         {/* Profile */}
//         <button className="flex items-center gap-3 rounded-xl px-2 py-2 hover:bg-slate-100 transition">
          
//           <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-white font-semibold">
//             S
//           </div>

//           <span className="font-medium text-slate-800">
//             Student
//           </span>

//           <MdKeyboardArrowDown className="text-2xl text-slate-500" />
//         </button>

//       </div>
//     </header>
//   );
// }




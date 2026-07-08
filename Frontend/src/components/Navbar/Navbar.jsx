import React, { useState } from 'react'
import { Button } from '../ui/button';
import { FiMenu } from "react-icons/fi";
import { GiGraduateCap } from "react-icons/gi";
import Slider from '../Slider/Slider';
import { useNavigate } from "react-router-dom";


const Navbar = () => {

  const navigate = useNavigate();

  return (
    <>
    {/* {open && <Slider open={open} setOpen={setOpen}/>} */}
    <nav className="border-b bg-white  font-bold tracking-tight">
      
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-2">
        
        {/* Left */}
        <div className="flex items-center gap-2">
          
             <span className="ml-2 pointer-events-none z-10 h-full bg-linear-to-br from-[#233ea8] from-35% to-[#03192b] bg-clip-text text-center text-xl leading-none font-bold tracking-tighter text-balance whitespace-pre-wrap text-transparent md:text-2xl xl:text-2xl dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
                AcadTrack
            </span>

        </div>


        {/* Desktop */}
        <div className="hidden items-center gap-3 md:flex">
          <Button variant="outline" className='px-3 py-4 text-base' onClick={() => navigate("/login")}>Login</Button>
          <Button className='bg-blue-600 px-3 py-4 text-base' onClick={() => navigate("/register")}>Get Started</Button>
        </div>
        
        {/* Mobile */}
        <button className="block md:hidden space-x-2">
          <Button variant="outline" className='px-3 py-4 text-base' onClick={() => navigate("/login")}>Login</Button>
          <Button className='bg-blue-600 px-3 py-4 text-base mr-1' onClick={() => navigate("/register")}>Get Started</Button>
        </button>
        
      </div>

    </nav>
    </>
  );
};

export default Navbar;

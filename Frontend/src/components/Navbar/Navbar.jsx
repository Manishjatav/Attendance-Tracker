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
    <nav className="border-b bg-white  font-bold tracking-tight">
      
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-2">
        
        {/* Left */}
        <div className="flex items-center gap-2">
            <p className='text-lg'>
              AcadTrack
            </p>
            {/* <GiGraduateCap size={24}/> */}

        </div>


        {/* Desktop */}
        <div className="hidden items-center gap-3 md:flex">
          <Button variant="outline" className='px-3 py-4 text-base' onClick={() => navigate("/login")}>Login</Button>
          <Button className='bg-blue-600 px-3 py-4 text-base' onClick={() => navigate("/register")}>Get Started</Button>
        </div>
        
        {/* Mobile */}
        <button className="block md:hidden space-x-2">
          <Button variant="outline" className='px-3 py-4 text-base' onClick={() => navigate("/login")}>Login</Button>
          <Button className='bg-blue-600 px-3 py-4 text-base' onClick={() => navigate("/register")}>Get Started</Button>
        </button>
        
      </div>

    </nav>
    </>
  );
};

export default Navbar;

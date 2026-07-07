import React from 'react'
import { MagicCard } from './ui/magic-card'
import { SiTicktick } from "react-icons/si";
import { MdAutoGraph  } from "react-icons/md";
import { BsCalendar2Check } from "react-icons/bs";
import { NeonGradientCard } from "@/components/ui/neon-gradient-card";

const Features = () => {
  return (
      <div className='flex gap-8 flex-wrap m-4 justify-center'>

          <MagicCard className="z-[999] rounded-2xl p-5 shadow-sm w-[90%] md:w-[23%] transition-all duration-300 ease-in-out hover:-translate-y-[5px]">

                <div className="flex flex-col gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">
                     <SiTicktick className='text-blue-600 text-xl'/>
                    </div>

                    <h3 className="text-xl font-semibold">Fast Attendance</h3>

                    <p className="text-gray-500 text-sm">
                    Mark attendance in just a few clicks with a srm
                    </p>
                </div>
          </MagicCard>

          <MagicCard className="z-[999] rounded-2xl p-5 shadow-sm w-[90%] md:w-[23%] transition-all duration-200 ease-in-out hover:-translate-y-[5px]">                
                <div className="flex flex-col gap-3">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                     <MdAutoGraph  className='text-2xl text-blue-600'/>
                    </div>

                    <h3 className="text-xl font-semibold">Predict CGPA</h3>

                    <p className="text-gray-500 text-sm">
                    Mark attendance in just a few clicks with a srm
                    </p>
                </div>
          </MagicCard>

          <MagicCard className="z-[999] rounded-2xl p-5 shadow-sm w-[90%] md:w-[23%] transition-all duration-200 ease-in-out hover:-translate-y-[5px]">
                <div className="flex flex-col gap-3">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                        <BsCalendar2Check  className='text-xl text-blue-600'/>
                    </div>

                    <h3 className="text-xl font-semibold">Easy to Mark</h3>

                    <p className="text-gray-500 text-sm">
                    Mark attendance in just a few clicks with a srm
                    </p>
                </div>
          </MagicCard>
            
      </div>
  )
}

export default Features
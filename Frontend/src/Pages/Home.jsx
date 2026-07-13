import Navbar from '@/components/Navbar/Navbar.jsx'
import { Button } from '@/components/ui/button'
import React from 'react'
import { useNavigate } from "react-router-dom";
import { RainbowButton } from '@/components/ui/rainbow-button'
import Features from '@/components/Features';
import { GiGraduateCap } from "react-icons/gi";
import { NeonGradientCard } from '@/components/ui/neon-gradient-card';
import Footer from '@/components/Footer';

const Home = () => {

    const navigate = useNavigate();

  return (

    <div>
        <Navbar/>

        <div className="flex-1 flex flex-col items-center justify-center text-center px-8 py-25">
            
            <Button
                variant="outline"
                className="h-8 rounded-full border border-blue-200 bg-blue-50 px-4 text-xs  text-blue-600 hover:bg-blue-100"
                >
                🎉  Made for Students
            </Button>
            <br />
                <p className="pointer-events-none z-10 h-full bg-linear-to-br from-[#09376c] from-35% to-[#08141e] bg-clip-text text-center text-5xl leading-none font-bold tracking-tighter text-balance whitespace-pre-wrap text-transparent md:text-5xl xl:text-6xl dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
                    Track Your
                </p>

                <span className="pointer-events-none z-10 h-full bg-linear-to-br from-[#0077ff] from-35% to-[#76bfff] bg-clip-text text-center text-5xl leading-none font-bold tracking-tighter text-balance whitespace-pre-wrap text-transparent md:text-5xl xl:text-6xl dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
                    Attendance
                </span>

                <p className="pointer-events-none z-10 h-full bg-linear-to-br from-[#09376c] from-35% to-[#0a141e] bg-clip-text text-center text-5xl leading-none font-bold tracking-tighter text-balance whitespace-pre-wrap text-transparent md:text-5xl xl:text-6xl dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
                    & CGPA
                </p>
                <br />
                 <p className=' font-semibold tracking-tight'>
                    AcadTrack helps you monitor your academic performance from one simple dashboard.
                </p>
                
            <br />
       
        <br />

        <div className="flex items-center gap-3">
            <RainbowButton className="inline-flex items-center justify-center px-4 py-5 rounded-md text-md font-semibold border-0 transition-all duration-200 ease-in-out hover:-translate-y-[1px]" onClick={() => navigate("/register")}>
                Get Started
            </RainbowButton>          
            <Button variant="outline" className='px-4 py-5 text-base' onClick={() => navigate("/login")}>
                Login
            </Button>
           
        </div>
        </div>

        <Features/>
        
        <NeonGradientCard className='mt-10'>
            <div className="flex-1 flex flex-col items-center justify-center text-center px-8 py-25">
            
            <div
                variant="outline"
                className="flex items-center justify-center rounded-full border border-blue-200 bg-linear-to-br from-[#1c428d] from-35% to-[#0a1827] p-3 hover:bg-blue-100"
                >
                <GiGraduateCap size={40} className='text-white'/>
            </div>
            <br />
                

            <p className="pointer-events-none z-10 h-full bg-linear-to-br from-[#09376c] from-35% to-[#0a141e] bg-clip-text text-center text-4xl leading-none font-bold tracking-tighter text-balance whitespace-pre-wrap text-transparent md:text-4xl xl:text-4xl dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
                Acad Track
            </p>

            <span className="pointer-events-none z-10 h-full bg-linear-to-br from-[#1e00ff] from-35% to-[#76bfff] bg-clip-text text-center text-xl leading-none font-bold tracking-tighter text-balance whitespace-pre-wrap text-transparent md:text-5xl xl:text-5xl dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
                Attendance & CGPA tracker
            </span>
            
            <br />
                <span className="font-semibold tracking-tight mt-5 leading-7 text-slate-600"> AcadTrack helps college students maintain their attendance and academics. Instead of repeatedly asking professors about attendance, students can track it in real time and ensure they stay above the mandatory <span className="font-semibold text-blue-600">75%</span> requirement. </span>
                <p className="mt-4 leading-7 text-slate-600"> It also keeps academic records organized, with an upcoming <span className="font-semibold text-blue-600"> CGPA Prediction </span> feature to help students plan and achieve their academic goals. </p>

            <br />

        <div className="flex items-center gap-3">
            <RainbowButton className="inline-flex items-center justify-center px-4 py-5 rounded-md text-md font-semibold border-0 transition-all duration-200 ease-in-out hover:-translate-y-[1px]" onClick={() => navigate("/register")}>
                Get Started 
            </RainbowButton>          
            <Button variant="outline" className='px-4 py-5 text-base' onClick={() => navigate("/login")}>
                Login
            </Button>
           
        </div>

        </div>
        </NeonGradientCard>

        <Footer/>
        
    </div>
  )
}

export default Home
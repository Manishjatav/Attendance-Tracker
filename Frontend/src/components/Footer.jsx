import React from 'react'

const Footer = () => {
  return (
    <div>
        <footer className="mt-24 z-[999] border-t border-slate-200 bg-white z-[999]">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 text-center md:flex-row">
                
                <div>
                <span className="pointer-events-none z-10 h-full bg-linear-to-br from-[#2d29ff] from-35% to-[#006eff] bg-clip-text text-center text-xl leading-none font-bold tracking-tighter text-balance whitespace-pre-wrap text-transparent md:text-3xl xl:text-xl dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
                        AcadTrack
                    </span>
                <p className="mt-1 text-sm text-slate-500">
                    Track Attendance. Stay Above 75%. Achieve Your Goals.
                </p>
                </div>

                <div className="flex items-center gap-6 text-sm text-slate-600">
                <a href="/" className="transition hover:text-blue-600">
                    Home
                </a>
                <a href="/" className="transition hover:text-blue-600">
                    About
                </a>
                <a href="/login" className="transition hover:text-blue-600">
                    Login
                </a>

                 <a href="mailto:manishjatav041@gmail.com" className="transition hover:text-blue-600">
                    Contact Us
                </a>
                </div>
            </div>

            <div className="relative z-[999] border-t border-slate-100 py-4 text-center text-sm text-slate-500">
                © {new Date().getFullYear()} AcadTrack. Built with ❤️ for students.
            </div>
        </footer>
    </div>

  )
}

export default Footer
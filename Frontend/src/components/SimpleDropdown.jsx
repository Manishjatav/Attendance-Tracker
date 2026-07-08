import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MdKeyboardArrowDown } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function SimpleDropdown() {
  const navigate = useNavigate();

  function removeSession() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 rounded-xl px-2 py-2 hover:bg-slate-100 transition cursor-pointer outline-none">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white font-semibold">
            S
          </div>

          <span className="font-medium text-slate-800">
            Student
          </span>

          <MdKeyboardArrowDown className="text-xl text-slate-500" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>

          <DropdownMenuItem onClick={() => navigate("/dashboard")}>
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <a href="mailto:manishjatav041@gmail.com">Help</a>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={removeSession}>
          Logout
          <FaArrowRight className="ml-auto" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
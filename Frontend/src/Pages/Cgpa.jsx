import { useState, useEffect } from "react";
import { ChevronDown, GraduationCap, Plus } from "lucide-react";
import Addsgpa from "@/components/Addsgpa";
import { MdDelete } from "react-icons/md";
import { toast } from "sonner"; 
import { PiGraduationCapLight } from "react-icons/pi";
import DashNav from "@/components/Navbar/DashNav";
import DialogDemo from "./DialogDemo";
import SubjectAttendance from "@/components/SubjectAttendance";


export default function Cgpa() {
  const [open, setOpen] = useState(false);
  const [semesters, setSemesters] = useState([]);
  const [cgpa, setCgpa] = useState(0);


  const fetchSemesters = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "/api/dashboard/cgpa",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setSemesters(data.semesters);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

 
  const calculateCgpa = () => {
    if (semesters.length === 0) {
      setCgpa(0);
      return;
    }

    const total = semesters.reduce(
      (sum, sem) => sum + sem.sgpa,
      0
  );

  setCgpa(Number((total / semesters.length).toFixed(2)));
  };

   
  useEffect(() => {
    fetchSemesters();
  }, []);


  useEffect(() => {
    calculateCgpa();
  },[semesters]);


  const deleteSemester = async (semesterId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this semester?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      
      const response = await fetch(`/dashboard/delete-semester/${semesterId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        window.location.reload();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
        <DashNav/>

        {/*containers  */}
        <div className='flex justify-center md:justify-center'>

          <div className="flex flex-col w-[90vw] md:w-[70vw] gap-4 mb-6">

               <div className="flex-col items-center justify-between rounded-2xl border border-slate-200 bg-white shadow-sm">

                  {/* Header */}
                  <div
                    onClick={() => setOpen(!open)}
                    className="flex items-center justify-between p-6 cursor-pointer"
                  >
                    <div className="flex items-center gap-5">
                      <div className="h-13 w-13 rounded-2xl bg-blue-100 flex items-center justify-center">
                        <GraduationCap className="text-blue-600" size={30} />
                      </div>

                      <div>
                        <span className="text-sm text-gray-800">Current CGPA</span>
                        <h1 className="text-3xl font-bold text-blue-600">{cgpa}</h1>
                        <p className="text-sm text-gray-400">
                          on a Scale of 10
                        </p>
                      </div>
                    </div>

                    <div
                      className={`h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center transition duration-300 ${
                        open ? "rotate-180" : ""
                      }`}
                    >
                      <ChevronDown className="text-indigo-600" />
                    </div>
                  </div>

                  {/* Expand */}
                  <div
                    className={`overflow-y-auto transition-all duration-500 ${
                      open ? "max-h-[500px]" : "max-h-0"
                    }`}
                  >
                    <div className="border-t">

                      <div className="flex items-center justify-between p-6">
                        <h2 className="text-xl font-semibold">Semester Details</h2>

                        <Addsgpa/>
                      </div>

                      <div className="px-8 pb-6">
                        <table className="w-full">

                            <thead className="border-b text-left text-gray-500">
                              <tr className="h-12">
                                <th>Semester</th>
                                <th>SGPA</th>
                              </tr>
                            </thead>

                            <tbody>
                              {semesters.map((item) => (
                                <tr
                                  key={item._id}
                                  className="h-14 border-b hover:bg-gray-50"
                                >
                                  <td className="font-medium">
                                    Semester {item.semester}
                                  </td>

                                  <td className="font-semibold text-indigo-600">
                                    {item.sgpa}
                                  </td>

                                  <td>
                                    <button
                                    onClick={() => deleteSemester(item._id)}
                                    >
                                    <MdDelete size={18}/>
                                  </button>
                                  </td>
                                  


                                </tr>
                              ))}
                            </tbody>

                        </table>
                      </div>

                    </div>
                  </div>

                </div>

          </div>

        </div>

    </div>
    

  );
}
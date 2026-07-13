import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

const Addsgpa = ({semNo = 1}) => {
  const [semester, setSemester] = useState("");
  const [sgpa, setSgpa] = useState("");
  const [loading, setLoading] = useState(false);

  const addSemester = async () => {
    // Validation
    if (!semester || !sgpa) {
      toast.error("Please fill all fields");
      return;
    }

    if (Number(sgpa) < 0 || Number(sgpa) > 10) {
      toast.error("SGPA must be between 0 and 10");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:4001/api/dashboard/add-semester",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            semester: Number(semester),
            sgpa: Number(sgpa),
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success("Semester added successfully");

        setSemester("");
        setSgpa("");

        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else {
        toast.info(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-xl bg-blue-600 hover:bg-blue-700">
          + Add Semester
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md rounded-3xl p-6">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            Add Semester
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          <div>
            <label className="mb-2 block font-medium">
              Semester
            </label>

            <Input
              type="number"
              min="1"
              placeholder="e.g. 4"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              SGPA
            </label>

            <Input
              type="number"
              min="1"
              max="10"
              step="0.01"
              placeholder="e.g. 8.45"
              value={sgpa}
              onChange={(e) => setSgpa(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button
            onClick={addSemester}
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 hover:bg-blue-700"
          >
            {loading ? "Adding..." : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Addsgpa;
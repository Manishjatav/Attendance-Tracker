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

const DialogDemo = () => {

  const [subjectName, setSubjectName] = useState("");

  const handleSubmit = async () => {

    if (!subjectName.trim()) {
      return toast.info("Welcome to AcadTrack");
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("/api/dashboard/add-subject", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          subjectName,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Login Successful");
        setSubjectName("");
      } else {
       toast.info(data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-xl bg-blue-600">
          + Add Subject
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md rounded-3xl p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Add Subject
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-3">
          <label className="font-medium">
            Subject Name
          </label>

          <Input
            placeholder="Enter Subject Name"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
          />
          
        </div>

        <DialogFooter className="flex">
          
          <Button
            onClick={() => {
              handleSubmit();
              window.location.reload();
            }}
            className="w-full rounded-xl bg-blue-500"
          >
            Submit
          </Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
};

export default DialogDemo;
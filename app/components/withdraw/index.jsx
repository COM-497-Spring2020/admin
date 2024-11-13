"use client";

import Confirmation from "@/app/components/common/confirmation";
import Dialog from "@/app/components/common/headlessui/Dialog";
import Input from "@/app/components/common/input/Input";
import Lists from "@/app/components/withdraw/Lists";
import TutorImage from "@/public/images/tutor.jpg";
import { useState } from "react";

const tutors = [
  {
    _id: 1,
    tutorName: "Arianne Kearns",
    tutorImage: TutorImage,
    requestMoney: 256,
  },
  {
    _id: 2,
    tutorName: "Arianne Kearns",
    tutorImage: TutorImage,
    requestMoney: 156,
  },
  {
    _id: 3,
    tutorName: "Arianne Kearns",
    tutorImage: TutorImage,
    requestMoney: 261,
  },
];

const Withdraw = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-x-5">
        <p className="text-2xl text-nowrap">{tutors.length} requests</p>
        <div className="w-full sm:w-4/12 ml-auto">
          <Input placeholder={"Search with name..."} />
        </div>
      </div>
      <Lists tutors={tutors} open={open} setOpen={setOpen} />
      <Dialog
        isOpen={open}
        setIsOpen={setOpen}
        dialogTitle={"Have you sent the money?"}
      >
        <Confirmation isOpen={open} setIsOpen={setOpen} />
      </Dialog>
    </div>
  );
};

export default Withdraw;

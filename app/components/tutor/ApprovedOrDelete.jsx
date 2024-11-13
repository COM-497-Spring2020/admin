"use client";

import Button1 from "@/app/components/common/button/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ApprovedOrDelete = ({ tutor }) => {
  const [isClicked, setIsClicked] = useState(false);
  const router = useRouter();

  async function isApprovedHandler(id) {
    setIsClicked(true);
    const response = await fetch("/api/tutors", {
      method: "PUT",
      body: JSON.stringify({ id }),
    });
    if (response.status === 200) {
      router.refresh();
      setIsClicked(false);
    }
  }

  async function isDeleteHandler(id) {
    setIsClicked(true);
    const response = await fetch("/api/tutors", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
    if (response.status === 200) {
      router.refresh();
      setIsClicked(false);
    }
  }

  return (
    <div className="flex items-center gap-2">
      {tutor.isApproved ? (
        <Button1
          title={"Approved"}
          className={"!bg-green-400 hover:!bg-green-500"}
          onClick={() => isApprovedHandler(tutor._id)}
          isClicked={isClicked}
        />
      ) : (
        <Button1
          title={"Approve"}
          onClick={() => isApprovedHandler(tutor._id)}
          isClicked={isClicked}
        />
      )}
      <Button1
        title={"Delete"}
        className={"bg-red-400 hover:bg-red-500"}
        onClick={() => isDeleteHandler(tutor.user)}
        isClicked={isClicked}
      />
    </div>
  );
};

export default ApprovedOrDelete;

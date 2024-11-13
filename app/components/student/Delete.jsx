"use client";

import Button1 from "@/app/components/common/button/Button";
import { useRouter } from "next/navigation";

const ApprovedOrDelete = ({ student }) => {
  const router = useRouter();

  async function isDeleteHandler(id) {
    const response = await fetch("/api/student", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
    if (response.status === 200) {
      router.refresh();
    }
  }

  return (
    <Button1
      title={"Delete"}
      className={"bg-red-400 hover:bg-red-500"}
      onClick={() => isDeleteHandler(student._id)}
    />
  );
};

export default ApprovedOrDelete;

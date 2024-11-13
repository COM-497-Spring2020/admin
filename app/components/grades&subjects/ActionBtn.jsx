"use client";

import { update } from "@/app/lib/store/features/gradeSlice";
import { useAppDispatch } from "@/app/lib/store/hook";
import { Edit, Trash } from "lucide-react";
import { useRouter } from "next/navigation";

const ActionBtn = ({ title, sub }) => {
  const baseUrl = title === "Grades" ? "/api/grade" : "/api/subject";

  const dispatch = useAppDispatch();

  const router = useRouter();

  const deleteHandler = async () => {
    const response = await fetch(baseUrl, {
      method: "DELETE",
      body: JSON.stringify({ id: sub._id }),
    });
    if (response.status === 200) {
      router.refresh();
    }
  };

  return (
    <div className="flex items-center gap-x-5">
      <Edit
        className="cursor-pointer text-secondary"
        onClick={() => dispatch(update({ id: sub._id, item: sub.item }))}
      />
      <Trash className="cursor-pointer text-red-400" onClick={deleteHandler} />
    </div>
  );
};

export default ActionBtn;

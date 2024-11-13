"use client";

import Button from "@/app/components/common/button/Button";
import Input from "@/app/components/common/input/Input";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Percentage = ({ tutor }) => {
  const [percentage, setPercentage] = useState("");
  const [success, setSuccess] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const router = useRouter();

  async function percentageHandler() {
    setIsClicked(true);
    const response = await fetch("/api/tutors", {
      method: "POST",
      body: JSON.stringify({ id: tutor._id, percentage }),
    });
    if (response.status === 200) {
      router.refresh();
      setSuccess("Updated!");
      setTimeout(() => {
        setSuccess("");
      }, 3000);
    }
    setIsClicked(false);
  }

  useEffect(() => {
    if (!percentage) {
      setPercentage(tutor.percentage);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="flex items-center gap-2">
        <Input
          placeholder={"Percentage number like 10"}
          type="number"
          value={percentage}
          changeHandler={(event) => setPercentage(event.target.value)}
        />
        <Button
          title={"Update"}
          className={"!w-24"}
          onClick={percentageHandler}
          isClicked={isClicked}
        />
      </div>
      {success && <p className="text-green-400 text-center">{success}</p>}
    </div>
  );
};

export default Percentage;

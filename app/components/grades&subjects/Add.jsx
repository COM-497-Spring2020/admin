"use client";

import Button1 from "@/app/components/common/button/Button";
import Input from "@/app/components/common/input/Input";
import { update } from "@/app/lib/store/features/gradeSlice";
import { useAppDispatch, useAppSelector } from "@/app/lib/store/hook";
import { gradeSubjectSchema } from "@/app/lib/validations/gradeSubject";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AddGrade = ({ title }) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState({
    item: "",
    message: "",
  });

  const [isClicked, setIsClicked] = useState(false);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const { item, id } = useAppSelector((store) => store.grade);

  const isUpdate = id && item ? true : false;

  useEffect(() => {
    setValue(item);
  }, [item]);

  const changeHandler = (event) => {
    setValue(event.target.value);
    setError({ ...error, item: "" });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setIsClicked(true);
    setError({
      item: "",
      message: "",
    });
    const baseUrl = title === "Grades" ? "/api/grade" : "/api/subject";
    try {
      gradeSubjectSchema.parse({ item: value });
      const response = await fetch(baseUrl, {
        method: isUpdate ? "PUT" : "POST",
        body: JSON.stringify({
          id: id,
          item: value,
        }),
      });
      setIsClicked(false);
      if (response.status === 200) {
        setValue("");
        dispatch(update({ id: "", item: "" }));
        router.refresh();
      } else {
        setError(await response.json());
      }
    } catch (errors) {
      setIsClicked(false);
      const formattedErrors = errors?.issues?.reduce((acc, error) => {
        acc[error.path[0]] = error.message;
        return acc;
      }, {});
      setError(formattedErrors);
    }
  };

  return (
    <form
      className="space-y-5 bg-white rounded shadow-sm p-5"
      onSubmit={submitHandler}
    >
      <div>
        <Input
          placeholder={`Write a ${title}`}
          changeHandler={changeHandler}
          value={value}
        />
        {error.item && <p className="text-red-400 text-left">{error.item}</p>}
      </div>
      <Button1 title={isUpdate ? "Save" : "Add"} isClicked={isClicked} />
      {error.message && (
        <p className="text-red-400 text-center">{error.message}</p>
      )}
    </form>
  );
};

export default AddGrade;

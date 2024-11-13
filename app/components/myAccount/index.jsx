"use client";

import Button1 from "@/app/components/common/button/Button";
import Input from "@/app/components/common/input/Input";
import {
  chargeChangeSchema,
  passwordChangeSchema,
} from "@/app/lib/validations/auth";
import { useEffect, useState } from "react";

const Index = () => {
  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [platformCharge, setPlatformCharge] = useState();
  const [platformChargeSuccess, setPlatformChargeSuccess] = useState("");
  const [platformChargeError, setPlatformChargeError] = useState("");

  const [changeSuccess, setChangeSuccess] = useState("");

  const [userError, setUserError] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    message: "",
  });

  const [isClicked, setIsClicked] = useState(false);

  const changeHandler = async (event) => {
    setPassword({
      ...password,
      [event.target.name]: event.target.value,
    });
    setUserError({
      ...userError,
      [event.target.name]: "",
    });
  };

  useEffect(() => {
    async function fetchAccount() {
      if (!platformCharge) {
        const response = await fetch("/api/auth", {
          method: "GET",
        });
        const result = await response.json();
        setPlatformCharge(result.platformCharge);
      }
    }
    fetchAccount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitHandler = async () => {
    setIsClicked(true);
    setUserError({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      message: "",
    });
    setChangeSuccess("");
    try {
      passwordChangeSchema.parse(password);
      if (password.confirmPassword === password.newPassword) {
        const response = await fetch(`/api/auth`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(password),
        });
        setIsClicked(false);
        if (response.status === 200) {
          const message = await response.json();
          setChangeSuccess(message.message);
          setPassword({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
        } else {
          setUserError(await response.json());
        }
      } else {
        setIsClicked(false);
        setUserError({
          ...userError,
          message: "New password and confirm password don't match!",
        });
      }
    } catch (errors) {
      setIsClicked(false);
      const formattedErrors = errors?.issues?.reduce((acc, error) => {
        acc[error.path[0]] = error.message;
        return acc;
      }, {});
      setUserError(formattedErrors);
    }
  };

  const sumitChargeHandler = async () => {
    setIsClicked(true);
    setPlatformChargeError("");
    setPlatformChargeSuccess("");
    try {
      chargeChangeSchema.parse({ platformCharge });
      const response = await fetch(`/api/auth`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ platformCharge }),
      });
      setIsClicked(false);
      const { message } = await response.json();
      if (response.status === 200) {
        setPlatformChargeSuccess(message);
      } else {
        setPlatformChargeError(message);
      }
      setTimeout(() => {
        setPlatformChargeError("");
        setPlatformChargeSuccess("");
      }, 3000);
    } catch (errors) {
      setIsClicked(false);
      const formattedErrors = errors?.issues?.reduce((acc, error) => {
        acc[error.path[0]] = error.message;
        return acc;
      }, {});
      setPlatformChargeError(formattedErrors.platformCharge);
    }
  };

  return (
    <div className="bg-white rounded shadow-sm p-5 overflow-x-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 items-end gap-10">
        <div className="space-y-5">
          <p className="text-xl">Admin Password</p>
          <div>
            <Input
              placeholder="Current password"
              name={"currentPassword"}
              changeHandler={changeHandler}
              value={password.currentPassword}
            />
            {userError.currentPassword && (
              <p className="text-red-400 text-left">
                {userError.currentPassword}
              </p>
            )}
          </div>
          <div>
            <Input
              placeholder="New password"
              name={"newPassword"}
              changeHandler={changeHandler}
              value={password.newPassword}
            />
            {userError.newPassword && (
              <p className="text-red-400 text-left">{userError.newPassword}</p>
            )}
          </div>
          <div>
            <Input
              placeholder="Confirm password"
              name={"confirmPassword"}
              changeHandler={changeHandler}
              value={password.confirmPassword}
            />
            {userError.confirmPassword && (
              <p className="text-red-400 text-left">
                {userError.confirmPassword}
              </p>
            )}
          </div>
          <Button1
            title={"Change"}
            onClick={submitHandler}
            isClicked={isClicked}
          />
          {userError.message && (
            <p className="text-red-400 text-center">{userError.message}</p>
          )}
          {changeSuccess && (
            <p className="text-green-400 text-center">{changeSuccess}</p>
          )}
        </div>
        <div className="space-y-5">
          <p className="text-xl">Commission for tutors</p>
          <small className="text-gray-500">{`Enter a percentage number like 10, which means the admin gets 10%  commission from each student's booking.`}</small>
          <Input
            placeholder="10"
            type="number"
            value={platformCharge}
            changeHandler={(event) => setPlatformCharge(event.target.value)}
          />
          <Button1
            title={"Save"}
            onClick={sumitChargeHandler}
            isClicked={isClicked}
          />
          {platformChargeError && (
            <p className="text-red-400 text-center">{platformChargeError}</p>
          )}
          {platformChargeSuccess && (
            <p className="text-green-400 text-center">
              {platformChargeSuccess}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;

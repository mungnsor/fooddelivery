"use client";
import { LeftIcon } from "@/app/icons/leftIcon";
import { useState } from "react";
import { FormInput } from "../components/formInput";
import Link from "next/link";
const checkEmailHasSpecial = (string) => {
  return /[!#$%^&*()_+=?""{};:<>]/.test(string);
};

export const Step1 = ({ catchToken, setCatchToken, setStep, step }) => {
  const [errorState, setErrorState] = useState({ email: "" });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCatchToken((prev) => ({ ...prev, [name]: value }));

    if (name === "email") {
      if (checkEmailHasSpecial(value)) {
        setErrorState((prev) => ({
          ...prev,
          email: "Invalid email format.",
        }));
      } else {
        setErrorState((prev) => ({ ...prev, email: "" }));
      }
    }
  };

  const handleNextStep = () => {
    if (errorState.email) return;
    setStep(step + 1);
  };
  const disabled = catchToken.email.length === 0 || errorState.email.length > 0;
  return (
    <div className="w-full h-full">
      <div className="w-full flex justify-evenly m-auto  py-5 items-center">
        <div className="w-104 h-72 flex flex-col justify-between">
          <div>
            <button className="w-9 h-9 border flex justify-center items-center">
              <LeftIcon />
            </button>
          </div>
          <div className="h-15 w-full flex flex-col justify-between">
            <p className="h-8 text-[23px] font-medium "> Create your account</p>
            <p className="h-6 text-[17px] text-[#848282]">
              Sign up to explore your favorite dishes.
            </p>
          </div>
          <FormInput
            handleChange={handleInputChange}
            name={"email"}
            value={catchToken.email}
            errors={errorState.email}
            errorsMess={"Invalid email. Use a format like example@email.com."}
            place={"Enter your email address"}
          />

          <button
            className="h-9 w-full bg-gray-200 text-white flex justify-center items-center hover:bg-black"
            disabled={disabled}
            onClick={handleNextStep}
          >
            Lets go
          </button>

          <div
            className="flex justify-between
              "
          >
            <p>Already have an account ?</p>
            <Link href={"/login"}>
              <p className="text-blue-300">Log in</p>
            </Link>
          </div>
        </div>
        <div className="w-214 h-250">
          <img className="w-full h-full" src="./delivery.jpg" />
        </div>
      </div>
    </div>
  );
};

"use client";
import { useState } from "react";
import { FormInput } from "../components/formInput";
import { LeftIcon } from "@/app/icons/leftIcon";
import Link from "next/link";

const validatePassword = (password) => {
  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[!@#$%^&*()\-_=+<>/?]/.test(password)
  );
};

export const Step2 = ({
  handleBackStep,
  catchToken,
  setCatchToken,
  handleSignup,
}) => {
  const [errorState, setErrorState] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCatchToken((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const errors = {};

    if (!validatePassword(catchToken.password)) {
      errors.password = "weak";
    }

    if (catchToken.Confirmpassword !== catchToken.password) {
      errors.Confirmpassword = "mismatch";
    }

    setErrorState(errors);

    if (Object.keys(errors).length === 0) {
      await handleSignup();
    }
  };
  return (
    <div className="w-full h-full">
      <div className="w-full flex justify-evenly m-auto py-5 items-center">
        <div className="w-104 h-82 flex flex-col gap-5">
          <div>
            <button
              className="w-9 h-9 border flex justify-center items-center"
              onClick={handleBackStep}
            >
              <LeftIcon />
            </button>
          </div>

          <div className="h-15 w-full flex flex-col justify-between">
            <p className="text-[23px] font-medium">Create a strong password</p>
            <p className="text-[17px] text-[#848282]">
              Create a strong password with letters, numbers.
            </p>
          </div>

          <FormInput
            handleChange={handleInputChange}
            name="password"
            value={catchToken.password}
            errors={errorState.password}
            errorsMess="Password is too weak"
            place="Password"
          />

          <FormInput
            handleChange={handleInputChange}
            name="Confirmpassword"
            value={catchToken.Confirmpassword}
            errors={errorState.Confirmpassword}
            errorsMess="Passwords do not match"
            place="Confirm password"
          />

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              onChange={(e) => {
                const type = e.target.checked ? "text" : "password";
                document.querySelector('input[name="password"]').type = type;
                document.querySelector('input[name="Confirmpassword"]').type =
                  type;
              }}
            />
            <p className="text-[17px] text-[#848282]">Show password</p>
          </div>

          <div className="flex flex-col gap-4 mt-3">
            <button
              className={`rounded-lg h-11 text-[16px] font-medium w-[416px] ${
                catchToken.password.length === 0 ||
                catchToken.Confirmpassword.length === 0
                  ? "bg-gray-300 "
                  : "bg-black text-white cursor-pointer"
              }`}
              onClick={handleSubmit}
              disabled={
                catchToken.password.length === 0 ||
                catchToken.Confirmpassword.length === 0
              }
            >
              Let's go
            </button>

            <div className="flex justify-between">
              <p>Already have an account?</p>
              <Link href="/login">
                <p className="text-blue-300">Log in</p>
              </Link>
            </div>
          </div>
        </div>

        <div className="w-214 h-250">
          <img className="w-full h-full" src="./delivery.jpg" />
        </div>
      </div>
    </div>
  );
};

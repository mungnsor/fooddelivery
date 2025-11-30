"use client";
import { LeftIcon } from "@/app/icons/leftIcon";
import { useState } from "react";
import { FormInput } from "../components/formInput";
import Link from "next/link";
const checkEmailHasSpecial = (string) => {
  return /[!#$%^&*()_+=?""{};:<>]/.test(string);
};
const check = (string) => {
  return /[%]/.test(string);
};
export const StepTwo1 = () => {
  const backend_url = process.env.PUBLIC_BACKEND_URL;
  const [errorState, setErrorState] = useState({});
  const [catchToken, setCatchToken] = useState({ email: "" });
  const handleInputChange = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    setCatchToken({ ...catchToken, [inputName]: inputValue });
  };
  const stringObject = JSON.stringify(catchToken);
  const object = JSON.parse(stringObject);
  const validateInput = () => {
    const errors = {};
    if (!formValues.Email) {
      errors.Email = "email";
    } else if (checkEmailHasSpecial(formValues.Email)) {
      errors.Email = "email";
    } else if (check(formValues.Email)) {
      errors.Email = "email";
    }
  };
  const handleLogin = async () => {
    console.log(catchToken, "asd");

    try {
      const res = await fetch(`${backend_url}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          email: catchToken.email,
        }),
      });

      const data = await res.json();
      console.log(data, "hehehehh");

      const token = data.token;
      {
        localStorage.setItem("token", data.token);
        window.location.href = "/";
      }

      setCatchToken;
    } catch (err) {
      console.log(err);
    }
  };
  const disabled = () => {
    return catchToken.email === 0;
  };
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
          <Link href={"/login"}>
            <button
              className="h-9 w-full bg-gray-200 text-white flex justify-center items-center hover:bg-black"
              disabled={disabled()}
              onClick={handleLogin}
            >
              Lets go
            </button>
          </Link>
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

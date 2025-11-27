"use client";
import { useState } from "react";
import { LeftIcon } from "@/app/icons/leftIcon";
import { FormInput } from "@/app/signup/components/formInput";
import Link from "next/link";
const checkPassword = (string) => {
  return /[!^()-+=:;""?/<>|%]/.test(string);
};
const checkEmailHasSpecial = (string) => {
  return /[!#$%^&*()_+=?""{};:<>]/.test(string);
};
const check = (string) => {
  return /[%]/.test(string);
};
export const Login = (props) => {
  const [catchToken, setCatchToken] = useState({ email: "", password: "" });

  const handleLogin = async () => {
    console.log(catchToken, "asd");

    try {
      const res = await fetch("http://localhost:8000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          email: catchToken.email,
          password: catchToken.password,
        }),
      });

      const data = await res.json();
      console.log(data, "hehehe");

      const token = data.token;
      {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
        window.location.href = "/";
      }

      setCatchToken;
    } catch (err) {
      console.log(err);
    }
  };
  const [errorState, setErrorState] = useState({});
  const stringObject = JSON.stringify(catchToken);
  const object = JSON.parse(stringObject);
  const handleInputChange = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    setCatchToken({ ...catchToken, [inputName]: inputValue });
  };
  const validateInput = () => {
    const errors = {};
    if (!catchToken.email) {
      errors.email = "email";
    } else if (checkEmailHasSpecial(catchToken.email)) {
      errors.email = "email";
    } else if (check(formValues.Email)) {
      errors.email = "email";
    }
    if (!catchToken.password) {
      errors.password = "password";
    } else if (checkPassword(catchToken.password)) {
      errors.password = "password";
    }
    return errors;
  };
  const disabled = () => {
    return catchToken.email === 0 || catchToken.password === 0;
  };
  return (
    <div className="w-full h-full ">
      <div className="w-full flex justify-evenly m-auto  py-5 items-center">
        <div className="w-104 h-82 flex flex-col gap-5">
          <div>
            <Link href={"/"}>
              <button className="w-9 h-9 border flex justify-center items-center">
                <LeftIcon />
              </button>
            </Link>
          </div>
          <div className="h-15 w-full flex flex-col justify-between">
            <p className="h-8 text-[23px] font-medium "> Log In</p>
            <p className="h-6 text-[17px] text-[#848282]">
              Log in to enjoy your favorite dishes.
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

          <FormInput
            handleChange={handleInputChange}
            name={"password"}
            value={catchToken.password}
            errors={errorState.password}
            errorsMess={"Incorrect password. Please try again."}
            place={"Password"}
          />
          <div className="  flex justify-center mt-15 flex-col  gap-4">
            <p>Forgot password ?</p>
            <button
              className=" bg-black text-white  rounded-lg h-11 cursor-pointer text-[16px] font-medium w-[416px]"
              onClick={handleLogin}
              disabled={disabled()}
            >
              Lets go
            </button>
            <div
              className="flex justify-between
              "
            >
              <p>Dont have an account?</p>
              <Link href={"/signup"}>
                <p className="text-blue-300">Sign Up</p>
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

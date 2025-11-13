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
const addStepOneValuesToLocalStorages = (values) => {
  localStorage.setItem("stepTwo", JSON.stringify(values));
};
export const StepTwo2 = (props) => {
  const { handleBackStep } = props;
  const [errorState, setErrorState] = useState({});
  const getStepOneValuesFromLocalStorages = () => {
    const values = localStorage.getItem("stepTwo2");
    if (values) {
      return JSON.parse(values);
    } else {
      return {
        Email: "",
      };
    }
  };
  const handleInputChange = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    setFormValues({ ...formValues, [inputName]: inputValue });
  };
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
  const [formValues, setFormValues] = useState({
    getStepOneValuesFromLocalStorages,
  });
  // const handleSubmit = async () => {
  //   try {
  //     const res = await fetch("http://localhost:8000/users/createUser", {
  //       method: "POST",
  //       headers: {
  //         "content-type": "application/json",
  //         accept: "application/json",
  //       },
  //       body: JSON.stringify({
  //         email: email,
  //       }),
  //     });

  //     const { token } = await res.json();

  //     localStorage.setItem("token", token);
  //     router.push("/");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  const handleContinueButton = () => {
    const errors = validateInput();
    if (Object.keys(errors).length === 0) {
      setErrorState({});
      addStepOneValuesToLocalStorages(formValues);
      handleNextStep();
    } else {
      setErrorState(errors);
    }
  };
  const disabled = () => {
    return formValues.Email === 0 || formValues.Password === 0;
  };
  return (
    <div className="w-full h-full">
      <div className="w-[1440px] flex justify-evenly m-auto bg-gray-50 py-5 items-center">
        <div className="w-104 h-72 flex flex-col justify-between">
          <div>
            <button
              className="w-9 h-9 border flex justify-center items-center"
              onClick={handleBackStep}
            >
              <LeftIcon />
            </button>
          </div>
          <div className="h-15 w-full flex flex-col justify-between">
            <p className="h-8 text-[23px] font-medium "> Create your account</p>
            <p className="h-6 text-[17px] text-[#848282]">
              Sign up to explore your favorite dishes.
            </p>
          </div>
          {/* <div className="h-9 w-full flex flex-col justify-between">
            <input
              id="email"
              type="email"
              placeholder="Enter your email address"
              className="w-full border h-9 rounded-md px-2"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div> */}
          <FormInput
            handleChange={handleInputChange}
            name={"Email"}
            value={formValues.Email}
            errors={errorState.Email}
            errorsMess={"Invalid email. Use a format like example@email.com."}
            place={"Enter your email address"}
          />
          <button
            className="h-9 w-full bg-gray-200 text-white flex justify-center items-center hover:bg-black"
            disabled={disabled()}
            onClick={handleContinueButton}
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
        <div className="w-214 h-226">
          <img className="w-full h-full" src="./delivery.jpg" />
        </div>
      </div>
    </div>
  );
};

"use client";
import { useState } from "react";
import { FormInput } from "../components/formInput";
import { LeftIcon } from "@/app/icons/leftIcon";
import Link from "next/link";
const checkPassword = (string) => {
  return /[!^()-+=:;""?/<>|%]/.test(string);
};
const addStepOneValuesToLocalStorages = (values) => {
  localStorage.setItem("stepTwo", JSON.stringify(values));
};
export const StepOne2 = (props) => {
  const { handleBackStep } = props;
  const { handleNextStep } = props;
  const getStepOneValuesFromLocalStorages = () => {
    const values = localStorage.getItem("stepTwo2");
    if (values) {
      return JSON.parse(values);
    } else {
      return {
        Password: "",
        Confirmpassword: "",
      };
    }
  };
  const [formValues, setFormValues] = useState({
    getStepOneValuesFromLocalStorages,
  });
  const [errorState, setErrorState] = useState({});
  const stringObject = JSON.stringify(formValues);
  const object = JSON.parse(stringObject);
  const handleInputChange = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    setFormValues({ ...formValues, [inputName]: inputValue });
  };

  const validateInput = () => {
    const errors = {};
    if (!formValues.Confirmpassword) {
      errors.Confirmpassword = "confirm";
    } else if (formValues.Confirmpassword !== formValues.Password) {
      errors.Confirmpassword = "passwords";
    }
    if (!formValues.Password) {
      errors.Password = "password";
    } else if (checkPassword(formValues.Password)) {
      errors.Password = "password";
    }
    return errors;
  };
  const handleContinueButton = () => {
    const errors = validateInput();
    if (Object.keys(errors).length === 0) {
      setErrorState({});
      addStepOneValuesToLocalStorages(formValues);
      handleBackStep();
      handleNextStep();
    } else {
      setErrorState(errors);
    }
  };
  const disabled = () => {
    return formValues.Email === 0 || formValues.Password === 0;
  };
  return (
    <div className="w-full h-full ">
      <div className="w-full flex justify-evenly m-auto  py-5 items-center">
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
            <p className="h-8 text-[23px] font-medium ">
              {" "}
              Create a strong passsword
            </p>
            <p className="h-6 text-[17px] text-[#848282]">
              Create a strong password with letters, numbers.
            </p>
          </div>
          <FormInput
            handleChange={handleInputChange}
            name={"Password"}
            value={formValues.Password}
            errors={errorState.Password}
            errorsMess={"Please provide a valid email address."}
            place={"Password"}
          />

          <FormInput
            handleChange={handleInputChange}
            name={"Confirmpassword"}
            value={formValues.Confirmpassword}
            errors={errorState.Confirmpassword}
            errorsMess={"Those password didnt match, Try again"}
            place={"Confirm"}
          />
          <div className="  flex justify-center mt-15 flex-col  gap-4">
            <button
              className=" bg-black text-white  rounded-lg h-11 cursor-pointer text-[16px] font-medium w-[416px]"
              // onClick={handleContinueButton}
              onClick={handleNextStep}
              disabled={disabled()}
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
        </div>
        <div className="w-214 h-250">
          <img className="w-full h-full" src="./delivery.jpg" />
        </div>
      </div>
    </div>
  );
};

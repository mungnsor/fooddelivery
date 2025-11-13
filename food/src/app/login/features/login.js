// "use client";
// import { useState } from "react";
// import { useRouter } from "next/router";
// import { LeftIcon } from "@/app/icons/leftIcon";
// import Link from "next/link";
// const checkEmailHasSpecial = (string) => {
//   return /[!#$%^&*()_+=?""{};:<>]/.test(string);
// };
// const checkPassword = (string) => {
//   return /[!^()-+=:;""?/<>|%]/.test(string);
// };
// const emailKey = (string) => {
//   return /[@]/.test(string);
// };
// export const Login = () => {
//   const router = useRouter;
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorState, setErrorState] = useState({});
//   const validateInput = () => {
//     const errors = {};
//     if (!formValues.Email) {
//       errors.Email = "email";
//     } else if (checkEmailHasSpecial(formValues.Email)) {
//       errors.Email = "email";
//     } else if (check(formValues.Email)) {
//       errors.Email = "email";
//     }
//   };
//   const handleSubmit = async () => {
//     try {
//       const res = await fetch("http://localhost:8000/users/login", {
//         method: "POST",
//         headers: {
//           "content-type": "application/json",
//           accept: "application/json",
//         },
//         body: JSON.stringify({
//           email: email,
//           password: password,
//         }),
//       });

//       const { token } = await res.json();

//       localStorage.setItem("token", token);
//       router.push("/");
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   return (
//     <div className="w-full h-full">
//       <div className="w-[1440px] flex justify-evenly m-auto bg-gray-50 py-5 items-center">
//         <div className="w-104 h-94 flex flex-col justify-between">
//           <div>
//             <button className="w-9 h-9 border flex justify-center items-center">
//               <LeftIcon />
//             </button>
//           </div>
//           <div className="h-15 w-full flex flex-col justify-between">
//             <p className="h-8 text-[23px] font-medium ">Log in</p>
//             <p className="h-6 text-[17px] text-[#848282]">
//               Log in to enjoy favorite dishes
//             </p>
//           </div>
//           <div className="h-31 w-full flex flex-col justify-between">
//             <input
//               id="email"
//               type="email"
//               placeholder="Enter your email address"
//               className="w-full border h-9 rounded-md px-2"
//               value={email}
//               onChange={(e) => {
//                 setEmail(e.target.value);
//               }}
//             />

//             <input
//               id="password"
//               type="password"
//               placeholder="Password"
//               className="w-full border h-9 rounded-md px-2"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />

//             <p className="h-9 items-end flex ml-1">Forgot password ?</p>
//           </div>
//           <button
//             className="h-9 w-full bg-gray-200 text-white flex justify-center items-center hover:bg-black"
//             onClick={handleSubmit}
//           >
//             Lets go
//           </button>
//           <div
//             className="flex justify-between
//           "
//           >
//             <p>Dont have an account?</p>
//             <Link href={"/signup"}>
//               <p className="text-blue-300">Sign Up</p>
//             </Link>
//           </div>
//         </div>
//         <div className="w-214 h-226">
//           <img className="w-full h-full" src="./delivery.jpg" />
//         </div>
//       </div>
//     </div>
//   );
// };
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
const addStepOneValuesToLocalStorages = (values) => {
  localStorage.setItem("stepTwo", JSON.stringify(values));
};
export const Login = (props) => {
  // const { handleNextStep } = props;
  // const { handleBackStep } = props;
  const getStepOneValuesFromLocalStorages = () => {
    const values = localStorage.getItem("stepTwo2");
    if (values) {
      return JSON.parse(values);
    } else {
      return {
        Password: "",
        Email: "",
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
    if (!formValues.Email) {
      errors.Email = "email";
    } else if (checkEmailHasSpecial(formValues.Email)) {
      errors.Email = "email";
    } else if (check(formValues.Email)) {
      errors.Email = "email";
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
      // handleNextStep();
    } else {
      setErrorState(errors);
    }
  };
  const disabled = () => {
    return formValues.Email === 0 || formValues.Password === 0;
  };
  return (
    <div className="w-full h-full ">
      <div className="w-[1440px] flex justify-evenly m-auto bg-gray-50 py-5 items-center">
        <div className="w-104 h-82 flex flex-col gap-5">
          <div>
            <button
              className="w-9 h-9 border flex justify-center items-center"
              // onClick={handleBackStep}
            >
              <LeftIcon />
            </button>
          </div>
          <div className="h-15 w-full flex flex-col justify-between">
            <p className="h-8 text-[23px] font-medium "> Log In</p>
            <p className="h-6 text-[17px] text-[#848282]">
              Log in to enjoy your favorite dishes.
            </p>
          </div>
          <FormInput
            handleChange={handleInputChange}
            name={"Email"}
            value={formValues.Email}
            errors={errorState.Email}
            errorsMess={"Invalid email. Use a format like example@email.com."}
            place={"Enter your email address"}
          />

          <FormInput
            handleChange={handleInputChange}
            name={"Password"}
            value={formValues.Password}
            errors={errorState.Password}
            errorsMess={"Incorrect password. Please try again."}
            place={"Password"}
          />
          <div className="  flex justify-center mt-15 flex-col  gap-4">
            <p>Forgot password ?</p>
            <button
              className=" bg-black text-white  rounded-lg h-11 cursor-pointer text-[16px] font-medium w-[416px]"
              onClick={handleContinueButton}
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
        <div className="w-214 h-226">
          <img className="w-full h-full" src="./delivery.jpg" />
        </div>
      </div>
    </div>
  );
};

"use client";
import { useState } from "react";
import { Step1 } from "./features/step1";
import { Step2 } from "./features/step2";

export default function Home() {
  const backend_url = process.env.PUBLIC_BACKEND_URL;
  const [step, setStep] = useState(1);
  const [catchToken, setCatchToken] = useState({
    name: "",
    email: "",
    password: "",
    Confirmpassword: "",
    phone: "",
    address: "",
  });
  const handleBackStep = () => {
    if (step > 1) setStep(step - 1);
  };
  const handleSignup = async () => {
    try {
      const res = await fetch(`${backend_url}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(catchToken),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token || "demo-token");
        window.location.href = "/";
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <>
      {step === 1 && (
        <Step1
          catchToken={catchToken}
          setCatchToken={setCatchToken}
          setStep={setStep}
          step={step}
        />
      )}

      {step === 2 && (
        <Step2
          catchToken={catchToken}
          setCatchToken={setCatchToken}
          handleBackStep={handleBackStep}
          handleSignup={handleSignup}
        />
      )}
    </>
  );
}

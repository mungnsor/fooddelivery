"use client";
import { useState } from "react";
import { StepOne1 } from "./features/stepone";
import { StepTwo2 } from "./features/steptwo";
export default function Home() {
  const [step, setStep] = useState(1);
  const handleNextStep = () => {
    setStep(step + 1);
  };
  const handleBackStep = () => {
    if (step === 1) {
      return;
    } else {
      setStep(step - 1);
    }
  };
  return (
    <>
      {step === 2 && (
        <StepTwo2
          handleNextStep={handleNextStep}
          handleBackStep={handleBackStep}
        />
      )}
      {step === 1 && (
        <StepOne1
          // handleBackStep={handleBackStep}
          handleNextStep={handleNextStep}
        />
      )}
    </>
  );
}

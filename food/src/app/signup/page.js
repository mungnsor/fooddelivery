"use client";
import { useState } from "react";
import { StepOne2 } from "./features/stepone";
import { StepTwo1 } from "./features/steptwo";
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
      {step === 1 && (
        <StepTwo1
          handleNextStep={handleNextStep}
          handleBackStep={handleBackStep}
        />
      )}
      {step === 2 && (
        <StepOne2
          // handleBackStep={handleBackStep}
          handleNextStep={handleNextStep}
        />
      )}
    </>
  );
}

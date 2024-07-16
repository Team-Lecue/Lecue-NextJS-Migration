"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Home from "../Home/page";
import SplashPage from "../Splash/page/SplashPage";

function SelectView() {
  const searchParams = useSearchParams();
  const stepValue = searchParams.get("step");
  const [step, setStep] = useState(stepValue ? Number(stepValue) : 0);
  const [isLogin, setIsLogin] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = sessionStorage.getItem("token");
      setIsLogin(token);

      sessionStorage.removeItem("name");
      sessionStorage.removeItem("image");
    }
  }, []);

  const handleStep = (newStep: number) => {
    setStep(newStep);
  };

  return !isLogin ? (
    <SplashPage handleStep={handleStep} />
  ) : (
    <Home handleStep={handleStep} />
  );
}

export default SelectView;

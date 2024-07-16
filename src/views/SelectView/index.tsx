"use client";

import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
const Home = dynamic(() => import("../Home/page"), { ssr: false });
const SplashPage = dynamic(() => import("../Splash/page/SplashPage"), {
  ssr: false,
});

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

  return !isLogin && step === 0 ? (
    <SplashPage handleStep={handleStep} />
  ) : (
    <Home handleStep={handleStep} />
  );
}

export default SelectView;

"use client";

import LoadingPage from "@/views/LoadingPage";
import { useEffect, useState } from "react";
import { StepProps } from "../../Splash/page/SplashPage";
import HomeMainBanner from "../components/HomeMainBanner";
import LecueBookList from "../components/LecueBookList";
import useGetLecueBook from "../hooks/useGetLecueBook";
import * as S from "./Home.style";

function Home({ handleStep }: StepProps) {
  const [isLogin, setIsLogin] = useState<string | null>(null);

  const { isLoading: isLoadingLecueBook } = useGetLecueBook();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isLogin = sessionStorage?.getItem("token");
      setIsLogin(isLogin);
      if (handleStep) {
        handleStep(1);
      }
    }
  }, []);

  return isLoadingLecueBook ? (
    <LoadingPage />
  ) : (
    <S.Wrapper>
      <HomeMainBanner />

      {isLogin && <LecueBookList title="즐겨찾기한 레큐북" />}
      <LecueBookList title="인기 레큐북 구경하기" />
    </S.Wrapper>
  );
}

export default Home;

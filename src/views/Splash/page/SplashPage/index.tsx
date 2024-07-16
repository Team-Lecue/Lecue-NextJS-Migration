"use client";

import LoadingPage from "@/views/LoadingPage";
import Body from "../../component/Body";
import Bottom from "../../component/Bottom";
import Header from "../../component/Header";
import useGetNoteNum from "../../hook/useGetNoteNum";
import * as S from "./SplashPage.style";

export interface StepProps {
  handleStep: (newStep: number) => void;
}

function SplashPage({ handleStep }: StepProps) {
  const { isLoading } = useGetNoteNum();

  return isLoading ? (
    <LoadingPage />
  ) : (
    <S.Wrapper>
      <Header />
      <Body />
      <Bottom handleStep={handleStep} />
    </S.Wrapper>
  );
}

export default SplashPage;

"use client";

import { StepProps } from "../../page/SplashPage";
import * as S from "./Bottom.style";

import { useRouter } from "next/navigation";

function Bottom({ handleStep }: StepProps) {
  const router = useRouter();

  const handleLoginBtn = () => {
    router.push("/login");
  };

  const handleStartBtn = () => {
    handleStep(1);
  };

  return (
    <S.BottomWrapper>
      <S.StartBtn type="button" onClick={handleStartBtn}>
        시작하기
      </S.StartBtn>
      <S.LoginBtn type="button" onClick={handleLoginBtn}>
        로그인/회원가입
      </S.LoginBtn>
    </S.BottomWrapper>
  );
}

export default Bottom;

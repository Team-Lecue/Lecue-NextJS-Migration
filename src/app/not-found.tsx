"use client";

import ImgError from "../assets/img/img_error.svg";
import * as S from "./ErrorPage.style";

import { useRouter } from "next/navigation";

function NotFound() {
  const router = useRouter();

  const handleClickHomeButton = () => {
    router.push(`/?step=${1}`);
  };

  return (
    <S.ErrorPageWrapper>
      <ImgError />
      <S.ErrorPageMessage>이런, 오류가 발생했어요</S.ErrorPageMessage>
      <S.HomeButton onClick={handleClickHomeButton}>홈 화면으로</S.HomeButton>
    </S.ErrorPageWrapper>
  );
}

export default NotFound;

"use client";

import { useRouter } from "next/navigation";
import ImgError from "../../assets/img/img_error.svg";
import * as S from "./BoundaryErrorPage.style";

interface BoundaryErrorPageProps {
  resetError: () => void;
}

function BoundaryErrorPage({ resetError }: BoundaryErrorPageProps) {
  const router = useRouter();

  const handleClickHomeButton = () => {
    resetError();
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

export default BoundaryErrorPage;

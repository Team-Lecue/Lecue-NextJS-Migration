"use client";

import IcArrowLeftBlack from "../../assets/icon/ic_arrow_left_black.svg";
import IcArrowLeftWhite from "../../assets/icon/ic_arrow_left_white.svg";
import IcHome from "../../assets/icon/ic_home.svg";
import IcSharing from "../../assets/icon/ic_sharing.svg";

import { useRouter } from "next/navigation";
import * as S from "./Header.style";

interface HeaderProps {
  headerTitle: string;
  isDarkMode?: boolean;
  isDetailPage?: boolean;
  handleFn?: () => void;
}

interface HeaderButtonProps {
  isDarkMode?: boolean;
  handleFn?: () => void;
}

function Header({
  headerTitle,
  isDarkMode,
  isDetailPage,
  handleFn,
}: HeaderProps) {
  return (
    <S.HeaderWrapper isDarkMode={isDarkMode}>
      <S.HeaderButtonWrapper isLeft={true}>
        {isDetailPage ? (
          <HomeButton />
        ) : (
          <BackButton isDarkMode={isDarkMode} handleFn={handleFn} />
        )}
      </S.HeaderButtonWrapper>
      <S.HeaderTitle isDarkMode={isDarkMode}>{headerTitle}</S.HeaderTitle>
      <S.HeaderButtonWrapper isLeft={false}>
        {isDetailPage ? <ShareButton /> : <></>}
      </S.HeaderButtonWrapper>
    </S.HeaderWrapper>
  );
}

export function HomeButton() {
  const router = useRouter();
  const handleClickHomeButton = () => {
    router.push(`/?step=${1}`);
  };

  return (
    <S.HeaderButton onClick={handleClickHomeButton}>
      <IcHome />
    </S.HeaderButton>
  );
}

export function ShareButton() {
  const handleClickShareButton = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Lecue",
          url: window.location.href,
        });
      } else {
        alert("이 브라우저에서는 내장 공유 기능을 지원하지 않습니다.");
      }
    } catch (error) {
      console.error("내장 공유 기능을 실행하는 중 에러가 발생했습니다:", error);
    }
  };

  return (
    <S.HeaderButton onClick={handleClickShareButton}>
      <IcSharing />
    </S.HeaderButton>
  );
}

export function BackButton({ isDarkMode, handleFn }: HeaderButtonProps) {
  const router = useRouter();
  const handleClickBackButton = () => {
    handleFn ? handleFn() : router.back();
  };

  return (
    <S.HeaderButton onClick={handleClickBackButton}>
      {isDarkMode ? <IcArrowLeftWhite /> : <IcArrowLeftBlack />}
    </S.HeaderButton>
  );
}

export default Header;

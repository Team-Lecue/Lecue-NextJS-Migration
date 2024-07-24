"use client";

import { useState } from "react";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import IcProfile from "../../../../assets/icon/ic_profile.svg";
import ImgLogoLecue from "../../../../assets/img/img_logo_lecue.svg";
import HomeSwiper from "../HomeSwiper";
import * as S from "./HomeMainBanner.style";
const CommonModal = dynamic(() => import("@/common/Modal/CommonModal"), {
  ssr: false,
});

function NavigateLecueBook() {
  const router = useRouter();
  const [modalOn, setModalOn] = useState(false);
  const [isLogin, setIsLogin] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isLogin = sessionStorage.getItem("token");

      setIsLogin(isLogin);
    }
  }, []);

  const handleClickIcProfile = () => {
    router.push("/mypage");
  };

  const handleClickNavBtn = () => {
    if (isLogin) {
      router.push("/target");
    } else {
      setModalOn(true);
    }
  };

  return (
    <S.MainWrapper>
      <S.IconWrapper>
        <ImgLogoLecue />

        <IcProfile onClick={handleClickIcProfile} />
      </S.IconWrapper>

      <HomeSwiper />

      <S.Button type="button" onClick={handleClickNavBtn}>
        레큐북 만들기
      </S.Button>

      {modalOn && (
        <CommonModal
          category="login"
          setModalOn={setModalOn}
          handleFn={() => router.push("/login")}
        />
      )}
    </S.MainWrapper>
  );
}

export default NavigateLecueBook;

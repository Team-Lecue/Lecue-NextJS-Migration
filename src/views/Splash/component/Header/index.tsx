"use client";

import ImgSplashLogo from "../../../../assets/img/img_splash_logo.svg";
import * as S from "./Header.style";

function Header() {
  return (
    <S.Header>
      <S.Wrapper>
        <ImgSplashLogo />
      </S.Wrapper>
    </S.Header>
  );
}

export default Header;

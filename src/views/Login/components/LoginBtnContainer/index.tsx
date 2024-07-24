"use client";

import { KAKAO_AUTH_URL } from "../../api/oAuth";
import * as S from "./LoginBtnContainer.style";

import BtnKakaologin from "../../../../assets/button/btn_kakaologin.svg";
import ImgKakaoStarOrange from "../../../../assets/img/img_kakao_star_orange.svg";

function LoginBtnContainer() {
  const handleClickLoginBtn = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <S.LoginBtnWrapper>
      <S.TextWrapper>
        <ImgKakaoStarOrange />
        <S.Text>소중한 마음을 전달해보세요!</S.Text>
        <ImgKakaoStarOrange />
      </S.TextWrapper>
      <button onClick={handleClickLoginBtn}>
        <BtnKakaologin />
      </button>
    </S.LoginBtnWrapper>
  );
}

export default LoginBtnContainer;

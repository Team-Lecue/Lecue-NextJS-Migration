import * as S from "./LecueLogo.style";

import ImgKakaoLogo from "../../../../assets/img/img_kakao_logo.svg";

function LecueLogo() {
  return (
    <S.LogoWrapper>
      <S.Line />
      <S.Logo>
        <ImgKakaoLogo />
      </S.Logo>
    </S.LogoWrapper>
  );
}

export default LecueLogo;

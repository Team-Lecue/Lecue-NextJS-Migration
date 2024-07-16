import ImgKakaoBook from "../../../../assets/img/img_kakao_book.svg";
import ImgKakaoStarWhite from "../../../../assets/img/img_kakao_star_white.svg";

import * as S from "./Header.style";

function Header() {
  return (
    <S.HeaderWrapper>
      <S.Logo>
        <ImgKakaoStarWhite />
        <ImgKakaoBook />
      </S.Logo>
      <S.OrangeBlock />
    </S.HeaderWrapper>
  );
}

export default Header;

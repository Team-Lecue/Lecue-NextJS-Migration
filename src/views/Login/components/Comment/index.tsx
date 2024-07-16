import ImgKakao01 from "../../../../assets/img/img_kakao_01.svg";
import ImgKakao02 from "../../../../assets/img/img_kakao_02.svg";
import ImgKakao03 from "../../../../assets/img/img_kakao_03.svg";
import ImgKakaoSpring from "../../../../assets/img/img_kakao_spring.svg";

import * as S from "./Comment.style";

function Comment() {
  return (
    <S.CommentWrapper>
      <S.CommentSection>
        <S.Comment>
          <ImgKakao01 />
        </S.Comment>

        <S.Comment>
          <ImgKakao02 />
        </S.Comment>

        <S.Comment>
          <ImgKakao03 />
        </S.Comment>
      </S.CommentSection>

      <S.Line>
        <S.Spring>
          <ImgKakaoSpring />
        </S.Spring>
        <S.Spring>
          <ImgKakaoSpring />
        </S.Spring>
        <S.Spring>
          <ImgKakaoSpring />
        </S.Spring>
      </S.Line>
    </S.CommentWrapper>
  );
}

export default Comment;

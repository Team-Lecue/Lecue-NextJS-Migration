"use client";

import useDeleteFavorite from "../../../../libs/hooks/useDeleteFavorite";
import usePostFavorite from "../../../../libs/hooks/usePostFavorite";
import * as S from "./BookInfoBox.style";

import { useEffect, useState } from "react";
import IcCrown from "../../../../assets/icon/ic_crown.svg";
import IcDate from "../../../../assets/icon/ic_date.svg";
import IcZigzagStarOff from "../../../../assets/icon/ic_zigzag_star_off.svg";
import IcZigzagStarOn from "../../../../assets/icon/ic_zigzag_star_on.svg";

interface BookInfoBoxProps {
  favoriteImage: string;
  bookDate: string;
  bookNickname: string;
  title: string;
  description: string;
  bookBackgroundColor: string;
  bookId: number;
  isFavorite?: boolean;
  bookUuid: string;
}

function BookInfoBox({
  favoriteImage,
  bookDate,
  bookNickname,
  title,
  description,
  bookBackgroundColor,
  isFavorite,
  bookId,
  bookUuid,
}: BookInfoBoxProps) {
  const [isLogin, setIsLogin] = useState<string | null>();

  useEffect(() => {
    const storeIsLogin = sessionStorage.getItem("token");
    setIsLogin(storeIsLogin);
  }, []);

  const postFavoriteMutation = usePostFavorite("lecueBookDetail", bookUuid);
  const deleteFavoriteMutation = useDeleteFavorite("lecueBookDetail", bookUuid);

  const handleFavoriteBtn = () => {
    isFavorite ? deleteFavoriteMutation(bookId) : postFavoriteMutation(bookId);
  };

  return (
    <S.BookInfoBoxWrapper backgroundColor={bookBackgroundColor}>
      <S.ProfileImageWrapper>
        <S.ProfileImg src={favoriteImage} alt="프로필 이미지" />
      </S.ProfileImageWrapper>
      <S.BookInfoWrapper>
        <S.BookInfoHeader>
          <S.BookInfoHeaderItemWrapper>
            <IcDate />
            <S.BookInfoHeaderItem backgroundColor={bookBackgroundColor}>
              {bookDate}
            </S.BookInfoHeaderItem>
          </S.BookInfoHeaderItemWrapper>
          <S.BookInfoHeaderItemWrapper>
            <IcCrown />
            <S.BookInfoHeaderItem backgroundColor={bookBackgroundColor}>
              {bookNickname}
            </S.BookInfoHeaderItem>
          </S.BookInfoHeaderItemWrapper>
        </S.BookInfoHeader>
        <S.BookInfoTitle>
          <S.BookInfoTitleText backgroundColor={bookBackgroundColor}>
            {title}
          </S.BookInfoTitleText>
          {isLogin && (
            <S.FavoriteBtn type="button" onClick={handleFavoriteBtn}>
              {isFavorite ? <IcZigzagStarOn /> : <IcZigzagStarOff />}
            </S.FavoriteBtn>
          )}
        </S.BookInfoTitle>
        <S.BookInfoContent backgroundColor={bookBackgroundColor}>
          {description}
        </S.BookInfoContent>
      </S.BookInfoWrapper>
    </S.BookInfoBoxWrapper>
  );
}

export default BookInfoBox;

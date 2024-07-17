import { ReactNode } from "react";

import BookTypeBoxOption from "../BookTypeBoxOption";
import * as S from "./BookTypeBox.style";

import ImgBookOrangeBig from "../../../../assets/img/img_book_orange_big.svg";
import ImgSaleprice from "../../../../assets/img/img_saleprice.svg";

interface BookTypeBoxProps {
  handleClickBookTypeBox: () => void;
  selectedBox: number;
  bookType: number;
  bookTypeBoxTitle: string;
  bookTypeBoxImg: ReactNode;
  bookTypeBoxPrice: number;
  isClickedSelectButton: boolean;
  bookTypeBoxOptionList: string[];
}

function BookTypeBox({
  handleClickBookTypeBox,
  bookType,
  bookTypeBoxTitle,
  bookTypeBoxImg,
  bookTypeBoxPrice,
  selectedBox,
  isClickedSelectButton,
  bookTypeBoxOptionList,
}: BookTypeBoxProps) {
  return (
    <S.BookTypeBoxWrapper
      onClick={() => {
        if (isClickedSelectButton === false) {
          handleClickBookTypeBox();
        }
      }}
      bookType={bookType}
      selectedBox={selectedBox}
      isClickedSelectButton={isClickedSelectButton}
    >
      <S.BookTypeBoxTitle
        bookType={bookType}
        selectedBox={selectedBox}
        isClickedSelectButton={isClickedSelectButton}
      >
        {bookTypeBoxTitle}
      </S.BookTypeBoxTitle>
      {bookType === 2 && isClickedSelectButton ? (
        <ImgBookOrangeBig />
      ) : (
        bookTypeBoxImg
      )}

      {bookType === 2 && isClickedSelectButton && <ImgSaleprice />}
      <S.BookTypeBoxPriceWrapper>
        <S.BookTypeBoxPrice bookType={bookType} selectedBox={selectedBox}>
          {bookType === 2 && isClickedSelectButton
            ? "0원"
            : `${bookTypeBoxPrice}원`}
        </S.BookTypeBoxPrice>
        {bookType === 2 && !isClickedSelectButton ? (
          <S.OneBookText>/1권</S.OneBookText>
        ) : (
          <></>
        )}
      </S.BookTypeBoxPriceWrapper>
      <S.BookTypeBoxOptionList
        bookType={bookType}
        selectedBox={selectedBox}
        isClickedSelectButton={isClickedSelectButton}
      >
        {bookTypeBoxOptionList.map((option, idx) => (
          <BookTypeBoxOption key={idx + option} bookTypeBoxOption={option} />
        ))}
      </S.BookTypeBoxOptionList>
    </S.BookTypeBoxWrapper>
  );
}

export default BookTypeBox;

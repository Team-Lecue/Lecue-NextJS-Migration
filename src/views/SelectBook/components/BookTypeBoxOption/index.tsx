import * as S from "./BookTypeBoxOption.style";

import IcCheck from "../../../../assets/icon/ic_check.svg";

interface BookTypeBoxOptionProps {
  bookTypeBoxOption: string;
}

function BookTypeBoxOption({ bookTypeBoxOption }: BookTypeBoxOptionProps) {
  return (
    <S.BookTypeBoxOptionWrapper>
      <IcCheck />
      <S.BookTypeBoxOptionText>{bookTypeBoxOption}</S.BookTypeBoxOptionText>
    </S.BookTypeBoxOptionWrapper>
  );
}

export default BookTypeBoxOption;

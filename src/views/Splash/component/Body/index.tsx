"use client";

import dynamic from "next/dynamic";
import lottieImg from "../../../../assets/lottie/lottie.json";
import useGetNoteNum from "../../hook/useGetNoteNum";
import * as S from "./Body.style";

const Lottie = dynamic(() => import("lottie-react"));

function Body() {
  const { data } = useGetNoteNum();

  return (
    <S.BodyWrapper>
      <S.LottieWrapper>
        <Lottie animationData={lottieImg} />
      </S.LottieWrapper>
      <S.TextWrapper>
        <S.Text>지금까지 {data && data.data.noteNum}개의</S.Text>
        <S.Text>레큐노트가 남겨졌어요!</S.Text>
      </S.TextWrapper>
    </S.BodyWrapper>
  );
}

export default Body;

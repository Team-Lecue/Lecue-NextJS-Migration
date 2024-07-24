"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import useGetNoteNum from "../../hook/useGetNoteNum";
import * as S from "./Body.style";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

interface LottieData {
  v: string;
  meta: {
    g: string;
    a: string;
    k: string;
    d: string;
    tc: string;
  };
  fr: number;
  ip: number;
  op: number;
  w: number;
  h: number;
  nm: string;
  ddd: number;
  assets: Array<{
    id: string;
    w: number;
    h: number;
    u: string;
    p: string;
    e: number;
    layers?: Array<any>;
  }>;
  layers: Array<any>;
}

function Body() {
  const { data } = useGetNoteNum();

  const [lottieData, setLottieData] = useState<any>(null);

  useEffect(() => {
    import("../../../../assets/lottie/lottie.json")
      .then((module) => {
        setLottieData(module.default);
      })
      .catch((error) => {
        console.error("Failed to load lottie animation", error);
      });
  }, []);

  if (!lottieData) {
    return null;
  }

  return (
    <S.BodyWrapper>
      <S.LottieWrapper>
        <Lottie animationData={lottieData} />
      </S.LottieWrapper>
      <S.TextWrapper>
        <S.Text>지금까지 {data && data.data.noteNum}개의</S.Text>
        <S.Text>레큐노트가 남겨졌어요!</S.Text>
      </S.TextWrapper>
    </S.BodyWrapper>
  );
}

export default Body;

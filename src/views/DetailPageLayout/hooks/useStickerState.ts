"use client";

import { useState } from "react";
import { DraggableData, DraggableEvent } from "react-draggable";

import { useEffect } from "react";
import { postedStickerType } from "../type/lecueBookType";

const useStickerState = (savedScrollPosition: number) => {
  const [stickerState, setStickerState] = useState<postedStickerType>({
    postedStickerId: 0,
    stickerImage: "",
    positionX: 0,
    positionY: savedScrollPosition,
  });

  // 스토리지를 이용해서 스크롤 값을 받아오는데 스토리지를 사용해야 하기 때문에 useEffect를 이용
  // 초기화 이후에 useEffect가 실행되므로 savedScrollPosition이 처음에 null -> 0으로 받아졌다가 후에 제대로 받아와짐
  // 위에서 state의 초기값을 savedScrollPosition으로 잡아뒀기에 첫 값인 0으로 초기화된 뒤 업데이트되지 않아 0 값으로 그대로 유지됨
  // Y축 위치를 제대로 잡아내지 못함
  // 그래서 savedScrollPosition이 변경되면 positionY를 업데이트하도록 하단 useEffect문 추가

  useEffect(() => {
    setStickerState((prev) => ({
      ...prev,
      positionY: savedScrollPosition,
    }));
  }, [savedScrollPosition]);

  const handleDrag = (_e: DraggableEvent, ui: DraggableData) => {
    const { positionX, positionY } = stickerState;
    setStickerState((prev) => ({
      ...prev,
      positionX: positionX + ui.deltaX,
      positionY: positionY + ui.deltaY,
    }));
  };

  return { stickerState, setStickerState, handleDrag };
};

export default useStickerState;

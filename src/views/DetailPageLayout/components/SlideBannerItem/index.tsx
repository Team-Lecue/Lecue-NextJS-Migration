import React, { forwardRef } from "react";

import * as S from "./SlideBannerItem.style";

import ImgLe from "../../../../assets/img/img_le.svg";
import ImgStarOrangeline from "../../../../assets/img/img_star_orangeline.svg";

interface SlideBannerItemProps {
  name: string;
}

const SlideBannerItem = forwardRef(function SlideBannerItem(
  { name }: SlideBannerItemProps,
  ref: React.Ref<HTMLDivElement>
) {
  return (
    <S.SliderBannerItemWrapper ref={ref as React.RefObject<HTMLDivElement>}>
      <ImgLe />
      <S.Name>{`( ${name} )`}</S.Name>
      <ImgStarOrangeline />
    </S.SliderBannerItemWrapper>
  );
});

export default SlideBannerItem;

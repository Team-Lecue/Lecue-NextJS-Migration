import * as S from "./AlertBanner.style";

import Button from "@/common/Button";
import IcCaution from "../../../../assets/icon/ic_caution.svg";

interface AlertBannerProps {
  onClick: () => void;
}

function AlertBanner({ onClick }: AlertBannerProps) {
  return (
    <S.ButtonWrapper>
      <S.AlertBanner>
        <IcCaution />
        스티커는 한 번 붙이면 수정/삭제할 수 없습니다
      </S.AlertBanner>
      <Button variant="choose" onClick={onClick}>
        부착 완료
      </Button>
    </S.ButtonWrapper>
  );
}

export default AlertBanner;

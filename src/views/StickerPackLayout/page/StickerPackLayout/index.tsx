"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

// component

import useGetBookUuid from "../../hooks/useGetBookUuid";
import useGetStickerPack from "../../hooks/useGetStickerPack";
// type

// style

import Button from "@/common/Button";
import Header from "@/common/Header";
import LoadingPage from "@/views/LoadingPage";

import StickerList from "../../components/StickerList";
import { stickerType } from "../../type/stickerPackType";
import * as S from "./StickerPackLayout.style";

interface StickerPackLayoutProps {
  bookId: number;
}

function StickerPackLayout({ bookId }: StickerPackLayoutProps) {
  const router = useRouter();

  const [selectedStickerData, setSelectedStickerData] = useState<stickerType>({
    stickerId: 0,
    stickerImage: "",
  });

  const handleStickerClick = (newId: number, newImage: string) => {
    setSelectedStickerData((prevState) => ({
      ...prevState,
      stickerId: newId,
      stickerImage: newImage,
    }));
  };

  // 스토리지 이용 -> 쿼리파라미터 이용으로 변경
  // 스티커 부착한 뒤에도 스토리지가 비어있지 않아 sticker-attach 뷰로 남아있는 오류 방지하기 위해 쿼리파라미터로 스티커 부착 여부 감시
  // useEffect(() => {
  //   sessionStorage.setItem(
  //     "stickerId",
  //     selectedStickerData.stickerId.toString()
  //   );
  //   sessionStorage.setItem("stickerImage", selectedStickerData.stickerImage);
  // }, [selectedStickerData]);

  // Conditionally Hook Call 방지
  const bookUuidResult = useGetBookUuid(bookId);
  const stickerPackResult = useGetStickerPack(bookId);

  const isLoading = bookUuidResult.isLoading || stickerPackResult.isLoading;

  // useLocation 대신 세션스토리지 이용하도록 로직 변경
  // replace true 해주는 useRouter 옵션 알아봐야 함
  const handleClickDone = () => {
    // navigate(`/sticker-attach/${bookUuidResult.bookUuId}`, {
    //   state: { sticker: selectedStickerData, replace: true },
    // });

    router.push(
      `/sticker-attach/${bookUuidResult.bookUuId}?stickerId=${selectedStickerData.stickerId}&stickerImage=${selectedStickerData.stickerImage}`
    );
  };

  return isLoading ? (
    <LoadingPage />
  ) : (
    <S.Wrapper>
      <Header headerTitle="스티커팩" />
      <S.Body>
        <StickerList
          bookId={bookId}
          selectedStickerData={selectedStickerData}
          handleStickerClick={handleStickerClick}
        />
      </S.Body>
      <S.ButtonWrapper>
        <Button
          variant="choose"
          disabled={selectedStickerData.stickerImage === ""}
          onClick={handleClickDone}
        >
          선택 완료
        </Button>
      </S.ButtonWrapper>
    </S.Wrapper>
  );
}

export default StickerPackLayout;

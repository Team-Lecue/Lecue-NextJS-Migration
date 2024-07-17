import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// component

import useGetBookUuid from "../../hooks/useGetBookUuid";
import useGetStickerPack from "../../hooks/useGetStickerPack";
// type

// style
import Button from "@/common/Button/index.jsx";
import Header from "@/common/Header/index.jsx";
import LoadingPage from "@/views/LoadingPage/index.jsx";
import StickerList from "../../components/StickerList/index.jsx";
import { stickerType } from "../../type/stickerPackType.js";
import * as S from "./StickerPack.style";

function StickerPack() {
  const navigate = useNavigate();
  const location = useLocation();

  const { bookId } = location.state || {};

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

  // Conditionally Hook Call 방지
  const bookUuidResult = useGetBookUuid(bookId);
  const stickerPackResult = useGetStickerPack(bookId);

  const isLoading = bookUuidResult.isLoading || stickerPackResult.isLoading;

  const handleClickDone = () => {
    navigate(`/sticker-attach/${bookUuidResult.bookUuId}`, {
      state: { sticker: selectedStickerData, replace: true },
    });
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

export default StickerPack;

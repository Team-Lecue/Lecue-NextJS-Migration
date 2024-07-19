"use client";

import { useRouter } from "next/navigation";
import { lazy, Suspense, useEffect, useRef, useState } from "react";

import useScrollPosition from "../../../../utils/savedScrollPosition";

import BtnFloatingSticker from "../../../../assets/button/btn_floating_sticker.svg";
import BtnFloatingStickerOrange from "../../../../assets/button/btn_floating_sticker_orange.svg";
import BtnFloatingWrite from "../../../../assets/button/btn_floating_write.svg";
import BtnFloatingWriteOrange from "../../../../assets/button/btn_floating_write_orange.svg";

// hooks
import usePostSticker from "../../hooks/usePostSticker";
import useStickerState from "../../hooks/useStickerState";
import { NoteType, postedStickerType } from "../../type/lecueBookType";
//views
import AlertBanner from "../AlretBanner";
import EmptyView from "../EmptyView";
import LecueNoteListHeader from "../LecueNoteLIstHeader";
import ZigZagView from "../ZigZagView";
//style
import CommonModal from "@/common/Modal/CommonModal";
import * as S from "./LecueNoteListContainer.style";

const LinearView = lazy(() => import("../LinearView"));

interface LecueNoteListContainerProps {
  noteNum: number;
  backgroundColor: string;
  noteList: NoteType[];
  postedStickerList: postedStickerType[];
  isEditable: boolean;
  setEditableStateTrue: () => void;
  bookUuid: string;
  bookId: number;
}

function LecueNoteListContainer(props: LecueNoteListContainerProps) {
  const {
    noteNum,
    backgroundColor,
    noteList,
    postedStickerList,
    isEditable,
    setEditableStateTrue,
    bookUuid,
    bookId,
  } = props;

  //hooks
  const router = useRouter();

  const scrollRef = useRef<HTMLDivElement>(null);
  const { savedScrollPosition } = useScrollPosition();
  const { stickerState, setStickerState, handleDrag } =
    useStickerState(savedScrollPosition);

  const [isLogin, setIsLogin] = useState<string | null>();
  const [stickerId, setStickerId] = useState<number | null>();
  const [stickerImage, setStickerImage] = useState<string | null>();

  // 스토리지 쓸지 쿼리파라미터 쓸지 고민 중
  useEffect(() => {
    const storeIsLogin = sessionStorage.getItem("token");
    setIsLogin(storeIsLogin);
    const storeStickerId = Number(sessionStorage.getItem("stickerId"));
    setStickerId(storeStickerId);
    const storeStickerImage = sessionStorage.getItem("stickerImage");
    setStickerImage(storeStickerImage);

    // useNavigate state -> 세션 스토리지로 변경
    sessionStorage.setItem("bookId", bookId.toString());
  }, []);

  //state
  const [fullHeight, setFullHeight] = useState<number | null>(null);
  const [heightFromBottom, setHeightFromBottom] = useState<number | null>(null);
  const [isZigZagView, setIsZigZagView] = useState<boolean>(true);
  const [modalOn, setModalOn] = useState<boolean>(false);

  useEffect(() => {
    if (scrollRef.current) {
      if (scrollRef.current.offsetHeight) {
        setFullHeight(scrollRef.current.offsetHeight);
      }

      if (fullHeight !== null) {
        setHeightFromBottom(fullHeight - stickerState.positionY);
      }
    }
  }, [fullHeight, stickerState.positionY, scrollRef]);

  useEffect(() => {
    if (stickerId && stickerImage) {
      window.scrollTo(0, savedScrollPosition);

      setStickerState((prev) => ({
        ...prev,
        postedStickerId: stickerId,
        stickerImage: stickerImage,
      }));
      setEditableStateTrue();
    }
  }, [stickerId, stickerImage, isEditable]);

  const handleClickDone = usePostSticker({
    bookUuid,
    heightFromBottom,
    stickerState,
    bookId,
  });

  const handleClickIconButton = (isSticker: boolean) => {
    if (isLogin) {
      sessionStorage.setItem("scrollPosition", window.scrollY.toString());
      const path = isSticker ? "/sticker-pack" : "/create-note";
      router.push(path);
    } else {
      setModalOn(true);
    }
  };

  const renderFloatingButton = (isSticker: boolean) => (
    <S.StickerWrapper>
      <S.StickerButton
        type="button"
        onClick={() => handleClickIconButton(isSticker)}
      >
        {backgroundColor === "#F5F5F5" ? (
          isSticker ? (
            <div
              style={{
                paddingTop: "8rem",
              }}
            >
              <BtnFloatingSticker />
            </div>
          ) : (
            <BtnFloatingWrite />
          )
        ) : isSticker ? (
          <div
            style={{
              paddingTop: "8rem",
            }}
          >
            <BtnFloatingStickerOrange />
          </div>
        ) : (
          <BtnFloatingWriteOrange />
        )}
      </S.StickerButton>
    </S.StickerWrapper>
  );

  return (
    <S.LecueNoteListContainerWrapper
      isEditable={isEditable}
      backgroundColor={backgroundColor}
    >
      <LecueNoteListHeader
        isEditable={isEditable}
        noteNum={noteNum}
        backgroundColor={backgroundColor}
        isZigZagView={isZigZagView}
        buttonOnClick={() => setIsZigZagView(!isZigZagView)}
      />
      <S.LecueNoteListViewWrapper>
        {noteList.length === 0 ? (
          <EmptyView />
        ) : isZigZagView ? (
          <ZigZagView
            fullHeight={fullHeight}
            savedScrollPosition={savedScrollPosition}
            noteList={noteList}
            isEditable={isEditable}
            handleDrag={handleDrag}
            stickerState={stickerState}
            postedStickerList={postedStickerList}
            ref={scrollRef}
          />
        ) : (
          <Suspense fallback={<div>Loading LinearView...</div>}>
            <LinearView noteList={noteList} />
          </Suspense>
        )}
        {!isEditable ? (
          <>
            {noteList.length !== 0 && renderFloatingButton(true)}
            {renderFloatingButton(false)}
          </>
        ) : (
          <AlertBanner onClick={handleClickDone} />
        )}
      </S.LecueNoteListViewWrapper>

      {modalOn && (
        <CommonModal
          category="login"
          setModalOn={setModalOn}
          handleFn={() => router.push(`/login`)}
        />
      )}
    </S.LecueNoteListContainerWrapper>
  );
}

export default LecueNoteListContainer;

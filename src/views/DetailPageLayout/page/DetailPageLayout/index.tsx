"use client";

import { useState } from "react";

import Header from "@/common/Header";
import LoadingPage from "@/views/LoadingPage";
import { useParams } from "next/navigation";
import usePostStickerState from "../../../StickerAttach/hooks/usePostStickerState";
import BookInfoBox from "../../components/BookInfoBox";
import LecueNoteListContainer from "../../components/LecueNoteListContainer";
import SlideBanner from "../../components/SlideBanner";
import * as S from "./DetailPageLayout.style";

function DetailPageLayout({ bookDetail, isLoading }: any) {
  const [isEditable, setIsEditable] = useState(false);

  const { bookUuid } = useParams();

  const postMutation = usePostStickerState(bookUuid as string);

  const setEditableStateTrue = () => {
    setIsEditable(true);
  };

  return isLoading || postMutation.isLoading ? (
    <LoadingPage />
  ) : (
    <S.DetailPageWrapper>
      <Header headerTitle="레큐북" isDetailPage={!isEditable} />
      <S.DetailPageBodyWrapper>
        <SlideBanner name={bookDetail.favoriteName} />
        <S.LecueBookContainer>
          <BookInfoBox {...bookDetail} bookUuid={bookUuid} />
          <LecueNoteListContainer
            bookId={bookDetail.bookId}
            bookUuid={bookUuid as string}
            isEditable={isEditable}
            setEditableStateTrue={setEditableStateTrue}
            noteNum={bookDetail.noteNum}
            backgroundColor={bookDetail.bookBackgroundColor}
            noteList={bookDetail.noteList}
            postedStickerList={bookDetail.postedStickerList}
          />
        </S.LecueBookContainer>
      </S.DetailPageBodyWrapper>
    </S.DetailPageWrapper>
  );
}

export default DetailPageLayout;

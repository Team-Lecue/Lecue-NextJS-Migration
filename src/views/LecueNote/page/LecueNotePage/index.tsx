import { useReducer, useState } from "react";

import { useRouter } from "next/navigation";

import Header from "@/common/Header";
import LoadingPage from "@/common/LoadingPage";
import CommonModal from "@/common/Modal/CommonModal";
import { useEffect } from "react";
import Footer from "../../components/Footer";
import SelectColor from "../../components/SelectColor";
import WriteNote from "../../components/WriteNote";
import {
  BG_COLOR_CHART,
  CATEGORY,
  TEXT_COLOR_CHART,
} from "../../constants/colorChart";
import usePostLecueNote from "../../hooks/usePostLecueNote";
import usePutPresignedUrl from "../../hooks/usePutPresignedUrl";
import { reducer } from "../../reducer/lecueNoteReducer";
import * as S from "./LecueNotePage.style";

function LecueNotePage() {
  const MAX_LENGTH = 1000;
  const router = useRouter();
  const { putMutation, isLoading: isPutLoading } = usePutPresignedUrl();
  const { postMutation, isLoading: isPostLoading } = usePostLecueNote();
  const isMutationLoading = isPutLoading || isPostLoading;

  const noteContents = sessionStorage.getItem("noteContents");

  // 스토리지에서 값 받아오도록 변경
  // const { bookId } = location.state || {};

  const [bookId, setBookId] = useState<number>();

  useEffect(() => {
    const storeBookId = Number(sessionStorage.getItem("bookId"));
    setBookId(storeBookId);
  }, []);

  const [modalOn, setModalOn] = useState(false);
  const [escapeModal, setEscapeModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [lecueNoteState, dispatch] = useReducer(reducer, {
    presignedUrl: "",
    filename: BG_COLOR_CHART[0],
    contents: noteContents !== null ? noteContents : "",
    category: CATEGORY[0],
    textColor: TEXT_COLOR_CHART[0],
    background: BG_COLOR_CHART[0],
    file: null,
    isIconClicked: false,
    imgToStr: "",
    imgToBinary: new FileReader(),
  });

  const handleIsLoading = (booleanStatus: boolean) => {
    setIsLoading(booleanStatus);
  };

  const handleResetPrevImg = () => {
    dispatch({ type: "RESET_PREV_IMG" });
  };

  const handleChangeContents = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: "SET_CONTENTS", contents: e.target.value });
    if (e.target.value.length > MAX_LENGTH) {
      dispatch({
        type: "SET_CONTENTS",
        contents: (e.target.value = e.target.value.substring(0, MAX_LENGTH)),
      });
      alert("1000자 내로 작성해주세요.");
    }
  };

  const handleClickedColorBtn = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.currentTarget.name === "textColor"
      ? dispatch({ type: "CLICKED_TEXT_COLOR", color: e.currentTarget.id })
      : dispatch({ type: "CLICKED_BG_COLOR", color: e.currentTarget.id });

    lecueNoteState.category !== "텍스트색" &&
      dispatch({ type: "NOT_CLICKED_IMG_ICON" });
  };

  const handleTransformImgFile = (file: string | FileReader) => {
    if (typeof file === "string") {
      dispatch({ type: "IMG_TO_STR", imgFile: file });
    } else {
      dispatch({ type: "IMG_TO_BINARY", imgFile: file });
    }
  };

  const handleClickCompleteModal = async () => {
    if (lecueNoteState.imgToBinary) {
      if (lecueNoteState.imgToBinary.result && lecueNoteState.file) {
        putMutation({
          presignedUrl: lecueNoteState.presignedUrl,
          binaryFile: lecueNoteState.imgToBinary.result,
          fileType: lecueNoteState.file.type,
        });
      }
    }
    postMutation({
      contents: lecueNoteState.contents,
      color: lecueNoteState.textColor,
      fileName: lecueNoteState.filename,
      bgColor: lecueNoteState.background,
      isIconClicked: lecueNoteState.isIconClicked,
      bookId: bookId as number,
    });

    sessionStorage.setItem("noteContents", "");
  };

  return isMutationLoading ? (
    <LoadingPage />
  ) : (
    <S.Wrapper>
      {modalOn && (
        <CommonModal
          handleFn={handleClickCompleteModal}
          category="note_complete"
          setModalOn={setModalOn}
        />
      )}

      {escapeModal && (
        <CommonModal
          handleFn={() => {
            router.back();
            sessionStorage.setItem("noteContents", "");
          }}
          category="note_escape"
          setModalOn={setEscapeModal}
        />
      )}
      <Header
        headerTitle="레큐노트 작성"
        handleFn={() => setEscapeModal(true)}
      />

      <S.CreateNote>
        <WriteNote
          isLoading={isLoading}
          imgFile={lecueNoteState.imgToStr}
          isIconClicked={lecueNoteState.isIconClicked}
          lecueNoteState={lecueNoteState}
          contents={lecueNoteState.contents}
          handleChangeFn={handleChangeContents}
          handleResetPrevImg={handleResetPrevImg}
        />
        <SelectColor
          isIconClicked={lecueNoteState.isIconClicked}
          lecueNoteState={lecueNoteState}
          presignedUrlDispatch={dispatch}
          handleTransformImgFile={(imgFile) => handleTransformImgFile(imgFile)}
          selectedFile={(file: File) =>
            dispatch({ type: "SELECTED_FILE", file: file })
          }
          handleCategoryFn={(e) =>
            dispatch({
              type: "CLICKED_CATEGORY",
              category: e.currentTarget.innerHTML,
            })
          }
          handleColorFn={handleClickedColorBtn}
          handleIconFn={() => dispatch({ type: "CLICKED_IMG_ICON" })}
          handleIsLoading={handleIsLoading}
        />
      </S.CreateNote>

      <Footer contents={lecueNoteState.contents} setModalOn={setModalOn} />
    </S.Wrapper>
  );
}

export default LecueNotePage;

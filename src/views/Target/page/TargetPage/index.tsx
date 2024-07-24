"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import Header from "@/common/Header";
import dynamic from "next/dynamic";
import CompleteButton from "../../components/CompleteButton";
import FavoriteImageInputSection from "../../components/FavoriteImageInputSection";
import NameInputSection from "../../components/NameInputSection";
import usePutPresignedUrl from "../../hooks/usePutPresignedUrl";
import * as S from "./TargetPage.style";
const CommonModal = dynamic(() => import("@/common/Modal/CommonModal"), {
  ssr: false,
});

interface TargetPageProps {
  presignedURLData: {
    url: string;
    fileName: string;
  };
}

function TargetPage({ presignedURLData }: TargetPageProps) {
  const [presignedFileName, setPresignedFileName] = useState("");
  const [name, setName] = useState("");
  const [fileData, setFileData] = useState<File | null>(null);
  const [escapeModal, setEscapeModal] = useState(false);
  const [presignedData, setPresignedData] = useState({
    url: "",
    fileName: "",
  });
  const [hasStoredImage, setHasStoredImage] = useState(false);

  const router = useRouter();

  const putMutation = usePutPresignedUrl();

  useEffect(() => {
    if (
      sessionStorage.getItem("name") &&
      sessionStorage.getItem("name") !== null
    ) {
      const a = sessionStorage.getItem("name");
      if (typeof a === "string") {
        setName(a);
      }
    }
    setHasStoredImage(sessionStorage.getItem("image") !== null);
  }, []);

  useEffect(() => {
    if (presignedURLData) {
      const { url, fileName } = presignedURLData;
      setPresignedData({ url, fileName });
      setPresignedFileName(fileName);
    }
  }, [presignedURLData]);

  //useNavigate state 대신 세션스토리지 사용

  useEffect(() => {
    sessionStorage.setItem("name", name);
  }, [name]);

  useEffect(() => {
    sessionStorage.setItem("presignedFileName", presignedFileName);
  }, [presignedFileName]);

  const handleClickCompleteButton = useCallback(async () => {
    if (fileData) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(fileData);
      reader.onloadend = async () => {
        if (reader.result !== null) {
          putMutation.mutate({
            url: presignedData.url,
            data: reader.result as ArrayBuffer,
            contentType: fileData.type,
          });
        }
      };
    }

    router.push("/select-book");

    // 확인 필요
    // navigate("/select-book", {
    //   state: { presignedFileName: presignedFileName, name: name },
    // });
  }, []);

  const handleEscapeModal = useCallback(() => {
    setEscapeModal(true);
  }, []);

  const changeFileData = useCallback((file: File) => setFileData(file), []);

  const changeName = useCallback((name: string) => setName(name), []);

  return (
    <S.TargetPageWrapper>
      {escapeModal && (
        <CommonModal
          handleFn={() => router.push(`/?step=${1}`)}
          category="book_escape"
          setModalOn={setEscapeModal}
        />
      )}
      <Header headerTitle="레큐북 제작" handleFn={handleEscapeModal} />
      <S.TargetPageBodyWrapper>
        <NameInputSection name={name} changeName={changeName} />
        <FavoriteImageInputSection changeFileData={changeFileData} />
        <CompleteButton
          isActive={(fileData !== null || hasStoredImage) && name.length !== 0}
          onClick={handleClickCompleteButton}
        />
      </S.TargetPageBodyWrapper>
    </S.TargetPageWrapper>
  );
}

export default TargetPage;

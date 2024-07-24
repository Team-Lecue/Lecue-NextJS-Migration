"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import * as S from "./FavoriteImageInput.style";

import IcCamera from "../../../../assets/icon/ic_camera.svg";
import ImgBook from "../../../../assets/img/img_book.svg";

interface FavoriteImageInputProps {
  changeFileData: (file: File) => void;
}

function FavoriteImageInput({ changeFileData }: FavoriteImageInputProps) {
  const imgRef = useRef<HTMLInputElement | null>(null);
  const [imgFile, setImgFile] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    if (
      sessionStorage.getItem("image") &&
      sessionStorage.getItem("image") !== null
    ) {
      const a = sessionStorage.getItem("image");
      if (typeof a === "string") {
        setImgFile(a);
      }
    }
  }, []);

  const handleImageUpload = async (): Promise<void> => {
    const fileInput = imgRef.current;

    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];

      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 150,
        useWebWorker: true,
      };

      try {
        const base64Result = await convertBlobToBase64(file);

        const { default: imageCompression } = await import(
          "browser-image-compression"
        );

        const compressedFile = await imageCompression(file, options);

        sessionStorage.setItem("image", base64Result);

        changeFileData(compressedFile);
        setImgFile(base64Result);
      } catch (error) {
        router.push("/error");
      }
    }
  };

  const convertBlobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  return (
    <S.FavoriteImageInputWrapper>
      <S.ImageUploadLabel htmlFor="previewImg">
        {imgFile ? <S.UploadedImage src={imgFile} /> : <IcCamera />}
      </S.ImageUploadLabel>
      <ImgBook />
      <S.ImageUploadInput
        type="file"
        accept="image/*"
        id="previewImg"
        onChange={handleImageUpload}
        ref={imgRef}
      />
    </S.FavoriteImageInputWrapper>
  );
}

export default FavoriteImageInput;

import { useEffect, useRef } from "react";

import { useRouter } from "next/navigation";

import getPresignedUrl from "../api/getPresignedUrl";
import { getPresignedUrlProps } from "../type/lecueNoteType";

const useGetPresignedUrl = ({ presignedUrlDispatch }: getPresignedUrlProps) => {
  const router = useRouter();
  const isUnmounted = useRef(false);

  useEffect(() => {
    isUnmounted.current = false;
    const fetchData = async () => {
      try {
        const { data } = await getPresignedUrl();

        presignedUrlDispatch({
          type: "SET_PRESIGNED_URL",
          presignedUrl: data.url,
          filename: data.fileName,
        });
      } catch (error) {
        router.push("/error");
      }
    };

    if (!isUnmounted.current) {
      fetchData();
    }

    return () => {
      isUnmounted.current = true;
    };
  }, []);
};

export default useGetPresignedUrl;

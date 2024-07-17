import { useRouter } from "next/navigation";
import { useMutation } from "react-query";

import { postStickerState } from "../api/postStickerState";
import { postedStickerParams } from "../type/postStickerType";

const usePostStickerState = (bookUuId: string) => {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: ({
      postedStickerId,
      bookId,
      positionX,
      positionY,
    }: postedStickerParams) => {
      return postStickerState({
        postedStickerId,
        bookId,
        positionX,
        positionY,
      });
    },
    onSuccess: () => {
      // replace true 해주는 useRouter 옵션 알아봐야 함
      // navigate(`/lecue-book/${bookUuId}`, { replace: true });

      router.push(`/lecue-book/${bookUuId}`);
    },

    onError: () => router.push("/error"),
  });
  return mutation;
};

export default usePostStickerState;

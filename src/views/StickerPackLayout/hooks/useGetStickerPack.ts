import { useRouter } from "next/navigation";
import { useQuery } from "react-query";

import { getStickerPack } from "../api/getStickerPack";

export default function useGetStickerPack(bookId: number) {
  const router = useRouter();

  const { data: stickerPack, isLoading } = useQuery(
    ["useGetStickerPack"],
    () => getStickerPack(bookId),
    {
      onError: () => {
        router.push("/error");
      },
      refetchOnWindowFocus: false,
    }
  );

  return { stickerPack, isLoading };
}

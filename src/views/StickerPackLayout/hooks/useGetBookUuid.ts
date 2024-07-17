import { useRouter } from "next/navigation";
import { useQuery } from "react-query";

import { getBookUuid } from "../api/getBookUuid";

export default function useGetBookUuid(bookId: number) {
  const router = useRouter();

  const { data: bookUuId, isLoading } = useQuery(
    ["useGetBookUuid"],
    () => getBookUuid(bookId),
    {
      onError: () => {
        router.push("/error");
      },
      refetchOnWindowFocus: false,
    }
  );

  return { bookUuId, isLoading };
}

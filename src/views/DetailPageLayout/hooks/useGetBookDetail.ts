import { useRouter } from "next/navigation";
import { useQuery } from "react-query";

import { getBookDetail } from "../api/getBookDetail";

export default function useGetBookDetail(bookUuid: string) {
  const router = useRouter();
  const { data: bookDetail, isLoading } = useQuery(
    ["useGetBookDetail", bookUuid],
    () => getBookDetail(bookUuid),
    {
      onError: () => {
        router.push("/error");
      },
      refetchOnMount: "always",
      refetchOnWindowFocus: false,
    }
  );

  return { bookDetail, isLoading };
}

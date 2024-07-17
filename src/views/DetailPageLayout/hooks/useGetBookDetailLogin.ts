import { useRouter } from "next/navigation";
import { useQuery } from "react-query";

import { QUERY_KEY } from "../../../constants/queryKeys";
import { getBookDetailLogin } from "../api/getBookDetailLogin";

export default function useGetBookDetailLogin(bookUuid: string) {
  const router = useRouter();

  const { data: bookDetail, isLoading } = useQuery(
    [QUERY_KEY.favorite.atLecueBookDetail, bookUuid],
    () => getBookDetailLogin(bookUuid),
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

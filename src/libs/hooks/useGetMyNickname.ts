"use client";

import { useQuery } from "react-query";

import { useRouter } from "next/navigation";
import { QUERY_KEY } from "../../constants/queryKeys";
import { getMyNickName } from "../api/getMyNickName";

export default function useGetMyNickName() {
  const router = useRouter();
  const { data: myNickName, isLoading } = useQuery(
    QUERY_KEY.nickname.getNickName,
    () => getMyNickName(),
    {
      onError: () => {
        router.push("/error");
      },
      refetchOnWindowFocus: false,
    }
  );

  return { myNickName, isLoading };
}

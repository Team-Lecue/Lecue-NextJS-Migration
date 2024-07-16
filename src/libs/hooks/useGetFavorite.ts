"use client";

import { useQuery } from "react-query";

import { useRouter } from "next/navigation";
import { QUERY_KEY } from "../../constants/queryKeys";
import getFavorite from "../api/getFavorite";

const useGetFavorite = () => {
  const router = useRouter();

  const { isLoading: isLoadingFavorite, data: favorite } = useQuery({
    queryKey: QUERY_KEY.favorite.atHome,
    queryFn: () => getFavorite(),
    onError: () => router.push("/error"),
    refetchOnWindowFocus: false,
  });

  return { isLoading: isLoadingFavorite, data: favorite };
};

export default useGetFavorite;

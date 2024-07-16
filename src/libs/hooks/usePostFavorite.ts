"use client";

import { useMutation, useQueryClient } from "react-query";

import { useRouter } from "next/navigation";
import { QUERY_KEY } from "../../constants/queryKeys";
import postFavorite from "../api/postFavorite";

const usePostFavorite = (location: string, bookUuid?: string) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleRefetchQueries = (location: string, bookUuid?: string) => {
    switch (location) {
      case "lecueBook":
        queryClient.refetchQueries(QUERY_KEY.favorite.atLecueBook, {
          exact: true,
        });
        break;

      case "lecueBookDetail":
        queryClient.refetchQueries(
          [QUERY_KEY.favorite.atLecueBookDetail, bookUuid],
          {
            exact: true,
          }
        );
        break;
    }
  };

  const mutation = useMutation({
    mutationFn: (bookId: number) => {
      return postFavorite(bookId);
    },
    onError: () => router.push("/error"),
    onSuccess: () => {
      handleRefetchQueries(location, bookUuid);
    },
  });
  return mutation.mutate;
};

export default usePostFavorite;

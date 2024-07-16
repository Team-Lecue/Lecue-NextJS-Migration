"use client";

import { useQuery } from "react-query";

import { useRouter } from "next/navigation";
import getLecueBook from "../api/getLecueBook";
import { HOME_QUERY_KEY } from "../constants/homeQueryKey";

const useGetLecueBook = () => {
  const router = useRouter();

  const { isLoading: isLoadingLecueBook, data: lecueBook } = useQuery({
    queryKey: HOME_QUERY_KEY.getLecueBook,
    queryFn: () => getLecueBook(),
    onError: () => router.push("/error"),
    refetchOnWindowFocus: false,
  });

  return { isLoading: isLoadingLecueBook, data: lecueBook };
};

export default useGetLecueBook;

"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "react-query";

import getNoteNum from "../api/getNoteNum";

const useGetNoteNum = () => {
  const router = useRouter();
  const { isLoading, data } = useQuery({
    queryKey: ["get-note-num"],
    queryFn: () => getNoteNum(),
    onError: () => router.push(`/error`),
    refetchOnWindowFocus: false,
  });

  return { isLoading, data };
};

export default useGetNoteNum;

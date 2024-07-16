"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "react-query";

import { postLoginToken } from "../api/postLoginToken";

const usePostLoginToken = () => {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (token: string) => {
      return await postLoginToken(token);
    },
    onSuccess: (data) => {
      const { tokenDto, nickname } = data;
      // 이동
      sessionStorage.setItem("token", tokenDto.accessToken);

      if (nickname === null) {
        router.push("/register");
      } else {
        sessionStorage.setItem("nickname", nickname);

        router.push(`/?step=${1}`);
      }
    },
    onError: () => {
      router.push("/error");
    },
  });
  return mutation;
};

export default usePostLoginToken;

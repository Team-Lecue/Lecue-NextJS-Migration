"use client";

import { useMutation } from "react-query";

import { useRouter } from "next/navigation";
import { getLoginToken } from "../api/getLoginToken";

interface useGetLoginTokenProps {
  handleLoginToken: (token: string) => void;
}

const useGetLoginToken = (props: useGetLoginTokenProps) => {
  const { handleLoginToken } = props;

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async () => {
      return await getLoginToken();
    },
    onError: () => {
      router.push("/error");
    },
    onSuccess: (data) => {
      handleLoginToken(data.access_token);
    },
  });
  return mutation;
};

export default useGetLoginToken;

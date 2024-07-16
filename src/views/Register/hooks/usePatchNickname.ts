import { AxiosError } from "axios";
import { useMutation } from "react-query";

import { patchNickname } from "../api/patchNickname";
import {
  patchNicknameProps,
  usePatchNicknameProps,
} from "../types/registerTypes";

import { useRouter } from "next/navigation";

// navigation state 사용 불가로 우선 토큰을 sessionStorage에 넣어두기로 Login 컴포넌트 설계, nickname으로 회원가입 여부 결정

const usePatchNickname = (props: usePatchNicknameProps) => {
  const { handleSetIsValid, handleSetIsActive, nickname } = props;

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async ({ nickname }: patchNicknameProps) => {
      return await patchNickname(nickname);
    },
    onError: (err: AxiosError) => {
      const code = err.response?.status;
      if (code === 409) {
        // 닉네임 중복코드 : 409
        handleSetIsValid("duplicate");
        handleSetIsActive(false);
      } else if (code === 400) {
        handleSetIsValid("space");
        handleSetIsActive(false);
      } else {
        router.push("/error");
      }
    },
    onSuccess: () => {
      sessionStorage.setItem("nickname", nickname);
      router.push(`/?step=${1}`);
    },
  });

  return mutation;
};

export default usePatchNickname;

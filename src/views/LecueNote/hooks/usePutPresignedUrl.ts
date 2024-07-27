import { useRouter } from "next/navigation";
import { useMutation } from "react-query";

import putPresignedUrl from "../api/putPresignedUrl";
import { putPresignedUrlProps } from "./../type/lecueNoteType";

const usePutPresignedUrl = () => {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: ({
      presignedUrl,
      binaryFile,
      fileType,
    }: putPresignedUrlProps) => {
      return putPresignedUrl({ presignedUrl, binaryFile, fileType });
    },
    onError: () => router.push("/error"),
  });
  return { putMutation: mutation.mutate, isLoading: mutation.isLoading };
};

export default usePutPresignedUrl;

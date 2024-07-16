import { useMutation } from "react-query";

import { useRouter } from "next/navigation";

import { putPresignedUrl } from "../util/api";

interface usePutPresignedUrlProps {
  url: string;
  data: ArrayBuffer;
  contentType: string;
}

const usePutPresignedUrl = () => {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: ({ url, data, contentType }: usePutPresignedUrlProps) => {
      return putPresignedUrl(url, data, contentType);
    },
    onError: () => router.push("/error"),
  });
  return mutation;
};

export default usePutPresignedUrl;

import { useRouter } from "next/navigation";
import { useQuery } from "react-query";

import { getPresignedUrl } from "../util/api";

const useGetPresignedUrl = () => {
  const router = useRouter();
  const { isLoading, data } = useQuery({
    queryKey: ["get-presigned-url"],
    queryFn: () => getPresignedUrl(),
    onError: () => router.push("/error"),
    refetchOnWindowFocus: false,
  });

  return { isLoading, data };
};

export default useGetPresignedUrl;

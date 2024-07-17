import { useRouter } from "next/navigation";
import { useMutation } from "react-query";

import { postBook } from "../utils/api";

interface usePostBookProps {
  favoriteName: string;
  favoriteImage: string;
  title: string;
  description: string;
  backgroundColor: string;
}

const usePostBook = () => {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: ({
      favoriteName,
      favoriteImage,
      title,
      description,
      backgroundColor,
    }: usePostBookProps) => {
      return postBook({
        favoriteName,
        favoriteImage,
        title,
        description,
        backgroundColor,
      });
    },
    onError: () => router.push("/error"),
    onSuccess: (data) => {
      const { bookUuid } = data;
      router.push(`/lecue-book/${bookUuid}`);
    },
  });
  return mutation;
};

export default usePostBook;

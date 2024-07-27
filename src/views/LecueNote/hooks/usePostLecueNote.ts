import { useRouter } from "next/navigation";
import { useMutation } from "react-query";

import postLecueNote from "../api/postLecueNote";
import { postLecueNoteProps } from "../type/lecueNoteType";

const usePostLecueNote = () => {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: ({
      contents,
      color,
      fileName,
      bgColor,
      isIconClicked,
      bookId,
    }: postLecueNoteProps) => {
      return postLecueNote({
        contents,
        color,
        fileName,
        bgColor,
        isIconClicked,
        bookId,
      });
    },
    onError: () => router.push("/error"),
    onSuccess: (data) => {
      const bookUuid = data.data.data.bookUuid;
      router.push(`/lecue-book/${bookUuid}`);
    },
  });
  return { postMutation: mutation.mutate, isLoading: mutation.isLoading };
};

export default usePostLecueNote;

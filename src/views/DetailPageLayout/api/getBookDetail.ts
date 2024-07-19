import { api } from "../../../libs/api";

export async function getBookDetail(bookUuid: string) {
  // 여기도 오류
  const data = await api().get(`/api/books/detail/${bookUuid}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return data.data.data;
}

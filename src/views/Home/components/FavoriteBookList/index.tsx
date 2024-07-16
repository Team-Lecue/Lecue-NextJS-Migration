import useGetFavorite from "@/libs/hooks/useGetFavorite";
import BookList from "../BookList";

function FavoriteBookList() {
  const { data } = useGetFavorite();

  return <BookList title="즐겨찾기한 레큐북" data={data} />;
}

export default FavoriteBookList;

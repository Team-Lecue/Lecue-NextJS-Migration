import useGetLecueBook from "../../hooks/useGetLecueBook";
import BookList from "../BookList";

function LecueBookList() {
  const { data } = useGetLecueBook();

  return <BookList title="인기 레큐북 구경하기" data={data} />;
}

export default LecueBookList;

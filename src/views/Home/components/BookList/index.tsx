"use client";

import LecueBook from "../../../../common/LecueBook";
import NoBookmarkList from "../NoBookmarkList";
import * as S from "./LecueBookList.style";

interface BookProps {
  bookId: number;
  bookUuid: string;
  favoriteImage: string;
  favoriteName: string;
}

interface BookListProps {
  title: string;
  data: BookProps[];
}

function BookList({ title, data }: BookListProps) {
  const isBookmark = title.includes("즐겨찾기");

  return (
    <S.LecueBookListWrapper>
      <S.Title>{title}</S.Title>
      {data && data.length !== 0 ? (
        <S.LecueBookList>
          {data.map((book: BookProps) => (
            <S.LecueBook key={book.bookId} id={`${book.bookId}`}>
              <LecueBook
                bookId={book.bookId}
                bookUuid={book.bookUuid}
                favoriteImage={book.favoriteImage}
                favoriteName={book.favoriteName}
                bookType={isBookmark ? "favorite" : "normal"}
                deleteType="home"
              />
            </S.LecueBook>
          ))}
        </S.LecueBookList>
      ) : (
        <NoBookmarkList />
      )}
    </S.LecueBookListWrapper>
  );
}

export default BookList;

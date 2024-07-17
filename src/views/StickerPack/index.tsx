"use client";

import { useEffect, useState } from "react";
import LoadingPage from "../LoadingPage";
import StickerPackLayout from "../StickerPackLayout/page/StickerPackLayout";

function StickerPack() {
  const [bookId, setBookId] = useState<number>();

  useEffect(() => {
    const storeBookId = Number(sessionStorage.getItem("bookId"));
    setBookId(storeBookId);
  }, []);

  return bookId ? <StickerPackLayout bookId={bookId} /> : <LoadingPage />;
}

export default StickerPack;

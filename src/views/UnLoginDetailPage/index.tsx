"use client";

import { useParams } from "next/navigation";
import useGetBookDetail from "../DetailPageLayout/hooks/useGetBookDetail";
import DetailPageLayout from "../DetailPageLayout/page/DetailPageLayout";

// 비로그인 시 메인페이지 -> 분기

function UnLoginDetailPage() {
  const { bookUuid } = useParams();

  const { bookDetail, isLoading } = useGetBookDetail(bookUuid as string);

  return <DetailPageLayout bookDetail={bookDetail} isLoading={isLoading} />;
}

export default UnLoginDetailPage;

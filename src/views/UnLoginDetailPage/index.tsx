"use client";

import { useParams } from "next/navigation";
import useGetBookDetail from "../DetailPageLayout/hooks/useGetBookDetail";
import DetailPageLayout from "../DetailPageLayout/page/DetailPageLayout";

// 비로그인 시 메인페이지 -> 분기

function UnLoginDetailPage() {
  const { bookUuid = "42d87be0-3626-4ad6-a238-5e6c85ad58db" } = useParams();

  const { bookDetail, isLoading } = useGetBookDetail(bookUuid as string);

  return <DetailPageLayout bookDetail={bookDetail} isLoading={isLoading} />;
}

export default UnLoginDetailPage;

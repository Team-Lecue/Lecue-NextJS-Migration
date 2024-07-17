import { useParams } from "next/navigation";

import useGetBookDetailLogin from "../DetailPageLayout/hooks/useGetBookDetailLogin";
import DetailPageLayout from "../DetailPageLayout/page/DetailPageLayout";

// 로그인 시 메인페이지 -> 분기

function LoginDetailPage() {
  const { bookUuid } = useParams();
  const { bookDetail, isLoading } = useGetBookDetailLogin(bookUuid);

  return <DetailPageLayout bookDetail={bookDetail} isLoading={isLoading} />;
}

export default LoginDetailPage;

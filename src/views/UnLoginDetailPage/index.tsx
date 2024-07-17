import { useSearchParams } from "next/navigation";
import useGetBookDetail from "../DetailPageLayout/hooks/useGetBookDetail";
import DetailPageLayout from "../DetailPageLayout/page/DetailPageLayout";

function UnLoginDetailPage() {
  const searchParams = useSearchParams();
  const bookUuid = searchParams.get("bookUuid") as string;

  const { bookDetail, isLoading } = useGetBookDetail(bookUuid);

  return <DetailPageLayout bookDetail={bookDetail} isLoading={isLoading} />;
}

export default UnLoginDetailPage;

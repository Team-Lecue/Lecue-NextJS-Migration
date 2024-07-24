import TargetPage from "@/views/Target/page/TargetPage";
import { getPresignedUrl } from "@/views/Target/util/api";

async function page() {
  const data = await getPresignedUrl();

  return <TargetPage presignedURLData={data} />;
}

export default page;

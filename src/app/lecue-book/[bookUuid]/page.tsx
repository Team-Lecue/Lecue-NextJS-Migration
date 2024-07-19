import dynamic from "next/dynamic";

const Detail = dynamic(() => import("@/views/Detail"), {
  ssr: false,
});

function page() {
  return <Detail />;
}

export default page;

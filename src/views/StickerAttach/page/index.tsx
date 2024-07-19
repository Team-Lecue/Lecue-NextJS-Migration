import dynamic from "next/dynamic";

const Detail = dynamic(() => import("@/views/Detail"), {
  ssr: false,
});

function StickerAttach() {
  return <Detail />;
}

export default StickerAttach;

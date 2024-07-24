import dynamic from "next/dynamic";
import CommonModalForm from "./CommonModalForm";
const ModalPortal = dynamic(() => import("./ModalPortal"));

interface CommonModal {
  setModalOn: React.Dispatch<React.SetStateAction<boolean>>;
  category: string;
  handleFn: () => void;
}

function CommonModal({ setModalOn, category, handleFn }: CommonModal) {
  return (
    <ModalPortal>
      <CommonModalForm
        onClose={() => setModalOn(false)}
        category={category}
        handleFn={handleFn}
      />
    </ModalPortal>
  );
}

export default CommonModal;

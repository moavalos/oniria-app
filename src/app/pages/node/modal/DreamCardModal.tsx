import Card from "@/app/shared/components/Card";
import ModalBackdrop from "./ModalBackdrop";
import ModalHeader from "./ModalHeader";
import ModalActions from "./ModalActions";
import "./styles/DreamCardModal.css";

type DreamCardModalProps = {
  title: string;
  onClose: () => void;
  onSave: () => void;
  onReinterpret: () => void;
  isVisible: boolean;
  children?: React.ReactNode;
};

export default function DreamCardModal({
  title,
  onClose,
  onSave,
  onReinterpret,
  isVisible,
  children,
}: DreamCardModalProps) {
  if (!isVisible) return null;

  return (
    <div className="modal-overlay">
      <ModalBackdrop onClick={onClose} />

      <Card className="relative w-full max-w-screen-sm sm:max-w-md md:max-w-lg border border-white/15 bg-white/10 backdrop-blur-md p-4 sm:p-5 shadow-[0_0_35px_rgba(217,70,239,0.25)]">
        <ModalHeader title={title} onClose={onClose} />

        <div className="modal-content">{children}</div>

        <ModalActions onSave={onSave} onReinterpret={onReinterpret} />
      </Card>
    </div>
  );
}

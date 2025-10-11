type ModalBackdropProps = {
    onClick: () => void;
};

export default function ModalBackdrop({ onClick }: ModalBackdropProps) {
    return <div className="modal-backdrop" onClick={onClick} />;
}
import SaveIcon from "@/app/features/components/icons/SaveIcon";
import SparklesIcon from "@/app/features/components/icons/SparklesIcon";
import { useTranslation } from "react-i18next";

type ModalActionsProps = {
    onSave: () => void;
    onReinterpret: () => void;
};

export default function ModalActions({ onSave, onReinterpret }: ModalActionsProps) {
    const { t } = useTranslation();

    return (
        <div className="modal-actions">
            <button onClick={onSave} className="modal-button modal-button-save">
                <SaveIcon />
                {t("node.guardar")}
            </button>

            <button onClick={onReinterpret} className="modal-button modal-button-reinterpret">
                <SparklesIcon />
                {t("node.reinterpretar")}
            </button>
        </div>
    );
}
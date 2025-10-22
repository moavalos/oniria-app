import { useTranslation } from "react-i18next";
import Icon from "@/assets/icons/Icon";

export type SaveState = "idle" | "saving" | "saved";

type ModalActionsProps = {
  onSave: () => void | Promise<void>;
  onReinterpret: () => void;
  visibility?: boolean;
  saveState: SaveState;
};

export default function ModalActions({
  onSave,
  onReinterpret,
  visibility = true,
  saveState,
}: ModalActionsProps) {
  const { t } = useTranslation();

  const handleSave = async () => {
    if (saveState !== "idle") return; // Prevenir clicks múltiples
    try {
      const res: any = await onSave();
      const ok = res?.ok ?? true; // Asumir éxito si no hay respuesta
      if (!ok) throw new Error("save failed");
    } catch (error) {
      console.error("Error saving:", error);
    }
  };

  const getSaveButtonText = () => {
    switch (saveState) {
      case "saving":
        return "Guardando...";
      case "saved":
        return "Guardado";
      default:
        return "Guardar";
    }
  };

  const getSaveButtonClass = () => {
    let baseClass = "modal-button modal-button-save";
    if (saveState === "saved") baseClass += " modal-button-saved";
    else if (saveState === "saving") baseClass += " modal-button-saving";
    return baseClass;
  };

  const renderIcon = () => {
    if (saveState === "saving")
      return <Icon name="spinner" className="animate-spin" />;
    if (saveState === "saved") return <Icon name="check" />;
    return <Icon name="save" />;
  };

  return (
    <div
      className="modal-actions"
      style={{ display: visibility ? "flex" : "none" }}
    >
      <button
        onClick={handleSave}
        className={getSaveButtonClass()}
        disabled={saveState !== "idle"}
      >
        <span className="inline-flex items-center gap-2">
          {renderIcon()}
          <span>{getSaveButtonText()}</span>
        </span>
      </button>

      <button
        onClick={onReinterpret}
        className="modal-button modal-button-reinterpret"
      >
        <Icon name="sparkles" />
        {t("node.reinterpret")}
      </button>
    </div>
  );
}

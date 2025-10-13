import DreamCardModal from "./components/DreamCardModal";

interface HudSystemProps {
  dreamModalVisible?: boolean;
  onDreamModalClose?: () => void;
}

export default function HudSystem({
  dreamModalVisible = false,
  onDreamModalClose,
}: HudSystemProps) {
  console.log("HudSystem rendering - dreamModalVisible:", dreamModalVisible);
  return (
    <div
      className={`absolute inset-0 flex items-center justify-center z-50 p-4 ${
        dreamModalVisible ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      {/* Overlay de fondo cuando el modal está visible */}
      {dreamModalVisible && (
        <div
          className="absolute inset-0 bg-black/20 backdrop-blur-[1px]"
          onClick={onDreamModalClose}
        />
      )}

      <DreamCardModal
        visibility={dreamModalVisible}
        title="Interpretación de Sueño"
        text="Tu sueño revela aspectos profundos de tu subconsciente. Las imágenes y símbolos que experimentaste durante la noche tienen significados únicos que pueden ayudarte a comprender mejor tus emociones, deseos y preocupaciones internas."
        typingSpeed={80}
        onClose={onDreamModalClose}
        onSave={() => console.log("Guardar sueño")}
        onReinterpret={() => console.log("Reinterpretar")}
      />
    </div>
  );
}

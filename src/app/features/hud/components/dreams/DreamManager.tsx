import ModalActions, {
  type SaveState,
} from "@/app/pages/node/modal/ModalActions";
import HudMenu from "@/app/shared/components/menu/CardMenu";
import Badge from "@/app/shared/components/Badge";
import { useCallback, useEffect, useRef, useState } from "react";
import { useEngineStore, type Dream } from "@/engine";
import useDreamService from "./hooks/useDreamService";
import { useEngineAPI } from "../../../../../engine/core/context/EngineApiProvider";

interface DreamManagerProps {
  visibility?: boolean;
  actionsVisible?: boolean;
  typingSpeed?: number; // caracteres por segundo
  onClose?: () => void;
  onSave?: () => void;
  onReinterpret?: () => void;
}

export default function DreamManager({
  visibility = true,
  actionsVisible = true,
  typingSpeed = 40,
  onClose,
  onSave,
  onReinterpret,
}: DreamManagerProps) {
  // Obtener el dream del store
  const dream = useEngineStore((state) => state.dream);
  const service = useDreamService();
  const textRef = useRef<HTMLDivElement>(null);
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [currentText, setCurrentText] = useState(""); // Para trackear cambios de texto
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [showCloseBadge, setShowCloseBadge] = useState(false);
  const hasInitialized = useRef(false); // Para controlar la primera animación
  const engine = useEngineAPI();

  const startTypingAnimation = useCallback(
    (fullText: string, speed: number) => {
      const cleanText = fullText
        .replace(/^undefined/i, "")
        .replace(/undefined$/i, "")
        .trim();

      if (!cleanText) return;

      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);

      setDisplayedText("");
      setIsTyping(true);

      let currentIndex = 0;
      const intervalTime = 1000 / speed;

      setTimeout(() => {
        typingIntervalRef.current = setInterval(() => {
          setDisplayedText((prev) => {
            if (currentIndex < cleanText.length) {
              const next = prev + cleanText[currentIndex];
              currentIndex++;
              return next;
            } else {
              clearInterval(typingIntervalRef.current!);
              typingIntervalRef.current = null;
              setIsTyping(false);
              return prev;
            }
          });
        }, intervalTime);
      }, 50);
    },
    []
  );

  // Handler para guardar
  const handleSave = async () => {
    setSaveState("saving");

    if (!dream) {
      console.error("[DreamManager] No hay Nodo para guardar");
      setSaveState("idle");
      return;
    }
    await service.saveDream(dream);

    onSave?.();
    setSaveState("saved");
  };

  // Handler para reinterpretar
  const handleReinterpret = useCallback(() => {
    onReinterpret?.();
    setShowCloseBadge(false);
    setSaveState("idle");
  }, [onReinterpret]);

  // Handler para cerrar
  const handleClose = useCallback(() => {
    // Si no se ha guardado, mostrar badge de confirmación
    if (saveState !== "saved") {
      setShowCloseBadge(true);
    } else {
      onClose?.();
    }
  }, [saveState, onClose]);

  // Handler para confirmar cierre sin guardar
  const handleConfirmClose = useCallback(() => {
    onClose?.();
  }, [onClose]);

  // Handler para cancelar cierre
  const handleCancelClose = useCallback(() => {
    setShowCloseBadge(false);
  }, []);

  // Efecto para iniciar la animación al montar o cuando cambia el dream
  useEffect(() => {
    if (!dream || !dream.interpretation) return;

    const interpretationText = dream.interpretation;

    // Si es la primera vez o el texto cambió
    if (!hasInitialized.current || interpretationText !== currentText) {
      hasInitialized.current = true;
      setCurrentText(interpretationText);
      startTypingAnimation(interpretationText, typingSpeed);
    }
  }, [dream, currentText, startTypingAnimation, typingSpeed]);

  return (
    <HudMenu.Root className="w-full flex justify-end h-full">
      <HudMenu.Container className="max-w-lg h-full pb-5 w-full">
        <HudMenu.Header>
          <div className="flex items-center justify-between w-full">
            <h2 className="text-xl font-semibold font-orbitron text-primary ">
              {dream?.title || "INTERPRETACIÓN"}
            </h2>
            <HudMenu.CloseButton onClick={handleClose} />
          </div>
        </HudMenu.Header>
        <HudMenu.Body>
          <div className="modal-content overflow-y-scroll scrollbar flex-1">
            <div
              ref={textRef}
              className="text-light/75 font-normal leading-relaxed"
              style={{ minHeight: "300px" }}
            >
              {displayedText}
              {isTyping && (
                <span
                  style={{
                    marginLeft: "2px",
                    animation: "blinkCursor 1s infinite",
                    display: "inline-block",
                  }}
                >
                  |
                </span>
              )}
            </div>
          </div>
          {/* Badge para confirmar cierre sin guardar */}
          {showCloseBadge && (
            <Badge
              message="¿Estás seguro de cerrar sin guardar la interpretación?"
              variant="warning"
              confirmText="Cerrar sin guardar"
              cancelText="Cancelar"
              onConfirm={handleConfirmClose}
              onCancel={handleCancelClose}
            />
          )}

          {/* Badge de nueva funcionalidad - Generación de imagen */}
          <Badge
            title={
              saveState === "saved"
                ? "¡Tu imagen ya está lista!"
                : "Nueva funcionalidad"
            }
            message={
              saveState === "saved"
                ? "Tu interpretación ha sido transformada en una imagen única."
                : "¿Sabías que ahora nuestra IA te genera una imagen de la interpretación para que tus sueños puedan cobrar aún más vida?"
            }
            variant="feature"
            linkText={saveState !== "saved" ? "Saber más" : undefined}
            onLinkClick={
              saveState !== "saved"
                ? () => {
                    console.log(
                      "[DreamManager] Learn more about image generation"
                    );
                    // TODO: Abrir modal o navegación con info de la feature
                  }
                : undefined
            }
            confirmText={saveState === "saved" ? "Ver imagen" : undefined}
            onConfirm={
              saveState === "saved"
                ? () => {
                    engine.showImage(dream?.imageUrl || "");
                  }
                : undefined
            }
            showButtons={saveState === "saved"}
          />
        </HudMenu.Body>
        <HudMenu.Footer className="flex justify-end">
          <ModalActions
            onSave={handleSave}
            onReinterpret={handleReinterpret}
            visibility={actionsVisible}
            saveState={saveState}
          />
        </HudMenu.Footer>
      </HudMenu.Container>
    </HudMenu.Root>
  );
}

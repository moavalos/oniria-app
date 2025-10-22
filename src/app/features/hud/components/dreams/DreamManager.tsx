import ModalActions, {
  type SaveState,
  type ImageGenerationState,
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
  const [imageState, setImageState] = useState<ImageGenerationState>("idle");
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
      // Si hay imagen visible, iniciar cierre y esperar a que termine la animación
      if (imageState === "generated") {
        engine.image.hide();
        // Esperar al evento image:destroyed antes de cerrar
        engine.image.onDestroyed(() => {
          onClose?.();
        });
      } else {
        onClose?.();
      }
    }
  }, [saveState, imageState, engine, onClose]);

  // Handler para confirmar cierre sin guardar
  const handleConfirmClose = useCallback(() => {
    // Si hay imagen visible, iniciar cierre y esperar a que termine la animación
    if (imageState === "generated") {
      engine.image.hide();
      // Esperar al evento image:destroyed antes de cerrar
      engine.image.onDestroyed(() => {
        onClose?.();
      });
    } else {
      onClose?.();
    }
  }, [imageState, engine, onClose]);

  // Handler para cancelar cierre
  const handleCancelClose = useCallback(() => {
    setShowCloseBadge(false);
  }, []);

  // Handler para generar imagen
  const handleGenerateImage = useCallback(() => {
    if (!dream?.imageUrl) return;

    setImageState("generating");
    // Llamar al engine para mostrar la imagen
    engine.image.show(dream.imageUrl);
  }, [dream, engine]);

  // Handler para descargar imagen
  const handleDownloadImage = useCallback(() => {
    if (!dream?.imageUrl) return;

    // Crear un enlace temporal y hacer click automático para descargar
    const link = document.createElement("a");
    link.href = dream.imageUrl;
    link.download = `dream-${dream.title || "interpretation"}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [dream]);

  // Escuchar evento de imagen lista
  useEffect(() => {
    if (!engine) return;

    // Suscribirse al evento usando la API pública
    engine.image.onReady(() => {
      console.log("[DreamManager] Imagen lista");
      setImageState("generated");
    });
  }, [engine]);

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
              saveState === "saved" && imageState === "generated"
                ? "¡Tu imagen ya está lista!"
                : saveState === "saved" && imageState === "generating"
                ? "Generando tu imagen..."
                : saveState === "saved"
                ? "¡Interpretación guardada!"
                : "Nueva funcionalidad"
            }
            message={
              saveState === "saved" && imageState === "generated"
                ? "Tu interpretación ha sido transformada en una imagen única."
                : saveState === "saved" && imageState === "generating"
                ? "Estamos creando una imagen visual de tu sueño. Esto puede tomar unos momentos..."
                : saveState === "saved"
                ? "Tu interpretación ha sido transformada en una experiencia visual única."
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
            confirmText={
              saveState === "saved" && imageState === "idle"
                ? "Generar imagen"
                : saveState === "saved" && imageState === "generating"
                ? "Generando..."
                : saveState === "saved" && imageState === "generated"
                ? "Descargar imagen"
                : undefined
            }
            onConfirm={
              saveState === "saved" && imageState === "idle"
                ? handleGenerateImage
                : saveState === "saved" && imageState === "generated"
                ? handleDownloadImage
                : undefined
            }
            isLoading={saveState === "saved" && imageState === "generating"}
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

import DreamTextarea from "@/app/shared/components/DreamTextarea";
import HudMenu from "@/app/shared/components/menu/CardMenu";
import { useDreamInput } from "../../../home/hooks/useDreamInput";
import type { Dream, DreamFormType } from "@/engine";
import { useTranslation } from "react-i18next";
import Icon from "@/assets/icons/Icon";

interface DreamFormProps {
  maxChars?: number;
  onClose?: () => void;
  type: DreamFormType;
  data?: Dream | null;
  onInterpret: () => void;
}

export default function DreamForm({
  maxChars = 1200,
  onClose,
  onInterpret,
}: DreamFormProps) {
  const { t } = useTranslation();
  const { dream, dreamRef, handleTextChange, charsLeft, isTooLong, isEmpty } =
    useDreamInput({
      maxChars,
    });

  const handleClose = () => {
    onClose?.();
  };

  return (
    <HudMenu.Root className="flex items-start h-fit gap-3">
      <HudMenu.Container className="w-96 max-w-full flex pb-5 flex-col gap-4 mt-20 ml-20">
        <HudMenu.Header>
          <div className="flex items-center justify-between w-full">
            <h2 className="text-xl font-semibold font-orbitron text-primary ">
              {"VITACORA"}
            </h2>
            <HudMenu.CloseButton onClick={handleClose} />
          </div>
        </HudMenu.Header>

        <HudMenu.Body>
          <h2 className="text-sm">
            Hola Eliana, ¿Qué imágenes quedaron de tu sueño?
          </h2>
          <p className="text-xs text-text-muted">
            Escribí libremente, sin preocuparte por el orden. Oniria se
            encargará de interpretarlo.
          </p>
          <DreamTextarea
            ref={dreamRef}
            value={dream}
            onChange={handleTextChange}
            maxChars={maxChars}
            charsLeft={charsLeft}
            isTooLong={isTooLong}
          />
        </HudMenu.Body>
        <HudMenu.Footer className="flex justify-end">
          <button
            onClick={onInterpret}
            disabled={isEmpty || isTooLong}
            className="tap-button rounded-xl px-8 py-3 text-[14px] font-bold
                       disabled:opacity-60 disabled:cursor-not-allowed
                       transition-transform duration-200 disabled:bg-gray-500 bg-primary"
          >
            <span
              className={`flex items-center gap-2 text-light ${
                isEmpty || isTooLong ? "opacity-80" : "opacity-100"
              }`}
            >
              <Icon name="magic" />
              {t("node.interpretar")}
            </span>
          </button>
        </HudMenu.Footer>
      </HudMenu.Container>
      <HudMenu.Description className="text-sm max-w-sm mt-20">
        Estás en la Vitácora Onírica, el lugar donde los sueños toman forma.
        Cada palabra que escribas deja una huella en tu mapa interior,
        conectando recuerdos, símbolos y emociones. Este es tu espacio para
        registrar lo que el subconsciente te mostró mientras dormías.
      </HudMenu.Description>
    </HudMenu.Root>
  );
}

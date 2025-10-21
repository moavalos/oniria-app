import CtaButton from "@/app/shared/components/CtaButton";
import { useTranslation } from "react-i18next";
import { useHomePanel } from "@/app/features/home/hooks/useHomePanel";
import DreamTextarea from "@/app/shared/components/DreamTextarea";
import QuoteCard from "@/app/shared/components/QuoteCard";
import MenuButton from "@/app/shared/components/MenuButton";
import SettingsIcon from "@/assets/icons/store/SettingsIcon";
import BadgeIcon from "@/assets/icons/store/BadgeIcon";
import ClockIcon from "@/assets/icons/store/ClockIcon";
import { useState } from "react";
import Card from "@/app/shared/components/Card";


type HomeVariantProps = {
  variant: "home";
  onInterpretar?: (_dream: string) => void;
  onPersonalizar?: () => void;
  onInsignias?: () => void;
  onBackToHome?: () => void;
  initialDream?: string;
  maxChars?: number;
  onNuevaFrase?: () => void;
  quote?: string;
  loadingQuote?: boolean;
  showQuoteCard?: boolean;
  scrollable?: boolean;
}

export function HomePanel(props: HomeVariantProps) {
  const { showQuoteCard = true } = props;
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);

  const {
    dream,
    dreamRef,
    charsLeft,
    isEmpty,
    isTooLong,
    handleTextChange,
    handleInterpretar,
    quoteText,
    isLoadingQuote,
    handleNuevaFrase,
    handlePersonalizar,
    handleInsignias,
    handleNavigateHistory,
    handleCtaClick,
  } = useHomePanel({
    initialDream: props.initialDream,
    maxChars: props.maxChars,
    onNuevaFrase: props.onNuevaFrase,
    quote: props.quote,
    loadingQuote: props.loadingQuote,
    onInterpretar: props.onInterpretar,
    onPersonalizar: props.onPersonalizar,
    onInsignias: props.onInsignias,
  });

  const onInterpretarClick = async () => {
    if (isEmpty || isTooLong) return;
    setExpanded(true);
    await handleInterpretar();
  };

  const onBackHome = () => {
    props.onBackToHome?.();
    setExpanded(false);
  };

  return (
    <Card.Container
      className={`col-span-12 md:col-span-3 min-w-[300px] text-[15px] space-y-3 transition-all duration-300 overflow-y-hidden`}
      scrollable={props.scrollable}
    >
      {/* Flechita volver a home solo en modo expandido */}
      {expanded && (
        <button
          type="button"
          onClick={onBackHome}
          className="mb-3 -mt-2 inline-flex items-center gap-2 text-[12px] font-semibold rounded-lg px-2 py-1
                     transition-colors duration-200"
          style={{
            color: "var(--text-80)",
            backgroundColor: "var(--surface-subtle)",
          }}
          aria-label={t("volverHome") || "Volver a home"}
        >
          ← {t("volverHome", "Volver a home")}
        </button>
      )}

      {/* Dream Input Section - se hace largo cuando expanded */}
      <Card.Root>
        <Card.Title>{t("node.title")}</Card.Title>
        <Card.Description>{t("node.descriptionLabel")}</Card.Description>
        <Card.Body
          className={`
            overflow-hidden transition-all duration-300
            ${expanded ? "min-h-[48vh]" : "min-h-[160px]"}
          `}
        >
          <DreamTextarea
            ref={dreamRef}
            value={dream}
            onChange={handleTextChange}
            maxChars={props.maxChars ?? 1200}
            charsLeft={charsLeft}
            isTooLong={isTooLong}
          />

          {!expanded && (
            <button
              onClick={onInterpretarClick}
              disabled={isEmpty || isTooLong}
              className="tap-button mt-4 w-full rounded-xl px-4 py-3 text-[14px] font-bold
                       disabled:opacity-60 disabled:cursor-not-allowed
                       transition-transform duration-200"
              style={{
                background: `linear-gradient(to right, var(--btn-primary-from), var(--btn-primary-to))`,
                border: `1px solid var(--btn-primary-border)`,
                boxShadow: `var(--btn-primary-glow)`,
              }}
            >
              <span className="inline-flex items-center gap-2">
                {t("node.interpretar")}
              </span>
            </button>
          )}
        </Card.Body>
      </Card.Root>

      {/*SOLO si NO esta expandido */}
      {!expanded && showQuoteCard && (
        <QuoteCard
          quote={quoteText}
          isLoading={isLoadingQuote}
          onRefresh={handleNuevaFrase}
        />
      )}

      {!expanded && (
        <Card.Root>
          <Card.Title>{t("node.myroom")}</Card.Title>
          <Card.Description>{t("node.myroomDesc")}</Card.Description>

          <Card.Body>
            <MenuButton
              icon={<SettingsIcon />}
              title={t("node.personalizar")}
              description={t("node.toque")}
              onClick={handlePersonalizar}
            />

            <MenuButton
              icon={<BadgeIcon />}
              title={t("node.insignia")}
              description={t("node.descriptionInsignia")}
              onClick={handleInsignias}
            />

            <MenuButton
              icon={<ClockIcon />}
              title={t("historial.link")}
              description={t("historial.verSuenos")}
              onClick={handleNavigateHistory}
            />
          </Card.Body>
        </Card.Root>
      )}

      {!expanded && (
        <CtaButton
          ctaText={t("historial.oniriaPro")}
          onClick={handleCtaClick}
          disabled={false}
          pressed={false}
        />
      )}
    </Card.Container>
  );
}

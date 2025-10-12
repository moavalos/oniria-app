import { useTranslation } from "react-i18next";

type DreamTextareaProps = {
  value: string;
  onChange: (_value: string) => void;
  maxChars: number;
  charsLeft: number;
  isTooLong: boolean;
  ref: React.Ref<HTMLTextAreaElement>;
};

export default function DreamTextarea({
  value,
  onChange,
  maxChars,
  charsLeft,
  isTooLong,
  ref,
}: DreamTextareaProps) {
  const { t } = useTranslation();


  return (
    <>
      <div className="flex items-center justify-between mb-2">
        <div className="text-[12px] font-semibold" style={{ color: "var(--text-80)" }}>
          {t("node.title")}
        </div>
        <div
          className="text-[11px]"
          style={{ color: isTooLong ? "var(--danger-300)" : "var(--color-text-50)" }}
        >
          {charsLeft}
        </div>
      </div>

      <label className="sr-only" htmlFor="dream-input">
        {t("node.descriptionLabel")}
      </label>
      <textarea
        ref={ref}
        id="dream-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t("node.placeholderNode")}
        className={`
          min-h-[160px] w-full resize-y rounded-xl
          border focus:outline-none focus:ring-2
          px-3 py-3 text-[13px] leading-relaxed
          placeholder:text-[var(--placeholder-text)]
          focus:ring-[var(--focus-ring)]
          bg-[var(--input-bg)] text-[var(--color-text-90)]
        `}
        style={{ borderColor: "var(--input-border)" }}
      />

      {isTooLong && (
        <div className="mt-2 text-[11px]" style={{ color: "var(--danger-300)" }}>
          {t("node.character1")} {maxChars} {t("node.character2")}
        </div>
      )}
    </>
  );
}
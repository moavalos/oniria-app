import { useTranslation } from "react-i18next";
import { useState } from "react";

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
  const [isFocused, setIsFocused] = useState(false);

  return (
    <>
      <label className="sr-only" htmlFor="dream-input">
        {t("node.descriptionLabel")}
      </label>
      <textarea
        ref={ref}
        id="dream-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={t("node.placeholderNode")}
        className={`
          min-h-[160px] w-full resize-y rounded-xl
          border focus:outline-none focus:ring-1
          px-3 py-3 text-[13px] leading-relaxed
          placeholder:text-[var(--placeholder-text)]
          focus:ring-[var(--focus-ring)]
          bg-[var(--input-bg)] text-[var(--color-text-90)]
          transition-colors duration-200
        `}
        style={{
          borderColor: isFocused ? "var(--focus-ring)" : "var(--input-border)",
        }}
      />
      <div className="flex items-center justify-end">
        <div
          className="text-[11px]"
          style={{
            color: isTooLong ? "var(--danger-300)" : "var(--color-text-50)",
          }}
        >
          {charsLeft}
        </div>
      </div>

      {isTooLong && (
        <div
          className="mt-2 text-[11px]"
          style={{ color: "var(--danger-300)" }}
        >
          {t("node.character1")} {maxChars} {t("node.character2")}
        </div>
      )}
    </>
  );
}

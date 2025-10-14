import ClearButton from "@/shared/components/ClearButton";
import FilterButton from "@/shared/components/FilterButton";
import { useMemo } from "react";

export type EmotionFilterProps = {
    items: Array<{ emotion?: string }>;
    selected: string[];
    onChange: (next: string[]) => void;
    className?: string;
};

export default function EmotionFilter({
    items,
    selected,
    onChange,
    className = "",
}: EmotionFilterProps) {

    const baseEmotions = [
        "Felicidad",
        "Tristeza",
        "Miedo",
        "Enojo",
    ];

    const options = useMemo(() => {
        const set = new Set<string>(baseEmotions);
        items.forEach((i) => i.emotion && set.add(i.emotion));
        return Array.from(set).sort((a, b) => a.localeCompare(b));
    }, [items]);

    const current = selected[0];

    const selectOne = (emo: string) => {
        if (current === emo) onChange([]);
        else onChange([emo]);
    };

    return (
        <div className={`mb-3 flex flex-wrap items-center gap-2 ${className}`}>
            {options.map((emo) => (
                <FilterButton
                    key={emo}
                    label={emo}
                    active={current === emo}
                    onClick={() => selectOne(emo)}
                />
            ))}

            {current && <ClearButton onClick={() => onChange([])} label="emoción seleccionada" />}
        </div>
    );
}
export type FilterButtonProps = {
    label: string;
    active: boolean;
    onClick: () => void;
};

export default function FilterButton({ label, active, onClick }: FilterButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-pressed={active}
            className={`relative px-3 py-1 rounded-full text-sm border backdrop-blur-sm 
                  transition-all duration-300 ease-out
                  ${active
                    ? `
                        border-[var(--btn-primary-border)] 
                        text-[var(--btn-star)] 
                        bg-[var(--surface-weak)] 
                        shadow-[0_0_10px_var(--btn-primary-glow)]
                        `
                    : `
                        border-[var(--surface-weak)] 
                        text-[var(--color-text-muted)] 
                        hover:text-[var(--color-text-primary)] 
                        hover:border-[var(--btn-primary-border)] 
                        hover:shadow-[0_0_6px_var(--btn-primary-glow)] 
                        hover:bg-[var(--surface-subtle)]
                        `
                }`}
        >
            {label}
        </button>
    );
}

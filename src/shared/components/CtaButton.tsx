import './styles/CtaButton.css';

type CtaButtonProps = {
    ctaText: string;
    onClick: () => void;
    disabled?: boolean;
    pressed?: boolean;
};

export default function CtaButton({
    ctaText,
    onClick,
    disabled = false,
}: CtaButtonProps) {

    return (
        <div className="mt-5">
            <button
                onClick={onClick}
                disabled={disabled}
                className={`cta-button group flex w-full items-center justify-center gap-1 rounded-xl
                    bg-gradient-to-r from-fuchsia-700 to-fuchsia-600
                    px-6 py-4 text-[15px] font-bold shadow-[0_0_25px_rgba(217,70,239,0.35)]
                    border border-fuchsia-400/30 hover:from-fuchsia-600 hover:to-fuchsia-600
                    disabled:opacity-60 disabled:cursor-not-allowed
                    transition-all duration-200`}
                aria-disabled={disabled}
            >
                {ctaText}
                <span
                    className="star-icon text-fuchsia-200 text-lg"
                    aria-hidden="true"
                >
                    ★
                </span>
            </button>
        </div>
    );
}
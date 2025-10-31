type ChevronRightIconProps = {
    className?: string;
    size?: number;
};

export default function ChevronRightIcon({
    className = "",
    size = 16
}: ChevronRightIconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="m9 18 6-6-6-6" />
        </svg>
    );
}
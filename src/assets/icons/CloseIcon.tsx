type CloseIconProps = {
    className?: string;
    size?: number;
};

export default function CloseIcon({ className = "", size = 16 }: CloseIconProps) {
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
            className={`cursor-pointer ${className}`}
        >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
        </svg>
    );
}
type HeaderLogoProps = {
    text?: string;
    onClick?: () => void;
};

export default function HeaderLogo({ text, onClick }: HeaderLogoProps) {
    return (
        <div className="header-logo" onClick={onClick}>
            <span className="header-logo-text">{text}</span>
        </div>
    );
}
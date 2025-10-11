import BellIcon from "../icons/BellIcon";

type NotificationButtonProps = {
    onClick?: () => void;
};

export default function NotificationButton({ onClick }: NotificationButtonProps) {
    return (
        <button
            onClick={onClick}
            className="header-button"
            aria-label="Notificaciones"
        >
            <BellIcon className="header-button-icon" />
        </button>
    );
}
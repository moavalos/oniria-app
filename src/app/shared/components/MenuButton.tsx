import type { ReactNode } from "react";
import ChevronRightIcon from "../../../assets/icons/store/ChevronRightIcon";

type MenuButtonProps = {
  icon: ReactNode;
  title: string;
  description: string;
  onClick: () => void;
};

export default function MenuButton({
  icon,
  title,
  description,
  onClick,
}: MenuButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full mb-3 flex items-center justify-between rounded-xl border px-3 py-3 transition-colors duration-200"
      style={{
        backgroundColor: "var(--menu-bg)",
        borderColor: "var(--menu-border)",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.backgroundColor = "var(--menu-hover-bg)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.backgroundColor = "var(--menu-bg)")
      }
    >
      <div className="flex items-center gap-3">
        <div
          className="h-9 w-9 rounded-full grid place-items-center border"
          style={{
            backgroundColor: "var(--menu-icon-bg)",
            borderColor: "var(--menu-icon-border)",
          }}
        >
          {icon}
        </div>

        <div className="leading-tight text-left">
          <div
            className="text-[12px] font-semibold"
            style={{ color: "var(--menu-text-title)" }}
          >
            {title}
          </div>
          <div
            className="text-[11px]"
            style={{ color: "var(--menu-text-description)" }}
          >
            {description}
          </div>
        </div>
      </div>

      <ChevronRightIcon className="transition-colors duration-200" />
    </button>
  );
}

import type { ComponentType, SVGProps } from "react";
import PortalIcon from "./store/PortalIcon";
import BadgeIcon from "./store/BadgeIcon";
import BellIcon from "./store/BellIcon";
import ChevronDownIcon from "./store/ChevronDownIcon";
import ChevronRightIcon from "./store/ChevronRightIcon";
import ClockIcon from "./store/ClockIcon";
import CloseIcon from "./store/CloseIcon";
import MenuIcon from "./store/MenuIcon";
import QuoteIcon from "./store/QuoteIcon";
import RefreshIcon from "./store/RefreshIcon";
import SaveIcon from "./store/SaveIcon";
import SettingsIcon from "./store/SettingsIcon";
import SparklesIcon from "./store/SparklesIcon";
import UserIcon from "./store/UserIcon";
import DreamJournal from './store/DreamJournal';
import NodeJournal from './store/NodeJournal';
import MagicIcon from './store/MagicIcon';


export type IconName =
    | "portal"
    | "badge"
    | "bell"
    | "chevron-down"
    | "chevron-right"
    | "clock"
    | "close"
    | "menu"
    | "quote"
    | "refresh"
    | "save"
    | "settings"
    | "sparkles"
    | "user"
    | "dreamJournal"
    | "nodeJournal"
    | "magic";

export type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export const iconsStore: Record<IconName, IconComponent> = {
    portal: PortalIcon,
    badge: BadgeIcon,
    bell: BellIcon,
    "chevron-down": ChevronDownIcon,
    "chevron-right": ChevronRightIcon,
    clock: ClockIcon,
    close: CloseIcon,
    menu: MenuIcon,
    quote: QuoteIcon,
    refresh: RefreshIcon,
    save: SaveIcon,
    settings: SettingsIcon,
    sparkles: SparklesIcon,
    user: UserIcon,
    dreamJournal: DreamJournal,
    nodeJournal: NodeJournal,
    magic: MagicIcon,
};

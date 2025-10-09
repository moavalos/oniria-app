import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

type NavigationArrowsProps = {
    onPrev?: () => void;
    onNext?: () => void;
};

export default function NavigationArrows({ onPrev, onNext }: NavigationArrowsProps) {
    return (
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-8">
            <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={onPrev}
                className="grid place-items-center h-12 w-12 rounded-full 
                   bg-fuchsia-700/60 border border-fuchsia-400/40 text-white"
            >
                <ChevronDown className="rotate-90" />
            </motion.button>

            <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={onNext}
                className="grid place-items-center h-12 w-12 rounded-full 
                   bg-fuchsia-700/60 border border-fuchsia-400/40 text-white"
            >
                <ChevronDown className="-rotate-90" />
            </motion.button>
        </div>
    );
}

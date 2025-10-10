import Card from "@/shared/components/Card";
import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import CtaButton from "../../../features/auth/components/CtaButton";
import type { TimelineItem } from "../model/TimelineItem";

type SidebarProps = {
  title: string;
  description: string;
  ctaText: string;
  timeline: TimelineItem[];
  initialSelectedId?: number;
  onSelectItem?: (_item: TimelineItem) => void;
  onCta?: (_item: TimelineItem) => void;
  ctaDisabled?: boolean;
  loading?: boolean;
};

export default function Sidebar({
  title,
  description,
  ctaText,
  timeline,
  initialSelectedId,
  onSelectItem,
  onCta,
  ctaDisabled = false,
  loading = false
}: SidebarProps) {
  const initialSelected: number | undefined =
    initialSelectedId ??
    timeline.find((t) => t.active)?.id ??
    (timeline.length ? timeline[0].id : undefined);

  const [selectedId, setSelectedId] = useState<number | undefined>(initialSelected);

  const [ctaPressed, setCtaPressed] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!timeline.length) {
      setSelectedId(undefined);
      return;
    }
    const nextSelected =
      initialSelectedId ??
      timeline.find((t) => t.active)?.id ??
      timeline[0].id;
    setSelectedId(nextSelected);
  }, [loading, timeline, initialSelectedId]);

  const items = useMemo(
    () =>
      timeline.map((t) => ({
        ...t,
        active: t.id === selectedId,
      })),
    [timeline, selectedId]
  );

  const selectedIndex = useMemo(
    () => items.findIndex((i) => i.id === selectedId),
    [items, selectedId]
  );

  const selectedItem = useMemo(
    () => (selectedIndex >= 0 ? items[selectedIndex] : undefined),
    [items, selectedIndex]
  );

  const progress = useMemo(() => {
    if (items.length <= 1) return items.length === 1 ? 1 : 0;
    return Math.max(0, selectedIndex) / (items.length - 1);
  }, [items.length, selectedIndex]);

  const handleSelect = useCallback((id: number) => {
    setSelectedId(id);
    const found = timeline.find((t) => t.id === id);
    if (found && onSelectItem) onSelectItem(found);
  }, [timeline, onSelectItem]);

  const handleCTA = useCallback(async () => {
    if (!selectedItem || ctaDisabled) return;
    setCtaPressed(true);
    try {
      await onCta?.(selectedItem);
    } finally {
      setTimeout(() => setCtaPressed(false), 400);
    }
  }, [onCta, selectedItem, ctaDisabled]);

  const listRef = useRef<HTMLUListElement | null>(null);
  const itemRefs = useRef<Map<number, HTMLLIElement>>(new Map());

  // Auto-scroll al item seleccionado
  useEffect(() => {
    if (selectedId === undefined) return;

    const itemElement = itemRefs.current.get(selectedId);
    const listElement = listRef.current;

    if (!itemElement || !listElement) return;

    // Calcular posición del item
    const itemRect = itemElement.getBoundingClientRect();
    const listRect = listElement.getBoundingClientRect();

    // Si el item está fuera de la vista, hacer scroll
    const isAboveView = itemRect.top < listRect.top;
    const isBelowView = itemRect.bottom > listRect.bottom;

    if (isAboveView || isBelowView) {
      itemElement.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [selectedId]);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;

    const onKey = (e: KeyboardEvent) => {
      if (!["ArrowUp", "ArrowDown", "Enter"].includes(e.key)) return;
      e.preventDefault();
      if (e.key === "ArrowUp") {
        const idx = Math.max(0, selectedIndex - 1);
        handleSelect(items[idx]?.id);
      } else if (e.key === "ArrowDown") {
        const idx = Math.min(items.length - 1, selectedIndex + 1);
        handleSelect(items[idx]?.id);
      } else if (e.key === "Enter") {
        handleCTA();
      }
    };

    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [items, selectedIndex, handleSelect, handleCTA]);

  return (
    <Card className="col-span-12 md:col-span-4 xl:col-span-4 p-6 h-[88vh] overflow-y-auto text-[15px]">
      {/* título y descripción */}
      <div className="mb-2 text-[15px] font-semibold text-white/85">
        {title}
      </div>
      <div className="text-[12px] text-white/50 mb-5">{description}</div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-6 w-full rounded bg-white/10 animate-pulse" />
          ))}
        </div>
      ) : (
        <>
          {/* timeline con barra base y barra de progreso animada */}
          <div className="relative">
            <div className="absolute left-3 top-2 bottom-2 w-[3px] rounded bg-white/15" />

            <motion.div
              className="absolute left-3 top-2 w-[3px] rounded bg-fuchsia-400"
              style={{ height: 0 }}
              animate={{ height: `calc(${progress * 100}% + 6px)` }}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
            />

            <ul
              ref={listRef}
              tabIndex={0}
              className="space-y-6 pl-10 pr-2 outline-none"
              aria-label="Línea de tiempo"
            >
              {items.map((n) => {
                const isActive = n.active;
                return (
                  <li
                    key={n.id}
                    className="relative"
                    ref={(el) => {
                      if (el) {
                        itemRefs.current.set(n.id, el);
                      } else {
                        itemRefs.current.delete(n.id);
                      }
                    }}
                  >
                    {/* punto */}
                    <button
                      type="button"
                      onClick={() => handleSelect(n.id)}
                      aria-pressed={isActive}
                      aria-current={isActive ? "step" : undefined}
                      className="absolute -left-[34px] top-[2px] h-[16px] w-[16px] rounded-full ring-2 
                             focus:outline-none focus-visible:ring-4 focus-visible:ring-fuchsia-400/50
                             transition"
                      style={{
                        background: isActive ? "rgb(232 121 249)" : "transparent",
                        boxShadow: isActive
                          ? "0 0 18px rgba(232,121,249,0.6)"
                          : "none",
                      }}
                    >
                      <AnimatePresence>
                        {isActive && (
                          <motion.span
                            key={`pulse-${n.id}`}
                            className="absolute inset-[-6px] rounded-full border border-fuchsia-400/50"
                            initial={{ opacity: 0, scale: 0.6 }}
                            animate={{ opacity: 1, scale: 1.1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.35 }}
                          />
                        )}
                      </AnimatePresence>
                    </button>

                    {/* contenido */}
                    <button
                      type="button"
                      onClick={() => handleSelect(n.id)}
                      className="text-left group"
                    >
                      <div className="text-[11px] text-white/60 group-hover:text-white/80 transition-colors">
                        {n.date}
                      </div>
                      <motion.div
                        layout
                        className={`truncate ${isActive ? "text-white font-semibold" : "text-white/85"
                          }`}
                      >
                        {n.title}
                      </motion.div>
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            key={`underline-${n.id}`}
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            className="h-[2px] w-10 mt-1 rounded bg-fuchsia-400/70"
                          />
                        )}
                      </AnimatePresence>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* CTA */}
          <CtaButton
            ctaText={ctaText}
            onClick={handleCTA}
            disabled={ctaDisabled || !selectedItem}
            pressed={ctaPressed}
          />
        </>
      )}
    </Card>
  );
}

import Card from "@/shared/components/Card";
import { useCallback, useMemo, useRef, useState } from "react";
import type { TimelineItem } from "../model/TimelineItem";
import { useTimelineScroll } from "./timeLine/hooks/useTimelineScroll";
import { useTimelineKeyboard } from "./timeLine/hooks/useTimelineKeyboard";
import SidebarHeader from "./SidebarHeader";
import TimelineProgressBar from "./timeLine/TimelineProgressBar";
import TimelineList from "./timeLine/TimelineList";
import CtaButton from "@/app/features/components/CtaButton";
import './styles/Sidebar.css';

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
  loading = false,
}: SidebarProps) {

  const initialSelected =
    initialSelectedId ??
    timeline.find((t) => t.active)?.id ??
    (timeline.length ? timeline[0].id : undefined);

  const [selectedId, setSelectedId] = useState<number | undefined>(initialSelected);
  const [ctaPressed, setCtaPressed] = useState(false);

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
    () => items[selectedIndex],
    [items, selectedIndex]
  );

  const progress = useMemo(() => {
    if (items.length <= 1) return items.length === 1 ? 1 : 0;
    return Math.max(0, selectedIndex) / (items.length - 1);
  }, [items.length, selectedIndex]);

  const handleSelect = useCallback(
    (id: number) => {
      setSelectedId(id);
      const found = timeline.find((t) => t.id === id);
      if (found && onSelectItem) onSelectItem(found);
    },
    [timeline, onSelectItem]
  );

  const handleCTA = useCallback(async () => {
    if (!selectedItem || ctaDisabled) return;
    setCtaPressed(true);
    try {
      await onCta?.(selectedItem);
    } finally {
      setTimeout(() => setCtaPressed(false), 400);
    }
  }, [onCta, selectedItem, ctaDisabled]);

  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<Map<number, HTMLLIElement>>(new Map());

  // Custom hooks
  useTimelineScroll({ selectedId, itemRefs, listRef });
  useTimelineKeyboard({
    listRef,
    items,
    selectedIndex,
    onSelect: handleSelect,
    onCta: handleCTA,
  });

  return (
    <Card className="col-span-12 md:col-span-4 xl:col-span-4 p-6 h-[88vh] overflow-y-auto text-[15px]">
      <SidebarHeader title={title} description={description} />

      {loading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-6 w-full rounded bg-white/10 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <>
          <div className="relative">
            <TimelineProgressBar progress={progress} selectedId={selectedId} />
            <TimelineList
              items={items}
              selectedId={selectedId}
              onSelect={handleSelect}
              listRef={listRef}
              itemRefs={itemRefs}
            />
          </div>

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
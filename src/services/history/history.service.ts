import type { TimelineItem } from "@/app/pages/history/model/TimelineItem";

const DB_URL = "/historial.json";

async function loadTimeline(): Promise<TimelineItem[]> {
    const response = await fetch(DB_URL);
    const data = await response.json();
    return data.timeline || [];
}

export async function getTimeline(): Promise<TimelineItem[]> {
    return loadTimeline();
}

export async function getDreamById(id: number): Promise<TimelineItem | undefined> {
    const timeline = await loadTimeline();
    return timeline.find((item) => item.id === id);
}
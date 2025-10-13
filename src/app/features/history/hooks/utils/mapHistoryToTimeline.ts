import type { TimelineItem } from "../../model/TimelineItem";
import type { HistoryApiResponse } from "../../services/history.service";
import { formatDateLabel } from "./formatDateLabel";

export function mapHistoryToTimeline(response: HistoryApiResponse): TimelineItem[] {
    return response.data.map((item, index) => ({
        id: index + 1,
        nodeId: item.id,
        title: item.title,
        interpretation: item.interpretation,
        creationDate: formatDateLabel(item.creationDate),
        active: index === 0,
    }));

}

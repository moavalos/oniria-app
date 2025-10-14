export type NodeListItem = {
    id: string;
    title: string;
    interpretation: string;
    creationDate: string;
};

export type HistoryApiResponse = {
    data: NodeListItem[];
    pagination: {
        currentPage: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
};

export type HistoryFilters = {
    state?: "draft" | "published" | "archived" | string;
    privacy?: "public" | "private" | string;
    emotion?: string | string[];
    search?: string;
    from?: string;
    to?: string;
};

export type HistoryPagination = {
    page?: number;
    limit?: number;
};
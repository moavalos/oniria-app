export type HistoryApiResponse = {
    id: string;
    date: string;
    title: string;
}

export class HistoryService {

    async fetchHistory(): Promise<HistoryApiResponse[]> {
        const response = await fetch('http://localhost:3000/api/dreams/history', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error fetching history: ${response.statusText}`);
        }

        const data: HistoryApiResponse[] = await response.json();
        return data;
    }
}
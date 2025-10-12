import type { Quote } from "../model/Quotes";

export type QuotesAPIResponse = {
    Quotes: Quote[];
};

export class QuotesService {

    async fetchQuotes(): Promise<QuotesAPIResponse> {
        const response = await fetch('http://localhost:3000/api/dreams/quotes', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error fetching quotes: ${response.statusText}`);
        }

        const data: QuotesAPIResponse = await response.json();
        return data;

    }

}
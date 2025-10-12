export type Quote = string | { text: string };

export type QuotesResponse = {
    quotes?: Quote[];
};
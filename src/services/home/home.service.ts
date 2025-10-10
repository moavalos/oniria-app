import type { Quote, QuotesResponse } from "@/app/pages/home/model/Quotes";

const DB_URL = "/example2.json";

async function fetchQuotes(): Promise<Quote[]> {
    const res = await fetch(DB_URL, { cache: "no-store" });
    if (!res.ok) return [];
    const data = (await res.json()) as QuotesResponse;
    return data.quotes ?? [];
}

export async function getRandomQuote(): Promise<string> {
    const list = await fetchQuotes();
    if (!list.length) return "";

    const i = Math.floor(Math.random() * list.length);
    const item = list[i];
    return typeof item === "string" ? item : (item.text);
}

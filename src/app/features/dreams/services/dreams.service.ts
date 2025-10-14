export type DreamAPIResponse = {
    title: string;
    description: string;
    interpretation: string;
    emotion: string;
};

export class DreamsService {

    async fetchDreamInterpretation(description: string): Promise<DreamAPIResponse> {
        const response = await fetch('http://localhost:3000/api/dreams/interpret', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ description }),
        });

        if (!response.ok) {
            throw new Error(`Error fetching dream interpretation: ${response.statusText}`);
        }

        const data: DreamAPIResponse = await response.json();
        return data;
    }

    async saveDream(dream: Dream): Promise<void> {
        const response = await fetch('http://localhost:3000/api/dreams', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dream),
        });

        if (!response.ok) {
            throw new Error(`Error saving dream: ${response.statusText}`);
        }
    }


}
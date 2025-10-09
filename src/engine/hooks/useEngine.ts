import { useEngineAPI } from "../context/EngineApiProvider";


export function useEngine() {
    const engineApi = useEngineAPI();

    return { ...engineApi };
}

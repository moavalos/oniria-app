import { type RootState } from "@react-three/fiber";

type FrameCallback = (_state: RootState, _delta: number) => void;

export class LoopService {
    private callbacks = new Set<FrameCallback>();

    subscribe(cb: FrameCallback) {
        this.callbacks.add(cb);
    }

    unsubscribe(cb: FrameCallback) {
        this.callbacks.delete(cb);
    }

    tick(state: RootState, delta: number) {
        this.callbacks.forEach(cb => cb(state, delta));
    }
}

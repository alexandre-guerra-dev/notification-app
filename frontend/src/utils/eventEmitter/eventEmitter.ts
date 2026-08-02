type UnsubscribeCallback = () => void;

export class EventEmitter<T> {

    private listeners = new Set<(value: T) => void>();
    private lastValue: T | null = null;

    constructor() { }

    subscribe(listener: (value: T) => void) {
        this.listeners.add(listener);

        this.lastValue && listener(this.lastValue);

        return (() => { this.listeners.delete(listener) }) as UnsubscribeCallback;
    }

    emit(value: T) {
        this.listeners.forEach(l => l(value));
    }
}
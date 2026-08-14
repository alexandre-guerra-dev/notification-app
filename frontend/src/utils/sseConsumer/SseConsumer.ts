type SSEMessage = {
    type: string,
    data: string
};

export class SSEConsumer {

    private _listeners = new Map<string, ((value: any) => void)[]>();

    constructor(stream: ReadableStream<string>) {
        this.startListening(stream);
    }

    private async startListening(stream: ReadableStream<string>) {

        let buffer = "";

        for await (const chunk of stream) {
            buffer += chunk;

            if (!buffer.includes("\n\n")) continue;

            const events = buffer.split("\n\n")
            const lines = events[0].split("\n");

            const result: SSEMessage = {
                type: lines
                    .find(l => l.startsWith("event: "))
                    ?.replace("event: ", "")
                    ?? "",
                data: lines
                    .find(l => l.startsWith("data: "))
                    ?.replace("data: ", "")
                    ?? ""
            }

            this._listeners
                .get(result.type)
                ?.forEach(l => l(JSON.parse(result.data)));
            
            buffer = buffer.slice(`${events[0]}\n\n`.length);            
        }
    }

    addEventListener<T>(eventName: string, onMessage: (value: T) => void) {

        let list = this._listeners.get(eventName);

        if (!list) {
            list = [onMessage];
            this._listeners.set(eventName, list);
            return;
        }

        list.push(onMessage);
    }

    removeEventListener(eventName: string, onMessage: (value: any) => void) {
        
        let list = this._listeners.get(eventName);

        if (!list) return;

        list = list.filter(l => l !== onMessage);
    }
}
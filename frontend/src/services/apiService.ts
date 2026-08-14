import { EventEmitter } from "../utils/eventEmitter/eventEmitter";
import { SSEConsumer } from "../utils/sseConsumer/SseConsumer";

export class ApiError extends Error {

    public readonly statusCode: number;
    public readonly statusText: string;

    constructor(statusCode: number, statusText: string) {
        super(`${statusCode} ${statusText}`);

        this.statusCode = statusCode;
        this.statusText = statusText;
    }
}

type Method = "GET" | "POST" | "DELETE" | "PUT" | "PATCH"

class ApiService {

    private readonly apiUrl: string = "http://localhost:5172";

    public get url() { return this.apiUrl }

    private eventSources: Map<string, EventSource> = new Map();

    constructor() { }

    private async sendRequest(method: Method, path: string, body?: object) {
        
        const response = await fetch(
            `${this.apiUrl}/${path}`,
            {
                method: method,
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(body),
            }
        );

        if (!response.ok)
            throw new ApiError(
                response.status,
                response.statusText
            );

        return response;
    }

    async fetch<T extends object | undefined>(method: Method, path: string, body?: object) {
        
        const response = await this.sendRequest(method, path, body);

        if (response.headers.get("Content-Type")?.includes("application/json"))
            return await response.json() as T;

        return null;
    }

    async sse(path: string, body?: object) {

        const response = await this.sendRequest("GET", path, body);

        if (response.body === null)
            throw new Error("SSE response without a body.");

        const stream = response.body.pipeThrough(new TextDecoderStream());
        
        return new SSEConsumer(stream);
    }
}

export const apiService = new ApiService();
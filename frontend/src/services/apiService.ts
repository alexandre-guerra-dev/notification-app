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

    constructor() { }

    async fetch<T extends object | undefined>(method: Method, path: string, body?: object) {
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
        
        if (response.headers.get("Content-Type")?.includes("application/json"))
            return await response.json() as T;

        return null;
    }
}

export const apiService = new ApiService();
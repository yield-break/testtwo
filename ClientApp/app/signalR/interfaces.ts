import * as sr from "signalr"

export interface SearchSignalR extends sr.SignalR {
    searchHub: SearchProxy;
}

export interface SearchProxy {
    client: SearchClient;
    server: SearchServer;
}

export interface SearchClient {
    setConnectId: (id: string) => void;
    search: (query: SearchQuery) => void;
    searchResult: (result: SearchResult) => void;
}

export interface SearchServer {
    connect(sessionId: number): void;
    disconnect(sessionId: number): void;
}

export enum SignalRConnectionStatus {
    Connected = 1,
    Disconnected = 2,
    Error = 3
}

export interface SearchResult {
    sessionId: number;
    numberOfResults: number;
}

export interface SearchQuery {
    sessionId: number;
    query: string;
}
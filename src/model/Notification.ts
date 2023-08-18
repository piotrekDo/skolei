export interface SseEvent<T> {
    event: string;
    id: string;
    data: T;
}
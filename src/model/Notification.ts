export interface SseEvent<T> {
    event: string;
    id: string;
    data: T;
}

export interface Event {
    id: string;
    dateTime: string;
}

export interface NewPtoRequestEvent extends Event {
    ptoRequestId: number;
    applierId: number;
    applierFirstName: string;
    applierLastName: string;
    applierEmail: string;
}

export interface PtoRequestResolvedEvent extends Event {
    ptoId: number;
    ptoStart: string;
    ptoEnd: string;
    accepted: boolean;
}
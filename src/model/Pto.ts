export interface PtoRequest {
  ptoStart: string;
  ptoEnd: string;
  applierId: number;
  acceptorId: number;
  durationInDays: number;
}

export interface PtoRaw {
  id: number;
  requestDateTime: string;
  ptoStart: string;
  ptoEnd: string;
  applierId: number;
  applierFirstName: string;
  applierLastName: string;
  applierEmail: string;
  applierPtoDaysTotal: number;
  applierPtoDaysTaken: number;
  acceptorId: number;
  acceptorFirstName: string;
  acceptorLastName: string;
  acceptorEmail: string;
  wasAccepted: boolean;
  decisionDateTime: string | undefined;
  durationInDays: number;
  declineReason: string | undefined;
}

export interface PtoResolve {
  ptoRequestId: number;
  isAccepted: boolean;
  declineReason?: string;
}
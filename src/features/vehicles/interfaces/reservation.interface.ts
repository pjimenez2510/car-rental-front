export interface ReservationBase {
  startDate: string;
  endDate: string;
}

export interface Reservation extends ReservationBase {
  id: number;
  status: ReservationStatus;
  totalAmount: string;
  rental: null;
}

export interface ReservationCreate extends ReservationBase {
  customerId: number;
  vehicleId: number;
}

export interface ReservationUpdate extends Partial<ReservationBase> {
  status?: ReservationStatus;
  endDate?: string;
}

export interface ReservationRequest<T> {
  reservation: T;
}

export enum ReservationStatus {
  Pending = "pending",
  Confirmed = "confirmed",
  CheckedOut = "checked-out",
  Cancelled = "cancelled",
  Completed = "completed",
}

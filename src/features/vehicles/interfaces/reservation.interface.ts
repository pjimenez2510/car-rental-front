import { Customer } from "@/features/customer/interfaces/client.interface";
import { Vehicle } from "./vehicle.interface";

export interface ReservationBase {
  startDate: string;
  endDate: string;
}

export interface Reservation extends ReservationBase {
  id: number;
  status: ReservationStatus;
  totalAmount: string;
  vehicle: Vehicle;
  customer: Customer;
  rental: null;
}

export interface ReservationCreate extends ReservationBase {
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
  CheckedOut = "checked_out",
  Cancelled = "cancelled",
  Completed = "completed",
}

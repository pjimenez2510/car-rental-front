import { VehicleType } from "./vehicle-type.interface";

export interface VehicleBase {
  brand: string;
  model: string;
  licensePlate: string;
  year: number;
  url?: string;
}

export interface Vehicle extends VehicleBase {
  id: number;
  vehicleType: VehicleType;
  status: VehicleStatus;
  lastCheckupDate?: Date;
  dailyRate?: number;
  weeklyRate?: number;
  monthlyRate: number;
}

export interface VehicleCreate extends VehicleBase {
  vehicleTypeId: number;
}

export interface VehicleUpdate extends Partial<VehicleBase> {
  vehicleTypeId?: number;
}

export interface VehicleRequest<T> {
  vehicle: T;
}

export enum VehicleStatus {
  Available = "available",
  Reserved = "reserved",
  Rented = "rented",
  Maintenance = "maintenance",
}

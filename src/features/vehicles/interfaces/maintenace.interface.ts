import { Vehicle } from "./vehicle.interface";

export interface MaintenanceBase {
  description: string;
  startDate: string;
  endDate: string;
  cost: number;
}

export interface Maintenance extends MaintenanceBase {
  id: number;
  status: MaintenanceStatus;
  vehicle: Vehicle;
}

export interface MaintenanceCreate extends MaintenanceBase {
  vehicleId: number;
}

export interface MaintenanceUpdate extends Partial<MaintenanceBase> {
  vehicleId?: number | undefined;
  status?: MaintenanceStatus | undefined;
}

export enum MaintenanceStatus {
  Scheduled = "Scheduled",
  InProgress = "InProgress",
  Completed = "Completed",
}

export interface MaintenanceRequest<T> {
  maintenance: T;
}

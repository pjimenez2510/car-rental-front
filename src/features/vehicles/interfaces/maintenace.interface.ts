export interface MaintenanceBase {
  vehicleId: number;
  description: string;
  startDate: string;
  endDate: string;
  cost: number;
}

export interface Maintenance extends MaintenanceBase {
  id: number;
  status: MaintenanceStatus;
}

export type MaintenanceCreate = MaintenanceBase;

export type MaintenanceUpdate = Partial<MaintenanceBase>;

export enum MaintenanceStatus {
  Scheduled = "Scheduled",
  InProgress = "InProgress",
  Completed = "Completed",
}

export interface MaintenanceRequest<T> {
  maintenance: T;
}

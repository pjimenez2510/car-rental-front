import { VehicleType } from "./vehicle-type.interface";

export interface VehicleBase {
  brand: string;
  status: VehicleBase;
  model: string;
  licensePlate: string;
  year: number;
}

export interface Vehicle extends VehicleBase {
  id: string;
  vehicleType: VehicleType;
}

export interface VehicleCreate extends VehicleBase {
  vehicleTypeId: string;
}

export interface VehicleUpdate extends Partial<VehicleBase> {
  vehicleTypeId: string;
}

export enum VehicleStatus {
  Available = "available",
  Reserved = "reserved",
  Rented = "rented",
  Maintenance = "maintenance",
}

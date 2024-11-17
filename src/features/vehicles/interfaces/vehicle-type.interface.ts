export interface VehicleTypeBase {
  name: string;
}

export interface VehicleType extends VehicleTypeBase {
  id: number;
}

export type VehicleTypeCreate = VehicleTypeBase;

export type VehicleTypeUpdate = Partial<VehicleTypeBase>;

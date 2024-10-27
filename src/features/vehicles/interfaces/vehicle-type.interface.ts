export interface VehicleTypeBase {
  name: string;
}

export interface VehicleType extends VehicleTypeBase {
  id: string;
}

export type VehicleTypeCreate = VehicleTypeBase;

export type VehicleTypeUpdate = Partial<VehicleTypeBase>;

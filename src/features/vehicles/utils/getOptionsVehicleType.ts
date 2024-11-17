import { Option } from "@/shared/interfaces/option.interface";
import { VehicleType } from "../interfaces/vehicle-type.interface";

export const getOptionsVehicleType = (
  vehicleTypes: VehicleType[]
): Option[] => {
  return vehicleTypes.map((vehicleType) => ({
    value: vehicleType.id.toString(),
    label: vehicleType.name,
  }));
};

import { BaseHttpService } from "@/core/services/base-http.service";
import {
  VehicleType,
  VehicleTypeCreate,
  VehicleTypeUpdate,
} from "../interfaces/vehicle-type.interface";

export class VehicleTypeService extends BaseHttpService<
  VehicleType,
  VehicleTypeCreate,
  VehicleTypeUpdate
> {
  protected baseUrl: string = "api/v1/vehicle_types";
  protected singleResponseKey: string = "vehicleType";
  protected pluralResponseKey: string = "vehicleTypes";
}

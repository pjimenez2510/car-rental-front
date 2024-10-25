import { BaseHttpService } from "@/core/services/base-http.service";
import {
  Vehicle,
  VehicleCreate,
  VehicleUpdate,
} from "../interfaces/vehicle.interface";

export class VehicleService extends BaseHttpService<
  Vehicle,
  VehicleCreate,
  VehicleUpdate
> {
  protected baseUrl: string = "api/v1/vehicles";
  protected singleResponseKey: string = "vehicle";
  protected pluralResponseKey: string = "vehicles";
}

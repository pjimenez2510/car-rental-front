import {
  BaseHttpService,
  DataResponse,
} from "@/core/services/base-http.service";
import {
  Vehicle,
  VehicleCreate,
  VehicleUpdate,
} from "../interfaces/vehicle.interface";
import { VehicleFilterParams } from "../interfaces/vehicle-filter-params.interface";

export class VehicleService extends BaseHttpService<
  Vehicle,
  VehicleCreate,
  VehicleUpdate
> {
  protected baseUrl: string = "api/v1/vehicles";
  protected singleResponseKey: string = "vehicle";
  protected pluralResponseKey: string = "vehicles";

  async getAllByFilter(params: VehicleFilterParams): Promise<Vehicle[]> {
    const { data } = await this.http.get<DataResponse<Vehicle[]>>(
      this.baseUrl,
      { params }
    );
    return data.data[this.pluralResponseKey];
  }
}

import { BaseHttpService } from "@/core/services/base-http.service";
import {
  Maintenance,
  MaintenanceCreate,
  MaintenanceUpdate,
  MaintenanceRequest,
} from "../interfaces/maintenace.interface";

export class MaintenaceService extends BaseHttpService<
  Maintenance,
  MaintenanceRequest<MaintenanceCreate>,
  MaintenanceRequest<MaintenanceUpdate>
> {
  protected baseUrl: string = "api/v1/maintenances";
  protected singleResponseKey: string = "maintenance";
  protected pluralResponseKey: string = "maintenances";
}

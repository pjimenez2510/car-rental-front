import { BaseHttpService } from "@/core/services/base-http.service";
import {
  CheckParam,
  CheckParamCreate,
  CheckParamRequest,
  CheckParamUpdate,
} from "../interfaces/check-param";

export class CheckParamService extends BaseHttpService<
  CheckParam,
  CheckParamRequest<CheckParamCreate>,
  CheckParamRequest<CheckParamUpdate>
> {
  protected baseUrl: string = "api/v1/check_parameters";
  protected singleResponseKey: string = "checkParameter";
  protected pluralResponseKey: string = "checkParameters";
}

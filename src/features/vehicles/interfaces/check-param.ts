export interface CheckParamBase {
  name: string;
  description: string;
  isCritical: boolean;
}

export interface CheckParam extends CheckParamBase {
  id: number;
  vehicleType: string;
}

export interface CheckParamCreate extends CheckParamBase {
  vehicleTypeId: number;
}

export interface CheckParamUpdate extends CheckParamBase {
  id: number;
}

export interface CheckParamRequest<T> {
  checkParameter: T;
}

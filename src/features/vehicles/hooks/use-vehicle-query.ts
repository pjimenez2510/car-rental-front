"use client";

import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/shared/api/query-key";
import { VehicleService } from "../services/vehicle.service";
import { VehicleFilterParams } from "../interfaces/vehicle-filter-params.interface";

export const useVehiclesQuery = () => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.VEHICLES],
    queryFn: async () => await VehicleService.getInstance().getALl(),
  });

  return query;
};

export const useVehiclesByFilterQuery = (params: VehicleFilterParams) => {
  const enabled = (params: VehicleFilterParams) => {
    return (
      !!params.dateRange &&
      !!params.dateRange?.endDate &&
      !!params.dateRange?.startDate
    );
  };

  const query = useQuery({
    queryKey: [QUERY_KEYS.VEHICLES, JSON.stringify(params)],
    queryFn: async () =>
      await VehicleService.getInstance().getAllByFilter(params),
    enabled: enabled(params),
  });

  return query;
};

export const useVehicleByIdQuery = (id: number) => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.VEHICLES, String(id)],
    queryFn: async () => await VehicleService.getInstance().getById(id),
  });

  return query;
};

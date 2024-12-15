"use client";

import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/shared/api/query-key";
import { VehicleTypeService } from "../services/vehicle-type.service";

export const useVehicleTypeQuery = () => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.VEHICLE_TYPES],
    queryFn: async () => await VehicleTypeService.getInstance().getAll(),
  });

  return query;
};

export const useVehicleTypeByIdQuery = (id: number) => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.VEHICLE_TYPES, String(id)],
    queryFn: async () => await VehicleTypeService.getInstance().getById(id),
  });

  return query;
};

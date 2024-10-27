"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { unsubscribe } from "@/lib/unsubscribe";
import { QUERY_KEYS } from "@/shared/api/query-key";
import { VehicleTypeService } from "../services/vehicle-type.service";

export const useVehicleTypeQuery = () => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.VEHICLE_TYPES],
    queryFn: async () => await VehicleTypeService.getInstance().getAll(),
  });

  useEffect(() => {
    return () => {
      unsubscribe([QUERY_KEYS.VEHICLE_TYPES]);
    };
  }, []);

  return query;
};

export const useVehicleTypeByIdQuery = (id: number) => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.VEHICLE_TYPES, String(id)],
    queryFn: async () => await VehicleTypeService.getInstance().getById(id),
  });

  useEffect(() => {
    return () => {
      unsubscribe([QUERY_KEYS.VEHICLE_TYPES, String(id)]);
    };
  }, [id]);

  return query;
};

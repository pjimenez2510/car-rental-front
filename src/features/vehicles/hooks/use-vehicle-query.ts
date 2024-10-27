"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { unsubscribe } from "@/lib/unsubscribe";
import { QUERY_KEYS } from "@/shared/api/query-key";
import { VehicleService } from "../services/vehicle.service";
import { VehicleFilterParams } from "../interfaces/vehicle-filter-params.interface";

export const useVehiclesQuery = () => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.VEHICLES],
    queryFn: async () => await VehicleService.getInstance().getAll(),
  });

  useEffect(() => {
    return () => {
      unsubscribe([QUERY_KEYS.VEHICLES]);
    };
  }, []);

  return query;
};

export const useVehiclesByFilterQuery = (params: VehicleFilterParams) => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.VEHICLES, JSON.stringify(params)],
    queryFn: async () =>
      await VehicleService.getInstance().getAllByFilter(params),
  });

  useEffect(() => {
    return () => {
      unsubscribe([QUERY_KEYS.VEHICLES, JSON.stringify(params)]);
    };
  }, [params]);

  return query;
};

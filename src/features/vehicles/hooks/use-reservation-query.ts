import { QUERY_KEYS } from "@/shared/api/query-key";
import { useQuery } from "@tanstack/react-query";
import { CalculateCostRequest } from "../interfaces/calculate-cost.interface";
import { ReservationService } from "../services/reservation.service";

export const useCalculateCost = (params: CalculateCostRequest) => {
  const query = useQuery({
    queryKey: [
      QUERY_KEYS.COST_RESERVATION,
      String(params.startDate),
      String(params.endDate),
      String(params.vehicleId),
    ],
    queryFn: async () =>
      await ReservationService.getInstance().calculateCost(params),
    enabled: !!params.startDate && !!params.endDate && !!params.vehicleId,
  });

  return query;
};

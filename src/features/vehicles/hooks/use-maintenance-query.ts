import { QUERY_KEYS } from "@/shared/api/query-key";
import { useQuery } from "@tanstack/react-query";
import { MaintenaceService } from "../services/maintenance.service";

export const useMaintenancesQuery = () => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.MAINTENANCE],
    queryFn: async () => await MaintenaceService.getInstance().getAll(),
  });

  return query;
};

export const useMaintenanceByIdQuery = (id: number) => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.MAINTENANCE, String(id)],
    queryFn: async () => await MaintenaceService.getInstance().getById(id),
  });

  return query;
};

import { QUERY_KEYS } from "@/shared/api/query-key";
import { useQuery } from "@tanstack/react-query";
import { CheckParamService } from "../services/check-param.service";

export const useCheckParametersQuery = () => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.CHECK_PARAMETER],
    queryFn: async () => await CheckParamService.getInstance().getAll(),
  });

  return query;
};

export const useCheckParameterByIdQuery = (id: number) => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.CHECK_PARAMETER, String(id)],
    queryFn: async () => await CheckParamService.getInstance().getById(id),
  });

  return query;
};

import { useQuery } from "@tanstack/react-query";
import { CustomerService } from "../services/customer.service";
import { QUERY_KEYS } from "@/shared/api/query-key";

export const useCustomerQuery = (id: number) => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.CUSTOMER, String(id)],
    queryFn: async () => await CustomerService.getInstance().getById(id),
  });

  return query;
};

export const useCustomersQuery = () => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.CUSTOMER],
    queryFn: async () => await CustomerService.getInstance().getAll(),
  });

  return query;
};

export const useReservationsByCustomerLogget = () => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.RESERVATION, QUERY_KEYS.CUSTOMER],
    queryFn: async () =>
      await CustomerService.getInstance().getReservationsByCustomerLogget(),
  });

  return query;
};

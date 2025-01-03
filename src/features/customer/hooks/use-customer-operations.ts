"use client";

import { toast } from "sonner";
import { useState } from "react";
import { invalidateQuery } from "@/lib/invalidate-query";
import { QUERY_KEYS } from "@/shared/api/query-key";
import { CustomerService } from "../services/customer.service";
import { Customer, CustomerCreate } from "../interfaces/client.interface";

const useCustomerOperations = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const service = CustomerService.getInstance();

  const createCustomer = async (
    params: CustomerCreate
  ): Promise<Customer | null> => {
    try {
      setLoading(true);
      const response = await service.create({ customer: params });
      toast.success("Cliente creado correctamente");
      invalidateQuery([QUERY_KEYS.CUSTOMER]);
      setLoading(false);
      return response;
    } catch (error: unknown) {
      setError(error as string);
      setLoading(false);
      return null;
    }
  };

  return {
    loading,
    error,
    createCustomer,
  };
};

export default useCustomerOperations;

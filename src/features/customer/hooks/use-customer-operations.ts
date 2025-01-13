"use client";

import { toast } from "sonner";
import { useState } from "react";
import { invalidateQuery } from "@/lib/invalidate-query";
import { QUERY_KEYS } from "@/shared/api/query-key";
import { CustomerService } from "../services/customer.service";
import { Customer, CustomerCreate } from "../interfaces/client.interface";
import { EmailService } from "@/features/email/services/email.service";
import { Email } from "@/features/email/interfaces/email.interface";

const useCustomerOperations = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const service = CustomerService.getInstance();
  const emailService = EmailService.getInstance();

  const verifyEmail = async (
    body: Email
  ): Promise<boolean | null> => {
    try {
      setLoading(true);
      console.log("antes del hook");
      
      const response = await emailService.verifyEmail(body);
      if (response !== "valid") {
        toast.error("Email no válido");
        setLoading(false);
        return false;
      }
      console.log("estas en el else");
      
      toast.success("Email verificado correctamente");
      return true;
    } catch (error: unknown) {
      setError(error as string);
      console.log("estas en el catch"+error);
      setLoading(false);
      return null;
    }
  }

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
    verifyEmail,
  };
};

export default useCustomerOperations;

"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { MaintenaceService } from "../services/maintenance.service";
import { invalidateQuery } from "@/lib/invalidate-query";
import { QUERY_KEYS } from "@/shared/api/query-key";

const schema = z.object({
  description: z.string().min(1, "La descripción es requerida"),
  cost: z.number().min(1, "El costo es requerido"),
  startDate: z.string().min(1, "La fecha es requerida"),
  endDate: z.string().min(1, "La fecha es requerida"),
  vehicleId: z.number().min(1, "El vehículo es requerido"),
});

type FormFields = z.infer<typeof schema>;

interface PaymentFormProps {
  vehicleId: number;
}

export function useMaintenanceForm({ vehicleId }: PaymentFormProps) {
  const methods = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      description: "",
      cost: 0,
      startDate: undefined,
      endDate: undefined,
      vehicleId,
    },
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await MaintenaceService.getInstance().create({ maintenance: data });
      invalidateQuery([QUERY_KEYS.MAINTENANCE]);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    onSubmit,
    methods,
    isSubmiting: methods.formState.isSubmitting,
  };
}

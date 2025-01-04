"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { MaintenaceService } from "../services/maintenance.service";
import { invalidateQuery } from "@/lib/invalidate-query";
import { QUERY_KEYS } from "@/shared/api/query-key";
import { toast } from "sonner";

const schema = z.object({
  description: z.string().min(1, "La descripción es requerida"),
  cost: z.coerce
    .number({ message: "El costo debe ser un número" })
    .min(1, "El costo es requerido"),
  startDate: z.date({ message: "La fecha es requerida" }),
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
      startDate: new Date(),
    },
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      console.log(data);
      await MaintenaceService.getInstance().create({
        maintenance: {
          ...data,
          startDate: data.startDate.toISOString(),
          vehicleId,
        },
      });
      invalidateQuery([QUERY_KEYS.MAINTENANCE]);
      toast.success("Mantenimiento creado");
      methods.reset();
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

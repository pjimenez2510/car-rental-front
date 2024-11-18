"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { Vehicle } from "../interfaces/vehicle.interface";
import { useRouter } from "next/navigation";
import useVehicleOperations from "./use-vehicle-operations";

const schema = z.object({
  brand: z.string().min(1, "La marca es requerida"),
  model: z.string().min(1, "El modelo es requerido"),
  year: z.coerce
    .number({ message: "El año debe ser un número" })
    .min(2012, "El año debe ser mayor a 2012")
    .max(new Date().getFullYear(), "El año no puede ser mayor al actual"),
  licensePlate: z.string().min(1, "La placa es requerida"),
  vehicleTypeId: z.string().min(1, "El tipo de vehículo es requerido"),
});

type FormFields = z.infer<typeof schema>;

interface VehicleFormProps {
  vehicle?: Vehicle;
}

export function useVehicleForm({ vehicle }: VehicleFormProps) {
  const { createVehicle, updateVehicle } = useVehicleOperations();
  const router = useRouter();
  const methods = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      brand: vehicle?.brand || "",
      model: vehicle?.model || "",
      year: vehicle?.year || new Date().getFullYear(),
      licensePlate: vehicle?.licensePlate || "",
      vehicleTypeId: vehicle?.vehicleType.id.toString() || "",
    },
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    if (vehicle) {
      await updateVehicle(
        vehicle.id,
        {
          ...data,
          vehicleTypeId: parseInt(data.vehicleTypeId),
        },
        vehicle
      );
    } else {
      await createVehicle({
        ...data,
        vehicleTypeId: parseInt(data.vehicleTypeId),
      });
    }
  };

  const onCancel = () => {
    router.push("/management/vehicles/list");
  };

  return {
    onSubmit,
    methods,
    isSubmiting: methods.formState.isSubmitting,
    onCancel,
  };
}

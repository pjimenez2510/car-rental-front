"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { Vehicle } from "../interfaces/vehicle.interface";
import { useRouter } from "next/navigation";
import useVehicleOperations from "./use-vehicle-operations";

const schema = z.object({
  brand: z.string().min(1, "La marca es requerida"),
  url: z
    .string()
    .min(1, "La imagen es requerida")
    .url("Debe ser una URL válida")
    .refine((url) => {
      // Validación de formato de URL de imagen
      const imagePattern = /\.(jpg|jpeg|png|gif|webp|svg|avif)(\?.*)?$/i;
      return imagePattern.test(url);
    }, "La URL debe terminar en una extensión de imagen válida (.jpg, .jpeg, .png, .gif, .webp, .svg, .avif)"),
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
      url: vehicle?.url || "",
      model: vehicle?.model || "",
      year: vehicle?.year || new Date().getFullYear(),
      licensePlate: vehicle?.licensePlate || "",
      vehicleTypeId: vehicle?.vehicleType.id.toString() || "",
    },
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
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
    } catch (error) {
      console.error("Error al guardar el vehículo:", error);
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

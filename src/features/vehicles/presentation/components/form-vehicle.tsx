"use client";
import RHFInput from "@/components/rhf/RHFInput";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Button } from "@/components/ui/button";
import { FormProvider } from "react-hook-form";
import { useVehicleForm } from "../../hooks/use-vehicle-form";
import { Vehicle } from "../../interfaces/vehicle.interface";
import RHFSelect from "@/components/rhf/RHFSelect";
import { Save } from "lucide-react";
import { Option } from "@/shared/interfaces/option.interface";

interface FormProps {
  vehicle?: Vehicle;
  optionsVehicleType: Option[];
}

export const VehicleForm = ({ vehicle, optionsVehicleType }: FormProps) => {
  const { methods, onSubmit, isSubmiting, onCancel } = useVehicleForm({
    vehicle,
  });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex flex-col items-center w-full max-w-xl"
      >
        <RHFInput name="brand" label="Marca" />
        <RHFInput name="model" label="Modelo" />
        <RHFInput name="year" label="Año" />
        <RHFInput name="licensePlate" label="Placa" />
        <RHFSelect
          name="vehicleTypeId"
          label="Vehicle Type"
          options={optionsVehicleType}
        />
        <div className="flex space-x-2">
          <Button onClick={onCancel} type="button" variant={"secondary"}>
            Cancelar
          </Button>
          <Button disabled={isSubmiting} type="submit" className="space-x-2">
            {isSubmiting ? <LoadingSpinner /> : <Save />}
            <span>Guardar</span>
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

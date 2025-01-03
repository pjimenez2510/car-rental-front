"use client";
import React, { useMemo, useEffect } from "react";
import { FormProvider } from "react-hook-form";
import RHFInput from "@/components/rhf/RHFInput";
import RHFSelect from "@/components/rhf/RHFSelect";
import RHFImageInput from "@/components/rhf/RHFImageInput";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Save } from "lucide-react";
import { Option } from "@/shared/interfaces/option.interface";
import { Vehicle } from "../../interfaces/vehicle.interface";
import { useVehicleForm } from "../../hooks/use-vehicle-form";

interface CarModels {
  [key: string]: Option[];
}

const carModelsByBrand: CarModels = {
  Toyota: [
    { value: "Corolla", label: "Corolla" },
    { value: "Camry", label: "Camry" },
    { value: "RAV4", label: "RAV4" },
    { value: "Highlander", label: "Highlander" },
    { value: "4Runner", label: "4Runner" },
    { value: "Tacoma", label: "Tacoma" },
    { value: "Tundra", label: "Tundra" },
  ],
  Honda: [
    { value: "Civic", label: "Civic" },
    { value: "Accord", label: "Accord" },
    { value: "CR-V", label: "CR-V" },
    { value: "Pilot", label: "Pilot" },
    { value: "HR-V", label: "HR-V" },
  ],
  Ford: [
    { value: "F-150", label: "F-150" },
    { value: "Mustang", label: "Mustang" },
    { value: "Explorer", label: "Explorer" },
    { value: "Escape", label: "Escape" },
    { value: "Edge", label: "Edge" },
  ],
  Chevrolet: [
    { value: "Silverado", label: "Silverado" },
    { value: "Camaro", label: "Camaro" },
    { value: "Equinox", label: "Equinox" },
    { value: "Traverse", label: "Traverse" },
    { value: "Malibu", label: "Malibu" },
  ],
  BMW: [
    { value: "3 Series", label: "3 Series" },
    { value: "5 Series", label: "5 Series" },
    { value: "X3", label: "X3" },
    { value: "X5", label: "X5" },
    { value: "M3", label: "M3" },
  ],
};

const vehicleBrandOptions = Object.keys(carModelsByBrand).map((brand) => ({
  value: brand,
  label: brand,
}));

interface FormProps {
  vehicle?: Vehicle;
  optionsVehicleType: Option[];
}

export const VehicleForm = ({ vehicle, optionsVehicleType }: FormProps) => {
  const { methods, onSubmit, isSubmiting, onCancel } = useVehicleForm({
    vehicle,
  });

  const selectedBrand = methods.watch("brand");

  // Obtener los modelos disponibles para la marca seleccionada
  const availableModels = useMemo(() => {
    if (!selectedBrand) {
      // Si hay un vehículo para editar y tiene marca, mostrar sus modelos
      if (vehicle?.brand) {
        return carModelsByBrand[vehicle.brand] || [];
      }
      return [];
    }
    return carModelsByBrand[selectedBrand] || [];
  }, [selectedBrand, vehicle]);

  // Limpiar el modelo solo cuando cambie la marca y no estemos inicializando
  useEffect(() => {
    if (selectedBrand && (!vehicle || vehicle.brand !== selectedBrand)) {
      methods.setValue("model", "");
    }
  }, [selectedBrand, vehicle]);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex flex-col items-center w-full max-w-xl"
      >
        <RHFImageInput name="url" label="Imagen" />
        <RHFSelect name="brand" label="Marca" options={vehicleBrandOptions} />
        <RHFSelect name="model" label="Modelo" options={availableModels} />
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

export default VehicleForm;

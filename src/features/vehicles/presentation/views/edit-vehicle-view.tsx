"use client";
import { redirect } from "next/navigation";
import { useVehicleByIdQuery } from "../../hooks/use-vehicle-query";
import { VehicleForm } from "../components/form-vehicle";
import LoadingForm from "@/shared/components/loading-form/loading-form";
import { useMemo } from "react";
import { useVehicleTypeQuery } from "../../hooks/use-vehicle-type-query";
import { getOptionsVehicleType } from "../../utils/getOptionsVehicleType";
interface EditVehicleProps {
  id: number;
}
export default function EditVehicle({ id }: EditVehicleProps) {
  const { data: vehicle, isFetching: isLoadingVehicle } =
    useVehicleByIdQuery(id);
  const { data: vehicleType, isFetching: isLoadingTypes } =
    useVehicleTypeQuery();

  const optionsVehicleType = useMemo(() => {
    return vehicleType ? getOptionsVehicleType(vehicleType) : [];
  }, [vehicleType]);

  if (isLoadingVehicle || isLoadingTypes)
    return <LoadingForm text="Editar vehículo" quantityInputs={6} />;

  if (!vehicle) redirect("/management/vehicles/list");

  return (
    <div className="flex flex-col w-full items-center gap-4">
      <h2>Editar vehículo {vehicle.brand}</h2>
      <VehicleForm vehicle={vehicle} optionsVehicleType={optionsVehicleType} />
    </div>
  );
}

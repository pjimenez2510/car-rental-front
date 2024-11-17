"use client";

import { useMemo } from "react";
import { useVehicleTypeQuery } from "../../hooks/use-vehicle-type-query";
import { getOptionsVehicleType } from "../../utils/getOptionsVehicleType";
import { VehicleForm } from "../components/form-vehicle";
import LoadingForm from "@/shared/components/loading-form/loading-form";

export default function NewVehicle() {
  const { data: vehicleType, isFetching: isLoadingTypes } =
    useVehicleTypeQuery();

  const optionsVehicleType = useMemo(() => {
    return vehicleType ? getOptionsVehicleType(vehicleType) : [];
  }, [vehicleType]);

  if (isLoadingTypes)
    return <LoadingForm text="Nuevo vehículo" quantityInputs={6} />;

  return (
    <div className="flex flex-col w-full items-center gap-4">
      <h2>Nuevo vehículo</h2>
      <VehicleForm optionsVehicleType={optionsVehicleType} />
    </div>
  );
}

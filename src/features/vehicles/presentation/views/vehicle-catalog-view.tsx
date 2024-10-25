"use client";

import { useVehiclesQuery } from "../../hooks/use-vehicle-query";

export default function VehicleCatalogView() {
  const { data } = useVehiclesQuery();
  return <div>{JSON.stringify(data)}</div>;
}

"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useVehicleFilterStore } from "../../context/use-vehicle-filter-store";
import { useVehiclesByFilterQuery } from "../../hooks/use-vehicle-query";
import CardVehicle from "../components/card-vehicle";
import FiltersVehicle from "../components/filters-vehicle/filters-vehicle";
import LoadingVehicles from "../components/loading/loading-vehicles";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function VehicleCatalogView() {
  const { filterParams } = useVehicleFilterStore();
  const { data: vehicles, isFetching } = useVehiclesByFilterQuery(filterParams);
  const [isOpen, setIsOpen] = useState(false);
  const noData = !isFetching && vehicles?.length === 0;
  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:hidden">
        <Button onClick={() => setIsOpen(!isOpen)} className="w-fit ">
          Filtrar por
        </Button>
      </div>
      <div className="flex gap-4">
        <div className="min-w-72 hidden lg:block">
          <Card className="w-full">
            <CardHeader>
              <h2 className="text-lg font-bold">Filtrar por</h2>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <FiltersVehicle />
            </CardContent>
          </Card>
        </div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetContent
            side="left"
            className="flex flex-col justify-between rounded-tr-2xl rounded-br-2xl bg-card border-secondary"
          >
            <div>
              <SheetHeader className="mb-4 ml-4">
                <SheetTitle className="flex items-center">
                  Filtrar por
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-4">
                <FiltersVehicle />
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <div
          className={cn([
            "w-full h-fit grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3",
          ])}
        >
          {isFetching ? (
            <LoadingVehicles />
          ) : (
            vehicles?.map((vehicle) => (
              <CardVehicle key={vehicle.id} vehicle={vehicle} />
            ))
          )}
          {noData && (
            <div className="flex flex-col col-span-full items-center justify-center gap-4 w-full h-full">
              <h2 className="text-lg font-bold">No hay vehículos</h2>
              <p>Intenta con otro filtro</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

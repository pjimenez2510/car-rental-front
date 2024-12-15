"use client";

import { useMemo } from "react";
import { ArrowRight, Info, Star, Car, Clock, Shield } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useVehicleFilterStore } from "../../context/use-vehicle-filter-store";
import { useVehicleByIdQuery } from "../../hooks/use-vehicle-query";
import { useCalculateCost } from "../../hooks/use-reservation-query";
import { features } from "../../constants/features-vehicles";
import { termsRental } from "../../constants/terms-rental";
import { VehicleDetail } from "../components/vehicle-detail";
import { VehicleFeature } from "../components/vehicle-feature";
import { TermItem } from "../components/term-item";
import { DateDisplay } from "../components/date-display";
import useReservationOperations from "../../hooks/use-reservation-operations";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function ReservationView({ vehicleId }: { vehicleId: number }) {
  const {
    filterParams: { dateRange },
  } = useVehicleFilterStore();
  const { data: vehicle, isFetching } = useVehicleByIdQuery(vehicleId);
  const { data: cost, isFetching: isCostFetching } = useCalculateCost({
    startDate: dateRange?.startDate?.toISOString().split("T")[0] || "",
    endDate: dateRange?.endDate?.toISOString().split("T")[0] || "",
    vehicleId,
  });

  const { createReservation, loading } = useReservationOperations();

  const vehicleDetails = useMemo(() => {
    if (!vehicle) return [];
    return [
      {
        label: "Marca",
        value: vehicle.brand,
        className: "bg-primary/5",
        icon: Shield,
      },
      {
        label: "Modelo",
        value: vehicle.model,
        className: "bg-primary/5",
        icon: Car,
      },
      {
        label: "Año",
        value: vehicle.year,
        className: "bg-primary/5",
        icon: Clock,
      },
      {
        label: "Tipo",
        value: vehicle.vehicleType.name,
        className: "bg-primary/5",
        icon: Star,
      },
    ];
  }, [vehicle]);

  if (isFetching) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <Car className="h-12 w-12 text-primary animate-bounce" />
          <p className="text-lg font-medium">
            Cargando información del vehículo...
          </p>
        </div>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-red-500 flex flex-col items-center gap-4">
          <Info className="h-12 w-12" />
          <p className="text-lg font-medium">
            No se encontró el vehículo solicitado
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl group">
            <Image
              src={vehicle.url || "/images/not-image-vehicle.png"}
              alt={`${vehicle.brand} ${vehicle.model}`}
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-black px-6 py-2 rounded-full text-sm font-medium shadow-lg flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500" fill="currentColor" />
              <span>4.8/5</span>
              <Separator orientation="vertical" className="h-4 mx-2" />
              <span className="text-muted-foreground">(120 reseñas)</span>
            </div>
          </div>

          <Tabs defaultValue="details" className="w-full">
            <TabsList className="w-full p-1 bg-muted/10 rounded-lg">
              <TabsTrigger value="details" className="flex-1 font-medium">
                Detalles
              </TabsTrigger>
              <TabsTrigger value="features" className="flex-1 font-medium">
                Características
              </TabsTrigger>
              <TabsTrigger value="terms" className="flex-1 font-medium">
                Términos
              </TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="mt-8">
              <Card className="border-none shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center justify-between">
                    <h2 className="text-2xl font-semibold">
                      Detalles del vehículo
                    </h2>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    {vehicleDetails.map((detail, index) => (
                      <VehicleDetail key={index} {...detail} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="features" className="mt-8">
              <Card className="border-none shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center justify-between">
                    <h2 className="text-2xl font-semibold">Características</h2>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {features(vehicle.vehicleType.name).map(
                      (feature, index) => (
                        <VehicleFeature key={index} {...feature} />
                      )
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="terms" className="mt-8">
              <Card className="border-none shadow-lg">
                <CardContent className="p-6 space-y-6">
                  <h4 className="text-xl font-semibold">
                    Términos y condiciones
                  </h4>
                  <div className="grid gap-4">
                    {termsRental.map((term, index) => (
                      <TermItem key={index} text={term} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <Card className="h-min sticky top-24 border-none shadow-xl">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Reserva ahora</h2>
              <div className="bg-green-500 text-white px-4 py-1.5 rounded-full text-sm font-medium">
                Disponible
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-4">
              <DateDisplay
                title="Fecha de recogida"
                date={dateRange?.startDate}
              />
              <DateDisplay
                title="Fecha de devolución"
                date={dateRange?.endDate}
              />
            </div>

            <div className="space-y-6">
              <Separator />
              {isCostFetching ? (
                <div className="animate-pulse flex justify-center py-4">
                  <p className="text-lg font-medium">Calculando precio...</p>
                </div>
              ) : (
                cost && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">
                        Precio por día
                      </span>
                      <span className="font-semibold text-lg">
                        {cost.costPerDay}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-semibold">Total</span>
                      <span className="text-3xl font-bold text-primary">
                        {cost.totalCost}
                      </span>
                    </div>
                  </div>
                )
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 pb-6">
            <Button
              disabled={!dateRange?.startDate || !dateRange?.endDate || loading}
              className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90 transition-colors"
              onClick={() => {
                if (!dateRange?.startDate || !dateRange?.endDate) return;
                createReservation({
                  customerId: 1,
                  vehicleId,
                  startDate: dateRange?.startDate?.toISOString().split("T")[0],
                  endDate: dateRange?.endDate?.toISOString().split("T")[0],
                });
              }}
            >
              Reservar ahora
              {loading ? (
                <LoadingSpinner className="ml-2 h-5 w-5" />
              ) : (
                <ArrowRight className="ml-2 h-5 w-5" />
              )}
            </Button>
            <p className="text-sm text-center text-muted-foreground">
              No se realizará ningún cargo hasta confirmar la reserva
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

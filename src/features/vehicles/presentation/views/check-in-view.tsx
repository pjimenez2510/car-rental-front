"use client";

import InfoError from "@/shared/components/info-error";
import useReservationOperations from "../../hooks/use-reservation-operations";
import { useReservationQuery } from "../../hooks/use-reservation-query";
import LoadingInfo from "../components/loading/loading-info-vehicle";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User, Car, CalendarDays, MapPin, Save, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { reservationStatusSpanish } from "../../constants/status-reservation-spanish";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ReservationStatus } from "../../interfaces/reservation.interface";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { formatDate } from "@/lib/format-date";
import { FormProvider } from "react-hook-form";
import { useMaintenanceForm } from "../../hooks/use-maintanance-form";
import RHFInput from "@/components/rhf/RHFInput";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AlertDialogHeader } from "@/components/ui/alert-dialog";
import { useMaintenancesQuery } from "../../hooks/use-maintenance-query";
import { MaintenanceStatus } from "../../interfaces/maintenace.interface";
import { MaintenaceService } from "../../services/maintenance.service";
import { invalidateQuery } from "@/lib/invalidate-query";
import { toast } from "sonner";
import { QUERY_KEYS } from "@/shared/api/query-key";

interface CheckInViewProps {
  reservationId: number;
}

export default function CheckInView({ reservationId }: CheckInViewProps) {
  const { checkinReservation, loading } = useReservationOperations();
  const { data: reservation, isFetching } = useReservationQuery(reservationId);
  const [mileage, setMileage] = useState("");
  const { isSubmiting, methods, onSubmit } = useMaintenanceForm({
    vehicleId: reservation?.vehicle.id ?? 0,
  });

  const { data: maintenances } = useMaintenancesQuery();

  if (isFetching) {
    return <LoadingInfo />;
  }
  if (!reservation) {
    return <InfoError text="Reserva no encontrada" />;
  }

  if (reservation.status !== ReservationStatus.CheckedOut) {
    return <InfoError text="La reserva ya ha sido recibida" />;
  }

  const deleteMaintenance = async (id: number) => {
    try {
      await MaintenaceService.getInstance().delete(id);
      invalidateQuery([QUERY_KEYS.MAINTENANCE]);
      toast.success("Mantenimiento eliminado");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">
        Detalles de la Reserva {reservation.id}
      </h1>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Información de la Reserva</CardTitle>
              <Badge
                className={cn(
                  reservationStatusSpanish[reservation.status].color
                )}
              >
                {reservationStatusSpanish[reservation.status].label}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">
                  {reservation.customer.user.firstName}{" "}
                  {reservation.customer.user.lastName}
                </p>
                <p className="text-sm text-muted-foreground">
                  {reservation.customer.user.email}
                </p>
                <p className="text-sm text-muted-foreground">
                  {reservation.customer.phoneNumber}
                </p>
                <p className="text-sm text-muted-foreground">
                  {reservation.customer.driverLicenseNumber}
                </p>
              </div>
            </div>
            <Separator />
            <div className="flex items-center gap-2">
              <Car className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">
                  {reservation.vehicle.model} {reservation.vehicle.brand}
                </p>
                <p className="text-sm text-muted-foreground">
                  Placa: {reservation.vehicle.licensePlate}
                </p>
                <p className="text-sm text-muted-foreground">
                  Tipo: {reservation.vehicle.vehicleType.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  Año: {reservation.vehicle.year}
                </p>
              </div>
            </div>
            <Separator />
            <div className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Fechas de Reserva</p>
                <p className="text-sm text-muted-foreground">
                  Recogida: {formatDate(reservation.startDate, "mm/dd/yyyy")}
                </p>
                <p className="text-sm text-muted-foreground">
                  Devolución: {formatDate(reservation.endDate, "mm/dd/yyyy")}
                </p>
              </div>
            </div>
            <Separator />
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Ubicación de Recogida</p>
                <p className="text-sm text-muted-foreground">
                  Av 1 de Mayo, Quito, Ecuador
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Ubicación de Devolución</p>
                <p className="text-sm text-muted-foreground">
                  Av 1 de Mayo, Quito, Ecuador
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Check-In del Vehículo</CardTitle>
            <CardDescription>
              Registre la devolución del vehículo
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="mileage">Kilometraje</Label>
              <Input
                id="mileage"
                placeholder="Kilometraje actual"
                type="number"
                value={mileage}
                onChange={(e) => {
                  const value = e.target.value;
                  console.log(value);
                  if (value === "") {
                    setMileage("");
                    return;
                  }

                  if (!/^\d+$/.test(value)) {
                    return;
                  }

                  if (value.length > 7) {
                    return;
                  }

                  if (parseInt(value) < 0) {
                    return;
                  }
                  setMileage(e.target.value);
                }}
                required
              />
            </div>
            <Separator />

            <Dialog>
              <DialogTrigger asChild>
                <div className="flex items-center justify-between">
                  <span>Registro de daños</span>

                  <Button variant="secondary">Agregar mantenimiento</Button>
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <AlertDialogHeader>
                  <DialogTitle>Agregar mantenimientos</DialogTitle>
                  <DialogDescription>
                    Registre los mantenimientos realizados al vehículo
                  </DialogDescription>
                </AlertDialogHeader>
                <FormProvider {...methods}>
                  <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    className="flex flex-col items-center w-full max-w-xl"
                  >
                    <RHFInput name="description" label="Descripcion" />
                    <RHFInput name="cost" label="Costo" />

                    <DialogFooter className="space-x-2 mt-5">
                      <DialogClose asChild>
                        <Button type="button" variant={"secondary"}>
                          Cancelar
                        </Button>
                      </DialogClose>
                      <Button
                        disabled={isSubmiting}
                        type="submit"
                        className="space-x-2"
                      >
                        {isSubmiting ? <LoadingSpinner /> : <Save />}
                        <span>Guardar</span>
                      </Button>
                    </DialogFooter>
                  </form>
                </FormProvider>
              </DialogContent>
            </Dialog>

            {maintenances
              ?.filter(
                (maintenance) =>
                  maintenance.vehicle.id === reservation.vehicle.id &&
                  maintenance.status !== MaintenanceStatus.Completed
              )
              .map((maintenance) => (
                <div
                  key={maintenance.id}
                  className="flex items-center justify-between bg-slate-50 dark:bg-neutral-900 p-2 rounded-md"
                >
                  <div className="flex items-center gap-2">
                    <Car className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{maintenance.description}</p>
                      <p className="text-sm text-muted-foreground">
                        Costo: {maintenance.cost}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="destructive"
                    onClick={() => deleteMaintenance(maintenance.id)}
                  >
                    <Trash2 />
                  </Button>
                </div>
              ))}

            <Separator />
            <div>
              <p className="text-muted-foreground">
                Por favor, revise el vehículo y registre el kilometraje actual
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              disabled={!mileage || loading}
              className="w-full"
              onClick={() =>
                checkinReservation(reservation.id, parseInt(mileage))
              }
            >
              Check-In{" "}
              {loading ? (
                <LoadingSpinner className="ml-2" />
              ) : (
                <Car className="ml-2 " />
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

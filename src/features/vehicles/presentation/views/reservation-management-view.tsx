"use client";

import Image from "next/image";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  Car,
  User,
  Calendar,
  Clock,
  FileText,
  MapPin,
  CopyrightIcon as License,
  Phone,
  Mail,
  BadgeIcon as IdCard,
  Gauge,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useReservationQuery } from "../../hooks/use-reservation-query";
import LoadingInfo from "../components/loading/loading-info-vehicle";
import InfoError from "@/shared/components/info-error";
import { reservationStatusSpanish } from "../../constants/status-reservation-spanish";
import { cn } from "@/lib/utils";
import { vehicleStatusSpanish } from "../../constants/status-vehicle-spanish";

interface ReservationManagementViewProps {
  reservationId: number;
}

export default function ReservationManagementView({
  reservationId,
}: ReservationManagementViewProps) {
  const { data: reservationData, isFetching } =
    useReservationQuery(reservationId);
  if (isFetching) {
    return <LoadingInfo />;
  }

  if (!reservationData) {
    return <InfoError text="No se encontró la reservación" />;
  }
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">
            Reservación #{reservationData.id}
          </h1>
          <p className="text-muted-foreground">
            Creada el{" "}
            {format(new Date(reservationData.startDate), "PPP", { locale: es })}
          </p>
        </div>
        <Badge
          className={cn([
            "text-lg py-1 px-4",
            reservationStatusSpanish[reservationData.status].color,
          ])}
        >
          {reservationStatusSpanish[reservationData.status].label}
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Vehicle Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Car className="h-5 w-5" />
              Información del Vehículo
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="aspect-video relative rounded-lg overflow-hidden">
              <Image
                src={
                  reservationData.vehicle.url || "/images/not-image-vehicle.png"
                }
                alt={`${reservationData.vehicle.brand} ${reservationData.vehicle.model}`}
                fill
                className="object-cover"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Marca y Modelo</span>
                <span className="font-medium">
                  {reservationData.vehicle.brand}{" "}
                  {reservationData.vehicle.model}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Placa</span>
                <span className="font-medium">
                  {reservationData.vehicle.licensePlate}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Año</span>
                <span className="font-medium">
                  {reservationData.vehicle.year}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tipo</span>
                <span className="font-medium">
                  {reservationData.vehicle.vehicleType.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estado</span>
                <Badge
                  className={cn([
                    vehicleStatusSpanish[reservationData.vehicle.status].color,
                  ])}
                >
                  {vehicleStatusSpanish[reservationData.vehicle.status].label}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customer Information */}
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Información del Cliente
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-lg font-medium">
                    {reservationData.customer.user.firstName}{" "}
                    {reservationData.customer.user.lastName}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{reservationData.customer.user.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{reservationData.customer.phoneNumber}</span>
                </div>
                <Separator />
                <div className="flex items-center gap-2">
                  <IdCard className="h-4 w-4 text-muted-foreground" />
                  <span>CI: {reservationData.customer.ci}</span>
                </div>
                <div className="flex items-center gap-2">
                  <License className="h-4 w-4 text-muted-foreground" />
                  <span>
                    Licencia: {reservationData.customer.driverLicenseNumber}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{reservationData.customer.address}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Reservation Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Detalles de la Reservación
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Fechas</p>
                    <p className="text-sm text-muted-foreground">
                      Inicio:{" "}
                      {format(new Date(reservationData.startDate), "PPP p", {
                        locale: es,
                      })}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Fin:{" "}
                      {format(new Date(reservationData.endDate), "PPP p", {
                        locale: es,
                      })}
                    </p>
                  </div>
                </div>

                <Separator />
                <div className="flex justify-between items-center">
                  <span className="font-medium">Monto Total</span>
                  <span className="text-xl font-bold">
                    ${reservationData.totalAmount}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Rental Information */}
        {reservationData.rental && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Información del Alquiler
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Fechas del Alquiler</p>
                    <p className="text-sm text-muted-foreground">
                      Inicio:{" "}
                      {format(
                        new Date(reservationData.rental.actualStartDate),
                        "PPP p",
                        { locale: es }
                      )}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Devolución Esperada:{" "}
                      {format(
                        new Date(reservationData.rental.expectedReturnDate),
                        "PPP p",
                        { locale: es }
                      )}
                    </p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center gap-2">
                  <Gauge className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Odómetro</p>
                    <p className="text-sm text-muted-foreground">
                      Inicial: {reservationData.rental.initialOdometer} km
                    </p>
                    {reservationData.rental.finalOdometer && (
                      <p className="text-sm text-muted-foreground">
                        Final: {reservationData.rental.finalOdometer} km
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

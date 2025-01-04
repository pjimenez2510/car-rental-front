"use client";
import Image from "next/image";
import { CalendarDays, CreditCard, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useReservationQuery } from "../../hooks/use-reservation-query";
import { cn } from "@/lib/utils";
import { reservationStatusSpanish } from "../../constants/status-reservation-spanish";
import { calculateCostDay } from "../../utils/calculate-cost-day";
import { ReservationStatus } from "../../interfaces/reservation.interface";
import Link from "next/link";
import LoadingInfo from "../components/loading/loading-info-vehicle";
import InfoError from "@/shared/components/info-error";

interface ReservationClientViewProps {
  reservationId: number;
}

export default function ReservationClientView({
  reservationId,
}: ReservationClientViewProps) {
  const { data: reservation, isFetching } = useReservationQuery(reservationId);

  if (isFetching) {
    return <LoadingInfo />;
  }

  if (!reservation) {
    return <InfoError text="No se encontró la reserva" />;
  }

  const { vehicle, endDate, id, startDate, status, totalAmount } = reservation;

  const { costPerDay, days } = calculateCostDay(
    Number(totalAmount),
    new Date(startDate),
    new Date(endDate)
  );

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Detalles de la Reserva</h1>
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <div className="aspect-video relative rounded-lg overflow-hidden mb-4">
              <Image
                src={vehicle.url || "/images/not-image-vehicle.png"}
                alt="BMW S5 2024"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="flex justify-between items-center">
              <div>
                <span className="text-2xl font-bold">
                  {vehicle?.brand} {vehicle?.model} {vehicle?.year}
                </span>
                <p className="text-muted-foreground">Placa: UTS-9915</p>
              </div>
              <Badge
                className={cn([
                  "text-lg py-1 px-3",
                  reservationStatusSpanish[status].color,
                ])}
              >
                {reservationStatusSpanish[status].label}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Detalles de la Reserva</CardTitle>
              <CardDescription>Reserva # 00{id}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center gap-4">
                <CalendarDays className="h-5 w-5 text-primary" />
                <div>
                  <span className="font-semibold">Fechas de Reserva</span>
                  <p className="text-sm text-muted-foreground">
                    {startDate} - {endDate}
                  </p>
                </div>
              </div>
              <Separator />
              <div className="flex items-center gap-4">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <span className="font-semibold">Horarios</span>
                  <p className="text-sm text-muted-foreground">
                    Recogida: 10:00 AM
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Devolución: 10:00 AM
                  </p>
                </div>
              </div>
              <Separator />
              <div className="flex items-center gap-4">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <span className="font-semibold">Ubicación</span>
                  <p className="text-sm text-muted-foreground">
                    Centro de Alquiler Principal
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Av. Principal #123
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Resumen de Pago</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex justify-between">
                <span className="text-sm">Precio por día</span>
                <span className="font-medium">${costPerDay}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Días de alquiler</span>
                <span className="font-medium">{days}</span>
              </div>

              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${totalAmount}</span>
              </div>
            </CardContent>
            <CardFooter>
              {status === ReservationStatus.Pending && (
                <Link href={`/reservations/payment/${id}`} className="w-full">
                  <Button
                    className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90 transition-colors"
                    size="lg"
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Proceder al Pago
                  </Button>
                </Link>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import { CreditCard, DollarSign, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useReservationQuery } from "../../hooks/use-reservation-query";
import LoadingInfo from "../components/loading/loading-info-vehicle";
import { ReservationStatus } from "../../interfaces/reservation.interface";
import { formatDate } from "@/lib/format-date";
import { calculateCostDay } from "../../utils/calculate-cost-day";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { usePaymentForm } from "../../hooks/use-payment-form";
import { FormProvider } from "react-hook-form";
import RHFInput from "@/components/rhf/RHFInput";
import RHFSelect from "@/components/rhf/RHFSelect";
import InfoError from "@/shared/components/info-error";

interface PaymentViewProps {
  reservationId: number;
}

export default function PaymentView({ reservationId }: PaymentViewProps) {
  const { data: reservation, isFetching } = useReservationQuery(reservationId);

  const { isSubmiting, methods, onSubmit } = usePaymentForm({ reservationId });

  if (isFetching) {
    return <LoadingInfo />;
  }

  if (!reservation) {
    return <div>Reserva no encontrada</div>;
  }

  const { vehicle, endDate, startDate, totalAmount, status } = reservation;

  const { costPerDay, days } = calculateCostDay(
    Number(totalAmount),
    new Date(startDate),
    new Date(endDate)
  );

  if (status !== ReservationStatus.Pending) {
    return <InfoError text="La reserva ya esta pagada" />;
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="container mx-auto py-10 px-4"
      >
        <h1 className="text-3xl font-bold mb-6">Pago de Reserva</h1>
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Método de Pago</CardTitle>
              <CardDescription>
                Selecciona tu método de pago preferido
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <RadioGroup
                defaultValue="card"
                className="grid grid-cols-2 gap-4"
              >
                <Label
                  htmlFor="credit-card"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                >
                  <RadioGroupItem
                    value="credit-card"
                    id="credit-card"
                    className="sr-only"
                  />
                  <CreditCard className="mb-3 h-6 w-6" />
                  Tarjeta de Crédito
                </Label>
                <Label
                  htmlFor="debit-card"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                >
                  <RadioGroupItem
                    value="debit-card"
                    id="debit-card"
                    className="sr-only"
                  />
                  <CreditCard className="mb-3 h-6 w-6" />
                  Tarjeta de Debito
                </Label>
              </RadioGroup>

              <div className="grid gap-4">
                <div className="grid gap-2">
                  <RHFInput
                    name="fullName"
                    label="Nombre en la Tarjeta"
                    placeholder="Nombre completo"
                  />
                </div>
                <div className="grid gap-2">
                  <RHFInput
                    name="cardNumber"
                    label="Número de Tarjeta"
                    placeholder="1234 5678 9012 3456"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="grid gap-2">
                    <RHFSelect
                      name="month"
                      label="Mes"
                      options={[
                        { value: "01", label: "01" },
                        { value: "02", label: "02" },
                        { value: "03", label: "03" },
                        { value: "04", label: "04" },
                        { value: "05", label: "05" },
                        { value: "06", label: "06" },
                        { value: "07", label: "07" },
                        { value: "08", label: "08" },
                        { value: "09", label: "09" },
                        { value: "10", label: "10" },
                        { value: "11", label: "11" },
                        { value: "12", label: "12" },
                      ]}
                    />
                  </div>
                  <div className="grid gap-2">
                    <RHFSelect
                      name="year"
                      label="Año"
                      options={[
                        { value: "2024", label: "2024" },
                        { value: "2025", label: "2025" },
                        { value: "2026", label: "2026" },
                        { value: "2027", label: "2027" },
                        { value: "2028", label: "2028" },
                        { value: "2029", label: "2029" },
                        { value: "2030", label: "2030" },
                        { value: "2031", label: "2031" },
                        { value: "2032", label: "2032" },
                        { value: "2033", label: "2033" },
                        { value: "2034", label: "2034" },
                      ]}
                    />
                  </div>
                  <div className="grid gap-2">
                    <RHFInput name="cvv" label="CVV" placeholder="123" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Resumen de la Reserva</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center gap-4">
                <Image
                  src={
                    reservation?.vehicle.url || "/images/not-image-vehicle.png"
                  }
                  alt="BMW S5 2024"
                  width={64}
                  height={64}
                  className="rounded-md"
                />
                <div>
                  <h3 className="font-semibold">
                    {vehicle.brand} {vehicle.model} {vehicle.year}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(startDate, "dd/mm/yyyy")} -{" "}
                    {formatDate(endDate, "dd/mm/yyyy")}
                  </p>
                </div>
              </div>
              <Separator />
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
            <CardFooter className="flex flex-col gap-4">
              <Button
                disabled={isSubmiting}
                className="w-full"
                size="lg"
                type="submit"
              >
                Confirmar Pago{" "}
                {isSubmiting ? <LoadingSpinner /> : <DollarSign />}
              </Button>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4" />
                Pago seguro y encriptado
              </div>
            </CardFooter>
          </Card>
        </div>
      </form>
    </FormProvider>
  );
}

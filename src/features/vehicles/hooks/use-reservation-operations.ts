"use client";

import { useRouter } from "next/navigation";
import { ReservationCreate } from "../interfaces/reservation.interface";
import { ReservationService } from "../services/reservation.service";
import { toast } from "sonner";
import { useState } from "react";
import { invalidateQuery } from "@/lib/invalidate-query";
import { QUERY_KEYS } from "@/shared/api/query-key";
import { wait } from "@/lib/wait";

const useReservationOperations = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const reservationService = ReservationService.getInstance();
  const router = useRouter();

  const createReservation = async (params: ReservationCreate) => {
    try {
      setLoading(true);
      const response = await reservationService.create({ reservation: params });
      toast.success("Reservación creada correctamente");
      router.push(`/reservations/${response.id}`);
      invalidateQuery([QUERY_KEYS.RESERVATION]);
      invalidateQuery([QUERY_KEYS.VEHICLES]);
      setLoading(false);
    } catch (error: unknown) {
      setError(error as string);
      setLoading(false);
    }
  };

  const updateReservation = async (id: number, params: ReservationCreate) => {
    try {
      setLoading(true);
      await reservationService.update(id, { reservation: params });
      toast.success("Reservación actualizada correctamente");
      router.push(`/reservations/${id}`);
      invalidateQuery([QUERY_KEYS.RESERVATION]);
      invalidateQuery([QUERY_KEYS.VEHICLES]);
      setLoading(false);
    } catch (error) {
      setError(error as string);
      setLoading(false);
    }
  };

  const cancelReservation = async (reservationId: number) => {
    try {
      setLoading(true);
      await reservationService.cancel(reservationId);
      toast.success("Reservación cancelada correctamente");
      invalidateQuery([QUERY_KEYS.RESERVATION]);
      invalidateQuery([QUERY_KEYS.VEHICLES]);
      setLoading(false);
    } catch (error) {
      setError(error as string);
      setLoading(false);
    }
  };

  const checkoutReservation = async (
    reservationId: number,
    initialOdometer: number
  ) => {
    try {
      if (initialOdometer < 0) {
        toast.error("El kilometraje inicial no puede ser negativo");
        return;
      }

      if (Number.isNaN(initialOdometer)) {
        toast.error("El kilometraje inicial debe ser un número");
        return;
      }

      setLoading(true);
      await reservationService.checkout(reservationId, initialOdometer);
      toast.success("Reservación check-out correctamente");
      router.push(`/management/reservations/${reservationId}`);
      invalidateQuery([QUERY_KEYS.RESERVATION]);
      invalidateQuery([QUERY_KEYS.VEHICLES]);
      setLoading(false);
    } catch (error) {
      setError(error as string);
      setLoading(false);
    }
  };

  const checkinReservation = async (
    reservationId: number,
    finalOdometer: number
  ) => {
    try {
      setLoading(true);
      await reservationService.checkin(reservationId, finalOdometer);
      toast.success("Reservación check-in correctamente");
      router.push(`/reservations/${reservationId}`);
      invalidateQuery([QUERY_KEYS.RESERVATION]);
      invalidateQuery([QUERY_KEYS.VEHICLES]);
      setLoading(false);
    } catch (error) {
      setError(error as string);
      setLoading(false);
    }
  };

  const confirmPayment = async (reservationId: number) => {
    try {
      setLoading(true);
      await wait(2);
      await reservationService.confirmPayment(reservationId);
      toast.success("Pago confirmado correctamente");
      router.push(`/reservations/${reservationId}`);
      invalidateQuery([QUERY_KEYS.RESERVATION]);
      invalidateQuery([QUERY_KEYS.VEHICLES]);
      setLoading(false);
    } catch (error) {
      setError(error as string);
      setLoading(false);
    }
  };

  return {
    createReservation,
    updateReservation,
    cancelReservation,
    checkoutReservation,
    checkinReservation,
    loading,
    error,
    confirmPayment,
  };
};

export default useReservationOperations;

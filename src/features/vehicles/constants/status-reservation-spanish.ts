import { ReservationStatus } from "../interfaces/reservation.interface";

interface StatusSpanish {
  label: string;
  color: string;
  variant?: string;
}

export const reservationStatusSpanish: Record<
  ReservationStatus,
  StatusSpanish
> = {
  pending: {
    label: "Pendiente",
    color: "bg-yellow-600 hover:bg-yellow-600/50",
  },
  confirmed: {
    label: "Confirmada",
    color: "bg-green-600 hover:bg-green-600/50",
  },
  checked_out: {
    label: "Check-out",
    color: "bg-blue-600 hover:bg-blue-600/50",
  },
  cancelled: {
    label: "Cancelada",
    color: "bg-red-600 hover:bg-red-600/50",
  },
  completed: {
    label: "Completada",
    color: "bg-purple-600 hover:bg-purple-600/50",
  },
};

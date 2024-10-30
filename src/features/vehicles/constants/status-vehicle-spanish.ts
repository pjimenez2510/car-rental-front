import { VehicleStatus } from "../interfaces/vehicle.interface";

interface StatusSpanish {
  label: string;
  color: string;
}

export const vehicleStatusSpanish: Record<VehicleStatus, StatusSpanish> = {
  available: {
    label: "Disponible",
    color: "bg-green-600 hover:bg-green-600/50",
  },
  maintenance: {
    label: "En manteniemiento",
    color: "bg-red-600 hover:bg-red-600/50",
  },
  rented: {
    label: "Rentado",
    color: "bg-blue-600 hover:bg-blue-600/50",
  },
  reserved: {
    label: "Reservado",
    color: "bg-purple-600 hover:bg-purple-600/50",
  },
};

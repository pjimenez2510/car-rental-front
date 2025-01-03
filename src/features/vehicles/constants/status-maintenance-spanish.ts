import { MaintenanceStatus } from "../interfaces/maintenace.interface";

interface StatusSpanish {
  label: string;
  color: string;
}

export const maintenanceStatusSpanish: Record<
  MaintenanceStatus,
  StatusSpanish
> = {
  Scheduled: {
    label: "Programada",
    color: "bg-yellow-600 hover:bg-yellow-600/50",
  },
  InProgress: {
    label: "En progreso",
    color: "bg-blue-600 hover:bg-blue-600/50",
  },
  Completed: {
    label: "Completada",
    color: "bg-green-600 hover:bg-green-600/50",
  },
};

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Reservation } from "../../interfaces/reservation.interface";

interface ReservationFiltersProps {
  reservations: Reservation[] | undefined;
  setFilteredReservations: (reservations: Reservation[]) => void;
}

interface FilterState {
  licensePlate: string;
  customer: string;
  vehicle: string;
}

const ReservationFilters: React.FC<ReservationFiltersProps> = ({
  reservations,
  setFilteredReservations,
}) => {
  const [filters, setFilters] = useState<FilterState>({
    licensePlate: "",
    customer: "",
    vehicle: "",
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newFilters = {
      ...filters,
      [name]: value,
    };

    setFilters(newFilters);

    // Si todos los filtros están vacíos, mostramos todas las reservaciones
    if (
      !newFilters.licensePlate &&
      !newFilters.customer &&
      !newFilters.vehicle
    ) {
      setFilteredReservations(reservations || []);
      return;
    }

    // Si hay algún filtro activo, aplicamos la lógica de filtrado
    const filtered =
      reservations?.filter((reservation) => {
        const licensePlateMatch = reservation.vehicle.licensePlate
          .toLowerCase()
          .includes(newFilters.licensePlate.toLowerCase());

        const customerMatch =
          `${reservation.customer?.user.firstName} ${reservation.customer?.user.lastName}`
            .toLowerCase()
            .includes(newFilters.customer.toLowerCase());

        const vehicleMatch =
          `${reservation.vehicle.brand} ${reservation.vehicle.model}`
            .toLowerCase()
            .includes(newFilters.vehicle.toLowerCase());

        return (
          (newFilters.licensePlate === "" || licensePlateMatch) &&
          (newFilters.customer === "" || customerMatch) &&
          (newFilters.vehicle === "" || vehicleMatch)
        );
      }) || [];

    setFilteredReservations(filtered);
  };

  return (
    <div className="grid gap-4 mb-6 md:grid-cols-3">
      <div className="space-y-2">
        <Label htmlFor="licensePlate">Placa</Label>
        <Input
          id="licensePlate"
          name="licensePlate"
          placeholder="Buscar por placa..."
          value={filters.licensePlate}
          onChange={handleFilterChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="customer">Cliente</Label>
        <Input
          id="customer"
          name="customer"
          placeholder="Buscar por cliente..."
          value={filters.customer}
          onChange={handleFilterChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="vehicle">Vehículo</Label>
        <Input
          id="vehicle"
          name="vehicle"
          placeholder="Buscar por vehículo..."
          value={filters.vehicle}
          onChange={handleFilterChange}
        />
      </div>
    </div>
  );
};

export default ReservationFilters;

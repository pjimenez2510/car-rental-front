"use client";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import LoadingTable from "./loading/loading-table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { reservationStatusSpanish } from "../../constants/status-reservation-spanish";
import {
  Reservation,
  ReservationStatus,
} from "../../interfaces/reservation.interface";
import ReservationFilters from "./reservation-filters";

interface TableReservationProps {
  reservations?: Reservation[];
  isFetching: boolean;
}

const TableReservationManagement: React.FC<TableReservationProps> = ({
  reservations,
  isFetching,
}: TableReservationProps) => {
  const router = useRouter();
  const [filteredReservations, setFilteredReservations] = useState<
    Reservation[]
  >([]);

  // Inicializamos y actualizamos los datos filtrados cuando cambian las reservaciones
  useEffect(() => {
    if (reservations) {
      setFilteredReservations(reservations);
    }
  }, [reservations]);

  return (
    <>
      <ReservationFilters
        reservations={reservations}
        setFilteredReservations={setFilteredReservations}
      />

      {isFetching ? (
        <LoadingTable />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fecha de recogida</TableHead>
              <TableHead>Fecha de devolución</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Costo</TableHead>
              <TableHead>Vehiculo</TableHead>
              <TableHead>Placa</TableHead>
              <TableHead>CLiente</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReservations.map((reservation) => (
              <TableRow key={reservation.id}>
                <TableCell>{reservation.startDate}</TableCell>
                <TableCell>{reservation.endDate}</TableCell>
                <TableCell>
                  <Badge
                    className={cn([
                      reservationStatusSpanish[reservation.status].color,
                    ])}
                  >
                    {reservationStatusSpanish[reservation.status].label}
                  </Badge>
                </TableCell>
                <TableCell>{reservation.totalAmount}</TableCell>
                <TableCell>
                  {reservation.vehicle.brand} {reservation.vehicle?.model}{" "}
                </TableCell>
                <TableCell>{reservation.vehicle.licensePlate}</TableCell>
                <TableCell>
                  {reservation.customer.user.firstName}{" "}
                  {reservation.customer.user.lastName}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={() =>
                          router.push(
                            `/management/reservations/${reservation.id}`
                          )
                        }
                      >
                        Ver
                      </DropdownMenuItem>

                      {reservation.status === ReservationStatus.CheckedOut && (
                        <DropdownMenuItem
                          onClick={() =>
                            router.push(
                              `/management/reservations/check-in/${reservation.id}`
                            )
                          }
                        >
                          Check In
                        </DropdownMenuItem>
                      )}
                      {reservation.status === ReservationStatus.Confirmed && (
                        <DropdownMenuItem
                          onClick={() =>
                            router.push(
                              `/management/reservations/check-out/${reservation.id}`
                            )
                          }
                        >
                          Check Out
                        </DropdownMenuItem>
                      )}

                      <DropdownMenuSeparator />
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default TableReservationManagement;

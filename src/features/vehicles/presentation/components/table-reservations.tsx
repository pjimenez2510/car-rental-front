"use client";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import useReservationOperations from "../../hooks/use-reservation-operations";
import { reservationStatusSpanish } from "../../constants/status-reservation-spanish";
import { Reservation } from "../../interfaces/reservation.interface";

interface TableRervationProps {
  reservations?: Reservation[];
  isFetching: boolean;
}
const TableRervation = ({ reservations, isFetching }: TableRervationProps) => {
  const { cancelReservation } = useReservationOperations();
  const router = useRouter();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedReservationId, setSelectedReservationId] = useState<
    number | null
  >(null);

  const hancleCancelClick = (reservationId: number) => {
    setSelectedReservationId(reservationId);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmCancel = () => {
    if (selectedReservationId) {
      cancelReservation(selectedReservationId);
    }
    setIsDeleteDialogOpen(false);
  };

  return (
    <>
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
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reservations?.map((reservation) => (
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
                          router.push(`/reservations/${reservation.id}`)
                        }
                      >
                        Ver
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          router.push(`/reservations/edit/${reservation.id}`)
                        }
                      >
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => hancleCancelClick(reservation.id)}
                      >
                        Cancelar reserva
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. La reserva se cancelara y no
              podra ser recuperada.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmCancel}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default TableRervation;

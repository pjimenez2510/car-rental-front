"use client";
import { useReservationsQuery } from "../../hooks/use-reservation-query";
import TableRervationManagment from "../components/table-reservations-managment";

export default function RerservationsManagmentView() {
  const { data: reservations, isFetching } = useReservationsQuery();

  return (
    <TableRervationManagment
      reservations={reservations}
      isFetching={isFetching}
    />
  );
}

"use client";
import { useReservationsByCustomerLogget } from "@/features/customer/hooks/use-customer-query";
import TableRervation from "../components/table-reservations";

export default function ReservationClientView() {
  const { data: reservations, isFetching } = useReservationsByCustomerLogget();

  return <TableRervation reservations={reservations} isFetching={isFetching} />;
}

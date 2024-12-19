import ReservationClientView from "@/features/vehicles/presentation/views/reservation-client-view";

interface Props {
  params: {
    id: string;
  };
}

export default function Page({ params }: Props) {
  if (!params.id) {
    return <div>Invalid ID</div>;
  }

  return <ReservationClientView reservationId={Number(params.id)} />;
}

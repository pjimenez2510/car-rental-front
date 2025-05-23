import NewReservationView from "@/features/vehicles/presentation/views/new-reservation-view";
interface Props {
  params: {
    id: string;
  };
}

export default function Page({ params }: Props) {
  if (!params.id) {
    return <div>Invalid ID</div>;
  }

  return <NewReservationView vehicleId={Number(params.id)} />;
}

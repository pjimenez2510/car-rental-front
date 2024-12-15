import ReservationView from "@/features/vehicles/presentation/views/reservation-view";
interface Props {
  params: {
    id: string;
  };
}

export default function Page({ params }: Props) {
  if (!params.id) {
    return <div>Invalid ID</div>;
  }

  return <ReservationView vehicleId={Number(params.id)} />;
}

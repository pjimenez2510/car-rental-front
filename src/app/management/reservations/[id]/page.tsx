import { ContentLayout } from "@/core/layout/content/content-layout";
import ReservationManagementView from "@/features/vehicles/presentation/views/reservation-management-view";

interface PageProps {
  params: {
    id: string;
  };
}

export default function Page({ params }: PageProps) {
  return (
    <ContentLayout title="Reservación">
      <ReservationManagementView reservationId={Number(params.id)} />
    </ContentLayout>
  );
}

import { ContentLayout } from "@/core/layout/content/content-layout";
import RerservationsManagmentView from "@/features/vehicles/presentation/views/reservations-managment-view";

export default function ListPage() {
  return (
    <ContentLayout title="Lista de reservaciones">
      <RerservationsManagmentView />
    </ContentLayout>
  );
}

import { ContentLayout } from "@/core/layout/content/content-layout";
import MaintenanceView from "@/features/vehicles/presentation/views/maintanance-view";

export default function MaintenancesPage() {
  return (
    <ContentLayout title="Matenimientos">
      <MaintenanceView />
    </ContentLayout>
  );
}

import { ContentLayout } from "@/core/layout/content/content-layout";
import NewVehicle from "@/features/vehicles/presentation/views/new-vehicle-view";

export default function CreatePage() {
  return (
    <ContentLayout title="Nuevo auto">
      <NewVehicle />
    </ContentLayout>
  );
}

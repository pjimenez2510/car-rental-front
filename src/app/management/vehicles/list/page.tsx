import { ContentLayout } from "@/core/layout/content/content-layout";
import ListVehicleView from "@/features/vehicles/presentation/views/list-vehicles-view";

export default function ListPage() {
  return (
    <ContentLayout title="Lista de autos">
      Lista de autos
      <ListVehicleView />
    </ContentLayout>
  );
}

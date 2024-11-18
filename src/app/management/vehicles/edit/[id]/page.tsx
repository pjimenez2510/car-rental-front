import { ContentLayout } from "@/core/layout/content/content-layout";
import EditVehicle from "@/features/vehicles/presentation/views/edit-vehicle-view";

interface EditPageProps {
  params: {
    id: string;
  };
}

export default function EditPage({ params }: EditPageProps) {
  return (
    <ContentLayout title="Nuevo auto">
      <EditVehicle id={Number(params.id)} />
    </ContentLayout>
  );
}

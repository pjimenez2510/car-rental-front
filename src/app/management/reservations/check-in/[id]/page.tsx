import { ContentLayout } from "@/core/layout/content/content-layout";
import CheckInView from "@/features/vehicles/presentation/views/check-in-view";

interface EditPageProps {
  params: {
    id: string;
  };
}

export default function Page({ params }: EditPageProps) {
  return (
    <ContentLayout title="Check In">
      <CheckInView reservationId={Number(params.id)} />
    </ContentLayout>
  );
}

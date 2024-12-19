import { ContentLayout } from "@/core/layout/content/content-layout";
import CheckOutView from "@/features/vehicles/presentation/views/check-out-view";

interface EditPageProps {
  params: {
    id: string;
  };
}

export default function Page({ params }: EditPageProps) {
  return (
    <ContentLayout title="Check Out">
      <CheckOutView reservationId={Number(params.id)} />
    </ContentLayout>
  );
}

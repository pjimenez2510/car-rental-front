import PaymentView from "@/features/vehicles/presentation/views/payment-view";

interface Props {
  params: {
    id: string;
  };
}

export default function Page({ params }: Props) {
  if (!params.id) {
    return <div>Invalid ID</div>;
  }

  return <PaymentView reservationId={Number(params.id)} />;
}

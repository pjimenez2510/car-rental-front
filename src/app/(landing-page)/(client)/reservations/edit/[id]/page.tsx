interface Props {
  params: {
    id: string;
  };
}

export default function Page({ params }: Props) {
  if (!params.id) {
    return <div>Invalid ID</div>;
  }

  return <div>Edit Rerservation {params.id}</div>;
}

import RecoveryView from "@/features/auth/presentation/views/recovery.view";

export default function Page() {
  return (
    <>
      <h2 className="text-center">
        Ingresa tu nueva contraseña para resetearla.
      </h2>
      <RecoveryView />
    </>
  );
}

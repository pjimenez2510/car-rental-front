import EmailGenderView from "@/features/auth/presentation/views/email-gender.view";

export default function Page() {
  return (
    <>
      <h2 className="text-center">
        ¿Olvidaste tu contraseña? <br />
        Ingresa tu email y te enviaremos un link para resetearla.
      </h2>
      <EmailGenderView />
    </>
  );
}

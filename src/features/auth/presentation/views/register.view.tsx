import Image from "next/image";
import RegisterForm from "../components/register-form";

export default function RegisterView() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <Image
        priority
        src="/images/logo.avif"
        alt="RentCard logo"
        width={170}
        height={170}
        className="rounded-full"
      />
      <h1 className="text-2xl">RentCard</h1>
      <h2>Registrarse para poder iniciar sesión</h2>
      <RegisterForm />
    </div>
  );
}

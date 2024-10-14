"use client";

import Image from "next/image";
import LoginForm from "../components/login-form";

export default function LoginView() {
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
      <h2>Inicio de sesión</h2>
      <LoginForm />
    </div>
  );
}

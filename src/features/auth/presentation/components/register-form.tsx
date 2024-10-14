"use client";

import { FormProvider } from "react-hook-form";

import { Button } from "@/components/ui/button";

import { LoadingSpinner } from "@/components/ui/loading-spinner";
import RHFInput from "@/components/rhf/RHFInput";
import RHFPasswordInput from "@/components/rhf/RHFPasswordInput";
import Link from "next/link";
import { useRegister } from "../../hooks/use-register-form";

const RegisterForm = () => {
  const { methods, onSubmit, isSubmiting } = useRegister();

  return (
    <>
      <FormProvider {...methods}>
        <form
          className="flex md:min-w-96 flex-col items-center gap-4"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <RHFInput name="firstName" label="Nombre" placeholder="Nombre" />
          <RHFInput name="lastName" label="Apellido" placeholder="Apellido" />
          <RHFInput
            name="username"
            label="Nombre de usuario"
            placeholder="Nombre de usuario"
          />
          <RHFInput
            name="email"
            label="Email"
            placeholder="ejemplo@ejemplo.com"
          />
          <RHFPasswordInput
            name="password"
            label="Contraseña"
            placeholder="Contraseña"
          />

          <Button disabled={isSubmiting} type="submit">
            {isSubmiting ? <LoadingSpinner /> : "Registrarse"}
          </Button>
        </form>
        <p className="text-center text-sm">
          Ya tenés una cuenta?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            Inicia sesión
          </Link>
        </p>
      </FormProvider>
    </>
  );
};

export default RegisterForm;

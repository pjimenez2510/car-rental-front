"use client";

import { FormProvider } from "react-hook-form";

import { Button } from "@/components/ui/button";

import { LoadingSpinner } from "@/components/ui/loading-spinner";
import RHFInput from "@/components/rhf/RHFInput";
import RHFPasswordInput from "@/components/rhf/RHFPasswordInput";
import Link from "next/link";
import { useRegister } from "../../hooks/use-register-form";

const RegisterForm = () => {
  const { methods, onSubmit, isSubmiting, isValidEmail } = useRegister();

  return (
    <>
      <FormProvider {...methods}>
        <form
          className="flex flex-col items-center  w-full max-w-xl"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <RHFInput name="firstName" label="Nombre" placeholder="Nombre" />
          <RHFInput name="lastName" label="Apellido" placeholder="Apellido" />
          <RHFInput name="ci" label="Cedula" />
          <RHFInput name="address" label="Direccion" />
          <RHFInput name="phoneNumber" label="Telefono" />
          <RHFInput name="driverLicenseNumber" label="Licencia" />
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
          <Button className="my-4" disabled={isSubmiting} type="submit">
            {isSubmiting ? <LoadingSpinner /> : "Registrarse"}
          </Button>
        </form>
        <p className="text-center text-sm">
          Ya tenés una cuenta?
          <Link href="/login" className="text-blue-500 hover:underline">
            Inicia sesión
          </Link>
        </p>
      </FormProvider>
    </>
  );
};

export default RegisterForm;

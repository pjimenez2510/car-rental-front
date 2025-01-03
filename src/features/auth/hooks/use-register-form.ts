"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { useAuthOperations } from "./use-auth-operations";
import useCustomerOperations from "@/features/customer/hooks/use-customer-operations";

const schema = z.object({
  ci: z
    .string()
    .regex(/^\d+$/, "La cedula solo debe contener digitos")
    .max(10, "La cedula debe tener 10 dígitos")
    .min(10, "La cedula debe tener 10 dígitos"),
  address: z.string().min(1, "La dirección es requerida"),
  phoneNumber: z
    .string()
    .regex(/^\d+$/, "El número de teléfono solo debe contener digitos")
    .min(8, "El número de teléfono debe tener al menos 8 dígitos"),
  driverLicenseNumber: z
    .string()
    .regex(/^[A-Z0-9]+$/, "La licencia no cumple el formato ej: A123456789")
    .min(1, "El número de licencia es requerido"),
  firstName: z.string().min(1, "El nombre es requerido"),
  lastName: z.string().min(1, "El apellido es requerido"),
  username: z.string().min(1, "El nombre de usuario es requerido"),
  email: z
    .string()
    .min(1, "El email es requerido")
    .email("El email no es válido"),
  password: z
    .string()
    .min(6, "La contraseña debe tener como mínimo 6 carácteres"),
});

type FormFields = z.infer<typeof schema>;

export function useRegister() {
  const { loginHandler } = useAuthOperations();
  const { createCustomer } = useCustomerOperations();
  const methods = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      ci: undefined,
      address: "",
      phoneNumber: "",
      driverLicenseNumber: "",
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const customer = await createCustomer({
      ci: data.ci,
      address: data.address,
      phoneNumber: data.phoneNumber,
      driverLicenseNumber: data.driverLicenseNumber,
      user: {
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        email: data.email,
        password: data.password,
      },
    });

    if (!customer) return;

    await loginHandler({
      email: customer.user.email,
      password: data.password,
    });
  };

  return { onSubmit, methods, isSubmiting: methods.formState.isSubmitting };
}

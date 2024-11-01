"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { useAuthFacade } from "./use-auth-facade";

const schema = z.object({
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
  const { registerHandler } = useAuthFacade();
  const methods = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    await registerHandler(data);
  };

  return { onSubmit, methods, isSubmiting: methods.formState.isSubmitting };
}

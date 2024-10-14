"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { login } from "../services/actions/login";
import toast from "react-hot-toast";
import { AuthDatasourceImpl } from "../services/auth.datasource";

const schema = z.object({
  email: z
    .string()
    .min(1, "El email es requerido")
    .email("El email no es válido"),
  password: z.string().min(1, "La contraseña es requerida"),
});

type FormFields = z.infer<typeof schema>;

export function useLogin() {
  const methods = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    await AuthDatasourceImpl.getInstance()
      .login({
        email: data.email,
        password: data.password,
      })
      .then(async (res) => {
        const isLogged = await login(res);

        if (!isLogged.ok) {
          toast.error(isLogged.message);
          return;
        }
        toast.success(isLogged.message);
        window.location.replace("/");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return { onSubmit, methods, isSubmiting: methods.formState.isSubmitting };
}

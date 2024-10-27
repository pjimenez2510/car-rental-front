"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { login } from "../services/actions/login";
import { AuthDatasourceImpl } from "../services/auth.datasource";
import { toast } from "sonner";
import { routesRedirectAuth } from "@/lib/routes-redirect";
import { useSearchParams } from "next/navigation";

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
  const searchParams = useSearchParams();

  const redirectPath = searchParams.get("callbackUrl");

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
    await AuthDatasourceImpl.getInstance()
      .register({
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        email: data.email,
        password: data.password,
      })
      .then(async (res) => {
        const isLogged = await login(res);

        if (!isLogged.ok) {
          return;
        }
        toast.success(isLogged.message);
        const path = redirectPath ?? routesRedirectAuth[res.user.role];
        window.location.replace(path);
      })
      .catch(() => {});
  };

  return { onSubmit, methods, isSubmiting: methods.formState.isSubmitting };
}

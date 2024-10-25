"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { AuthDatasourceImpl } from "../services/auth.datasource";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

const schema = z
  .object({
    password: z.string().min(1, "La contraseña es requerida"),
    passwordConfirmation: z
      .string()
      .min(1, "La contraseña de confirmación es requerida"),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Las contraseñas no coinciden",
    path: ["passwordConfirmation"],
  });

type FormFields = z.infer<typeof schema>;

export function useRecoveryForm() {
  const searhParams = useSearchParams();
  const router = useRouter();
  const methods = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      password: "",
      passwordConfirmation: "",
    },
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const token = searhParams.get("reset_password_token");
    if (!token) {
      toast.error("El token de reseteo no ha sido probehido");
      return;
    }
    await AuthDatasourceImpl.getInstance()
      .recoveryPassword({ ...data, resetPasswordToken: token })
      .then(async (res) => {
        toast.success(res);
        router.push("/login");
      })
      .catch(() => {});
  };

  return { onSubmit, methods, isSubmiting: methods.formState.isSubmitting };
}

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { AuthDatasourceImpl } from "../services/auth.datasource";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const schema = z.object({
  email: z
    .string()
    .min(1, "El email es requerido")
    .email("El email no es válido"),
});

type FormFields = z.infer<typeof schema>;

export function useEmailGenderForm() {
  const router = useRouter();
  const methods = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    await AuthDatasourceImpl.getInstance()
      .emailGender(data)
      .then(async (res) => {
        toast.success(res);
        router.push("/login");
      })
      .catch(() => {});
  };

  return { onSubmit, methods, isSubmiting: methods.formState.isSubmitting };
}

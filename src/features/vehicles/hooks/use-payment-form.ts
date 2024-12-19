"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import useReservationOperations from "./use-reservation-operations";

const currentYear = new Date().getFullYear();
const CARD_REGEX =
  /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|6(?:011|5[0-9]{2})[0-9]{12})$/;

const schema = z.object({
  fullName: z
    .string()
    .min(1, "El nombre es requerido")
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(100, "El nombre no puede exceder 100 caracteres")
    .regex(/^[a-zA-ZáéíóúñÁÉÍÓÚÑ\s]+$/, "El nombre solo debe contener letras"),

  cardNumber: z
    .string()
    .min(1, "El número de tarjeta es requerido")
    .regex(/^[0-9]+$/, "El número de tarjeta solo debe contener números")
    .regex(CARD_REGEX, "Número de tarjeta inválido")
    .transform((val) => val.replace(/\s/g, "")), // Elimina espacios en blanco

  month: z.string().min(1, "El mes es requerido"),
  year: z.string().min(1, "El año es requerido"),
  cvv: z
    .string()
    .min(1, "El CVV es requerido")
    .regex(/^[0-9]{3,4}$/, "El CVV debe tener 3 o 4 dígitos"),
});

type FormFields = z.infer<typeof schema>;

interface PaymentFormProps {
  reservationId: number;
}

export function usePaymentForm({ reservationId }: PaymentFormProps) {
  const { confirmPayment } = useReservationOperations();
  const methods = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      cardNumber: "",
      month: "",
      year: "",
      cvv: "",
    },
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      // Validación adicional de fecha de expiración
      const expirationMonth = parseInt(data.month);
      const expirationYear = parseInt(data.year);
      const currentMonth = new Date().getMonth() + 1; // Los meses en JS van de 0-11

      if (expirationYear === currentYear && expirationMonth < currentMonth) {
        methods.setError("month", {
          type: "manual",
          message: "La tarjeta está vencida",
        });
        return;
      }

      console.log("data", data);
      await confirmPayment(reservationId);
    } catch (error) {
      console.error("Error al confirmar el pago:", error);
    }
  };

  return {
    onSubmit,
    methods,
    isSubmiting: methods.formState.isSubmitting,
  };
}

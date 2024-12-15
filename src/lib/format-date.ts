import { format } from "date-fns";
import { es } from "date-fns/locale";

export const formatDate = (
  date: Date | number | string,
  formatStr: string
): string => {
  return format(date, formatStr, { locale: es });
};

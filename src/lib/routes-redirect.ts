import { UserRole } from "@/features/users/interfaces/user.interface";

export const routesRedirectAuth: Record<UserRole, string> = {
  admin: "/management/car",
  employee: "/management/car",
  customer: "/reservation",
};

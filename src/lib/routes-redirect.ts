import { UserRole } from "@/features/users/interfaces/user.interface";

export const routesRedirectAuth: Record<UserRole, string> = {
  admin: "/management/vehicles/list",
  employee: "/management/vehicles/list",
  customer: "/vehicles",
};

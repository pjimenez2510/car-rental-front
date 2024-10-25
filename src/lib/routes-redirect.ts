import { UserRole } from "@/features/users/models/user.model";

export const routesRedirectAuth: Record<UserRole, string> = {
  admin: "/management/car",
  employee: "/management/car",
  customer: "/reservation",
};

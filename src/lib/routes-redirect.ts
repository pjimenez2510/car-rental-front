import { UserRoleModel } from "@/features/users/models/user.model";

export const routesRedirectAuth: Record<UserRoleModel, string> = {
  admin: "/management/car",
  employee: "/management/car",
  customer: "/management/car",
};

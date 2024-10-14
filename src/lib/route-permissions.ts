import { UserRoleModel } from "@/features/users/models/user.model";
import { pathToRegexp } from "path-to-regexp";

interface RoutesPrivate {
  path: string;
  roles: UserRoleModel[];
}

const routes: RoutesPrivate[] = [
  {
    path: "/management/car",
    roles: [UserRoleModel.Admin, UserRoleModel.Employee],
  },
  {
    path: "/management/car/list",
    roles: [UserRoleModel.Admin, UserRoleModel.Employee],
  },

  {
    path: "/management/car/create",
    roles: [UserRoleModel.Admin, UserRoleModel.Employee],
  },
  {
    path: "/management/car/edit/:id",
    roles: [UserRoleModel.Admin, UserRoleModel.Employee],
  },
  {
    path: "/management/car/maintenance/:id",
    roles: [UserRoleModel.Admin, UserRoleModel.Employee],
  },
];

interface RoleAllowed {
  path: boolean;
  role: boolean;
}

export function isRoleAllowed(path: string, role?: string): RoleAllowed {
  const route = routes.find((route) => {
    const regex = pathToRegexp(route.path);
    return regex.regexp.test(path);
  });

  if (!route) return { path: false, role: false };

  return { path: true, role: route.roles.includes(role as UserRoleModel) };
}

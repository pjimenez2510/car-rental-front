import { UserRole } from "@/features/users/models/user.model";
import { pathToRegexp } from "path-to-regexp";

interface RoutesPrivate {
  path: string;
  roles: UserRole[];
}

const routes: RoutesPrivate[] = [
  {
    path: "/management/car",
    roles: [UserRole.Admin, UserRole.Employee],
  },
  {
    path: "/management/car/list",
    roles: [UserRole.Admin, UserRole.Employee],
  },
  {
    path: "/management/car/create",
    roles: [UserRole.Admin, UserRole.Employee],
  },
  {
    path: "/management/car/edit/:id",
    roles: [UserRole.Admin, UserRole.Employee],
  },
  {
    path: "/management/car/maintenance/:id",
    roles: [UserRole.Admin, UserRole.Employee],
  },
  {
    path: "/reservation",
    roles: [UserRole.Customer],
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

  return { path: true, role: route.roles.includes(role as UserRole) };
}

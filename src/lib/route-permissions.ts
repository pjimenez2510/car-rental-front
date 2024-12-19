import { UserRole } from "@/features/users/interfaces/user.interface";
import { pathToRegexp } from "path-to-regexp";

interface RoutesPrivate {
  path: string;
  roles: UserRole[];
}

const routes: RoutesPrivate[] = [
  {
    path: "/management/vehicles",
    roles: [UserRole.Admin, UserRole.Employee],
  },
  {
    path: "/management/vehicles/list",
    roles: [UserRole.Admin, UserRole.Employee],
  },
  {
    path: "/management/vehicles/create",
    roles: [UserRole.Admin, UserRole.Employee],
  },
  {
    path: "/management/vehicles/edit/:id",
    roles: [UserRole.Admin, UserRole.Employee],
  },
  {
    path: "/management/vehicles/maintenance/:id",
    roles: [UserRole.Admin, UserRole.Employee],
  },
  {
    path: "/reservations",
    roles: [UserRole.Customer],
  },
  {
    path: "/reservations/:id",
    roles: [UserRole.Customer],
  },
  {
    path: "/reservations/payment/:id",
    roles: [UserRole.Customer],
  },
  {
    path: "/new-reservation/:id",
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

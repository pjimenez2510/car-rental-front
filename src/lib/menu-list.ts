import { UserRole } from "@/features/users/interfaces/user.interface";
import { Car, LucideIcon } from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
  roles: UserRole[];
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  roles: UserRole[];
  icon: LucideIcon;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export const getAllMenuList = (pathname: string) => {
  const allMenus: Group[] = [
    {
      groupLabel: "Módulos",
      menus: [
        {
          href: "/management/vehicles",
          label: "Vehículos",
          active: pathname.startsWith("/management/vehicles"),
          roles: [UserRole.Admin, UserRole.Employee, UserRole.Customer],
          icon: Car,
          submenus: [
            {
              href: "/management/vehicles/list",
              label: "Listar",
              active: pathname.startsWith("/management/vehicles/list"),
              roles: [UserRole.Admin, UserRole.Employee],
            },
            {
              href: "/management/vehicles/create",
              label: "Crear",
              active: pathname.startsWith("/management/vehicles/create"),
              roles: [UserRole.Admin, UserRole.Employee],
            },
            {
              href: "/management/vehicles/maintenances",
              label: "Mantenimientos",
              active: pathname.startsWith("/management/vehicles/maintenances"),
              roles: [UserRole.Admin, UserRole.Employee],
            },
          ],
        },
      ],
    },
  ];
  return allMenus;
};

export const getMenuList = (pathname: string, role?: UserRole): Group[] => {
  if (!role) return [];

  const allMenus = getAllMenuList(pathname);

  return allMenus
    .map((group) => ({
      ...group,
      menus: group.menus
        .filter((menu) => menu.roles.includes(role))
        .map((menu) => ({
          ...menu,
          submenus: menu.submenus.filter((submenu) =>
            submenu.roles.includes(role)
          ),
        })),
    }))
    .filter((group) => group.menus.length > 0);
};

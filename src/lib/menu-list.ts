import { UserRoleModel } from "@/features/users/models/user.model";
import { Car, LucideIcon } from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
  roles: UserRoleModel[];
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  roles: UserRoleModel[];
  icon: LucideIcon;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

const getAllMenuList = (pathname: string) => {
  const allMenus: Group[] = [
    {
      groupLabel: "Módulos",
      menus: [
        {
          href: "/management/car",
          label: "Autos",
          active: pathname.startsWith("/management/car"),
          roles: [UserRoleModel.Admin, UserRoleModel.Employee],
          icon: Car,
          submenus: [
            {
              href: "/management/car/list",
              label: "Listar",
              active: pathname.startsWith("/management/car/list"),
              roles: [UserRoleModel.Admin, UserRoleModel.Employee],
            },
            {
              href: "/management/car/create",
              label: "Crear",
              active: pathname.startsWith("/management/car/create"),
              roles: [UserRoleModel.Admin, UserRoleModel.Employee],
            },
            {
              href: "/management/car/maintenances",
              label: "Mantenimientos",
              active: pathname.startsWith("/management/car/maintenances"),
              roles: [UserRoleModel.Admin, UserRoleModel.Employee],
            },
          ],
        },
      ],
    },
  ];
  return allMenus;
};

export const getMenuList = (
  pathname: string,
  role?: UserRoleModel
): Group[] => {
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

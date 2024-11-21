import { UserRole } from "@/features/users/interfaces/user.interface";
import { getAllMenuList, getMenuList } from "@/lib/menu-list";
import { Car } from "lucide-react";

describe("Menu List Functions", () => {
  describe("getAllMenuList", () => {
    it("debería retornar la estructura completa del menú", () => {
      const pathname = "/";
      const result = getAllMenuList(pathname);

      expect(result).toEqual([
        {
          groupLabel: "Módulos",
          menus: [
            {
              href: "/management/vehicles",
              label: "Vehículos",
              active: false,
              roles: [UserRole.Admin, UserRole.Employee, UserRole.Customer],
              icon: Car,
              submenus: [
                {
                  href: "/management/vehicles/list",
                  label: "Listar",
                  active: false,
                  roles: [UserRole.Admin, UserRole.Employee],
                },
                {
                  href: "/management/vehicles/create",
                  label: "Crear",
                  active: false,
                  roles: [UserRole.Admin, UserRole.Employee],
                },
                {
                  href: "/management/vehicles/maintenances",
                  label: "Mantenimientos",
                  active: false,
                  roles: [UserRole.Admin, UserRole.Employee],
                },
              ],
            },
          ],
        },
      ]);
    });

    it("debería marcar correctamente las rutas activas para la ruta principal de vehículos", () => {
      const pathname = "/management/vehicles";
      const result = getAllMenuList(pathname);

      expect(result[0].menus[0].active).toBe(true);
      expect(
        result[0].menus[0].submenus.every((submenu) => !submenu.active)
      ).toBe(true);
    });

    it("debería marcar correctamente las rutas activas para subrutas", () => {
      const pathname = "/management/vehicles/list";
      const result = getAllMenuList(pathname);

      expect(result[0].menus[0].active).toBe(true);
      expect(result[0].menus[0].submenus[0].active).toBe(true);
      expect(result[0].menus[0].submenus[1].active).toBe(false);
      expect(result[0].menus[0].submenus[2].active).toBe(false);
    });
  });

  describe("getMenuList", () => {
    it("debería retornar un array vacío cuando no se proporciona un rol", () => {
      const result = getMenuList("/");
      expect(result).toEqual([]);
    });

    describe("Para rol Admin", () => {
      it("debería tener acceso a todas las rutas", () => {
        const result = getMenuList("/", UserRole.Admin);

        expect(result[0].menus[0].roles).toContain(UserRole.Admin);
        expect(result[0].menus[0].submenus).toHaveLength(3);
        result[0].menus[0].submenus.forEach((submenu) => {
          expect(submenu.roles).toContain(UserRole.Admin);
        });
      });

      it("debería mantener la estructura del grupo", () => {
        const result = getMenuList("/", UserRole.Admin);

        expect(result).toHaveLength(1);
        expect(result[0]).toHaveProperty("groupLabel", "Módulos");
        expect(result[0].menus).toHaveLength(1);
      });
    });

    describe("Para rol Employee", () => {
      it("debería tener acceso a todas las rutas", () => {
        const result = getMenuList("/", UserRole.Employee);

        expect(result[0].menus[0].roles).toContain(UserRole.Employee);
        expect(result[0].menus[0].submenus).toHaveLength(3);
        result[0].menus[0].submenus.forEach((submenu) => {
          expect(submenu.roles).toContain(UserRole.Employee);
        });
      });
    });

    describe("Para rol Customer", () => {
      it("debería tener acceso limitado a las rutas", () => {
        const result = getMenuList("/", UserRole.Customer);

        expect(result[0].menus[0].roles).toContain(UserRole.Customer);
        expect(result[0].menus[0].submenus).toHaveLength(0);
      });
    });

    describe("Comportamiento de rutas activas", () => {
      it("debería marcar correctamente las rutas activas para el rol Admin", () => {
        const pathname = "/management/vehicles/list";
        const result = getMenuList(pathname, UserRole.Admin);

        expect(result[0].menus[0].active).toBe(true);
        expect(result[0].menus[0].submenus[0].active).toBe(true);
      });

      it("debería marcar correctamente las rutas activas para el rol Employee", () => {
        const pathname = "/management/vehicles/create";
        const result = getMenuList(pathname, UserRole.Employee);

        expect(result[0].menus[0].active).toBe(true);
        expect(result[0].menus[0].submenus[1].active).toBe(true);
      });

      it("no debería tener submenús activos para Customer", () => {
        const pathname = "/management/vehicles/list";
        const result = getMenuList(pathname, UserRole.Customer);

        expect(result[0].menus[0].active).toBe(true);
        expect(result[0].menus[0].submenus).toHaveLength(0);
      });
    });

    describe("Filtrado de menús por rol", () => {
      it("debería filtrar correctamente los submenús según el rol", () => {
        const resultAdmin = getMenuList("/", UserRole.Admin);
        const resultEmployee = getMenuList("/", UserRole.Employee);
        const resultCustomer = getMenuList("/", UserRole.Customer);

        expect(resultAdmin[0].menus[0].submenus).toHaveLength(3);
        expect(resultEmployee[0].menus[0].submenus).toHaveLength(3);
        expect(resultCustomer[0].menus[0].submenus).toHaveLength(0);
      });

      it("debería mantener solo los grupos con menús", () => {
        const result = getMenuList("/", UserRole.Customer);

        expect(result).toHaveLength(1);
        expect(result[0].menus).toHaveLength(1);
      });
    });

    describe("Casos edge", () => {
      it("debería manejar rutas no existentes", () => {
        const result = getMenuList("/ruta-no-existente", UserRole.Admin);

        expect(result[0].menus[0].active).toBe(false);
        result[0].menus[0].submenus.forEach((submenu) => {
          expect(submenu.active).toBe(false);
        });
      });

      it("debería manejar roles no definidos en las rutas", () => {
        // Asumiendo que hay un rol que no está definido en ninguna ruta
        const result = getMenuList("/", "UNKNOWN_ROLE" as UserRole);

        expect(result).toHaveLength(0);
      });
    });
  });
});

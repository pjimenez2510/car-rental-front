import { UserRole } from "@/features/users/interfaces/user.interface";
import { getMenuList } from "@/lib/menu-list";
import { Car } from "lucide-react";

describe("Menu Utils", () => {
  const mockPathname = "/management/vehicles/list";

  test("should return empty array when role is undefined", () => {
    const result = getMenuList(mockPathname);
    expect(result).toEqual([]);
  });

  test("should return all menus and submenus for Admin role", () => {
    const result = getMenuList(mockPathname, UserRole.Admin);

    expect(result).toHaveLength(1);
    expect(result[0].groupLabel).toBe("Módulos");

    const vehicleMenu = result[0].menus[0];
    expect(vehicleMenu.label).toBe("Vehículos");
    expect(vehicleMenu.submenus).toHaveLength(3);

    expect(vehicleMenu.submenus[0].label).toBe("Listar");
    expect(vehicleMenu.submenus[1].label).toBe("Crear");
    expect(vehicleMenu.submenus[2].label).toBe("Mantenimientos");
  });

  test("should return appropriate menus and submenus for Employee role", () => {
    const result = getMenuList(mockPathname, UserRole.Employee);

    expect(result).toHaveLength(1);
    const vehicleMenu = result[0].menus[0];
    expect(vehicleMenu.submenus).toHaveLength(3);
  });

  test("should return restricted menus and submenus for Customer role", () => {
    const result = getMenuList(mockPathname, UserRole.Customer);

    expect(result).toHaveLength(1);
    const vehicleMenu = result[0].menus[0];
    expect(vehicleMenu.submenus).toHaveLength(0);
  });

  test("should set active states correctly based on pathname", () => {
    const listPathname = "/management/vehicles/list";
    const result = getMenuList(listPathname, UserRole.Admin);

    const vehicleMenu = result[0].menus[0];
    expect(vehicleMenu.active).toBe(true);
    expect(vehicleMenu.submenus[0].active).toBe(true);
    expect(vehicleMenu.submenus[1].active).toBe(false);
  });

  test("should handle different pathname sections correctly", () => {
    const createPathname = "/management/vehicles/create";
    const result = getMenuList(createPathname, UserRole.Admin);

    const vehicleMenu = result[0].menus[0];
    expect(vehicleMenu.active).toBe(true);
    expect(vehicleMenu.submenus[0].active).toBe(false);
    expect(vehicleMenu.submenus[1].active).toBe(true);
  });

  test("should return empty groups array when no menus match role", () => {
    const invalidRole = "INVALID_ROLE" as UserRole;
    const result = getMenuList(mockPathname, invalidRole);

    expect(result).toHaveLength(0);
  });

  test("should preserve menu structure and properties", () => {
    const result = getMenuList(mockPathname, UserRole.Admin);
    const vehicleMenu = result[0].menus[0];

    expect(vehicleMenu).toMatchObject({
      href: "/management/vehicles",
      label: "Vehículos",
      icon: Car,
      roles: expect.arrayContaining([
        UserRole.Admin,
        UserRole.Employee,
        UserRole.Customer,
      ]),
    });
  });

  test("should handle root pathname correctly", () => {
    const rootPathname = "/";
    const result = getMenuList(rootPathname, UserRole.Admin);

    const vehicleMenu = result[0].menus[0];
    expect(vehicleMenu.active).toBe(false);
    vehicleMenu.submenus.forEach((submenu) => {
      expect(submenu.active).toBe(false);
    });
  });

  test("should handle deeply nested pathname correctly", () => {
    const nestedPathname = "/management/vehicles/maintenances/detail/123";
    const result = getMenuList(nestedPathname, UserRole.Admin);

    const vehicleMenu = result[0].menus[0];
    expect(vehicleMenu.active).toBe(true);
    expect(vehicleMenu.submenus[2].active).toBe(true);
  });
});

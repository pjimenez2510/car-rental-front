import { UserRole } from "@/features/users/interfaces/user.interface";
import { isRoleAllowed } from "@/lib/route-permissions";

describe("isRoleAllowed", () => {
  describe("Rutas estáticas", () => {
    describe("/management/vehicles", () => {
      const path = "/management/vehicles";

      it("debería permitir acceso a Admin", () => {
        const result = isRoleAllowed(path, UserRole.Admin);
        expect(result).toEqual({ path: true, role: true });
      });

      it("debería permitir acceso a Employee", () => {
        const result = isRoleAllowed(path, UserRole.Employee);
        expect(result).toEqual({ path: true, role: true });
      });

      it("no debería permitir acceso a Customer", () => {
        const result = isRoleAllowed(path, UserRole.Customer);
        expect(result).toEqual({ path: true, role: false });
      });
    });

    describe("/management/vehicles/list", () => {
      const path = "/management/vehicles/list";

      it("debería permitir acceso a Admin", () => {
        const result = isRoleAllowed(path, UserRole.Admin);
        expect(result).toEqual({ path: true, role: true });
      });

      it("debería permitir acceso a Employee", () => {
        const result = isRoleAllowed(path, UserRole.Employee);
        expect(result).toEqual({ path: true, role: true });
      });

      it("no debería permitir acceso a Customer", () => {
        const result = isRoleAllowed(path, UserRole.Customer);
        expect(result).toEqual({ path: true, role: false });
      });
    });

    describe("/reservation", () => {
      const path = "/reservation";

      it("debería permitir acceso solo a Customer", () => {
        const result = isRoleAllowed(path, UserRole.Customer);
        expect(result).toEqual({ path: true, role: true });
      });

      it("no debería permitir acceso a Admin", () => {
        const result = isRoleAllowed(path, UserRole.Admin);
        expect(result).toEqual({ path: true, role: false });
      });

      it("no debería permitir acceso a Employee", () => {
        const result = isRoleAllowed(path, UserRole.Employee);
        expect(result).toEqual({ path: true, role: false });
      });
    });
  });

  describe("Rutas dinámicas", () => {
    describe("/management/vehicles/edit/:id", () => {
      it("debería permitir acceso a Admin con cualquier ID", () => {
        const result = isRoleAllowed(
          "/management/vehicles/edit/123",
          UserRole.Admin
        );
        expect(result).toEqual({ path: true, role: true });
      });

      it("debería permitir acceso a Employee con cualquier ID", () => {
        const result = isRoleAllowed(
          "/management/vehicles/edit/456",
          UserRole.Employee
        );
        expect(result).toEqual({ path: true, role: true });
      });

      it("no debería permitir acceso a Customer con cualquier ID", () => {
        const result = isRoleAllowed(
          "/management/vehicles/edit/789",
          UserRole.Customer
        );
        expect(result).toEqual({ path: true, role: false });
      });

      it("debería funcionar con IDs de diferentes formatos", () => {
        const paths = [
          "/management/vehicles/edit/123",
          "/management/vehicles/edit/abc-def",
          "/management/vehicles/edit/123-abc-456",
          "/management/vehicles/edit/uuid-123-456-789",
        ];

        paths.forEach((path) => {
          const result = isRoleAllowed(path, UserRole.Admin);
          expect(result).toEqual({ path: true, role: true });
        });
      });
    });

    describe("/management/vehicles/maintenance/:id", () => {
      it("debería permitir acceso a Admin con cualquier ID", () => {
        const result = isRoleAllowed(
          "/management/vehicles/maintenance/123",
          UserRole.Admin
        );
        expect(result).toEqual({ path: true, role: true });
      });

      it("debería permitir acceso a Employee con cualquier ID", () => {
        const result = isRoleAllowed(
          "/management/vehicles/maintenance/456",
          UserRole.Employee
        );
        expect(result).toEqual({ path: true, role: true });
      });

      it("no debería permitir acceso a Customer con cualquier ID", () => {
        const result = isRoleAllowed(
          "/management/vehicles/maintenance/789",
          UserRole.Customer
        );
        expect(result).toEqual({ path: true, role: false });
      });
    });
  });

  describe("Manejo de roles", () => {
    it("debería manejar rol undefined", () => {
      const result = isRoleAllowed("/management/vehicles");
      expect(result).toEqual({ path: true, role: false });
    });

    it("debería manejar roles inválidos", () => {
      const result = isRoleAllowed(
        "/management/vehicles",
        "INVALID_ROLE" as UserRole
      );
      expect(result).toEqual({ path: true, role: false });
    });
  });
});

import { UserRole } from "@/features/users/interfaces/user.interface";
import { isRoleAllowed } from "@/lib/route-permissions";

describe("Role Authorization", () => {
  describe("Basic Route Matching", () => {
    test("should match exact routes", () => {
      const result = isRoleAllowed("/management/vehicles", UserRole.Admin);
      expect(result).toEqual({ path: true, role: true });
    });

    test("should not match non-existent routes", () => {
      const result = isRoleAllowed("/non/existent/route", UserRole.Admin);
      expect(result).toEqual({ path: false, role: false });
    });
  });

  describe("Dynamic Route Parameters", () => {
    test("should match routes with numeric IDs", () => {
      const result = isRoleAllowed(
        "/management/vehicles/edit/123",
        UserRole.Admin
      );
      expect(result).toEqual({ path: true, role: true });
    });

    test("should match routes with string IDs", () => {
      const result = isRoleAllowed(
        "/management/vehicles/edit/abc-123",
        UserRole.Admin
      );
      expect(result).toEqual({ path: true, role: true });
    });

    test("should match maintenance routes with IDs", () => {
      const result = isRoleAllowed(
        "/management/vehicles/maintenance/456",
        UserRole.Employee
      );
      expect(result).toEqual({ path: true, role: true });
    });
  });

  describe("Role-based Access", () => {
    describe("Admin Role", () => {
      test("should allow admin access to vehicle management", () => {
        const result = isRoleAllowed("/management/vehicles", UserRole.Admin);
        expect(result).toEqual({ path: true, role: true });
      });

      test("should allow admin access to vehicle list", () => {
        const result = isRoleAllowed(
          "/management/vehicles/list",
          UserRole.Admin
        );
        expect(result).toEqual({ path: true, role: true });
      });

      test("should allow admin access to vehicle creation", () => {
        const result = isRoleAllowed(
          "/management/vehicles/create",
          UserRole.Admin
        );
        expect(result).toEqual({ path: true, role: true });
      });

      test("should deny admin access to customer routes", () => {
        const result = isRoleAllowed("/reservation", UserRole.Admin);
        expect(result).toEqual({ path: true, role: false });
      });
    });

    describe("Employee Role", () => {
      test("should allow employee access to vehicle management", () => {
        const result = isRoleAllowed("/management/vehicles", UserRole.Employee);
        expect(result).toEqual({ path: true, role: true });
      });

      test("should allow employee access to vehicle editing", () => {
        const result = isRoleAllowed(
          "/management/vehicles/edit/123",
          UserRole.Employee
        );
        expect(result).toEqual({ path: true, role: true });
      });

      test("should deny employee access to customer routes", () => {
        const result = isRoleAllowed("/reservation", UserRole.Employee);
        expect(result).toEqual({ path: true, role: false });
      });
    });

    describe("Customer Role", () => {
      test("should allow customer access to reservation", () => {
        const result = isRoleAllowed("/reservation", UserRole.Customer);
        expect(result).toEqual({ path: true, role: true });
      });

      test("should deny customer access to vehicle management", () => {
        const result = isRoleAllowed("/management/vehicles", UserRole.Customer);
        expect(result).toEqual({ path: true, role: false });
      });

      test("should deny customer access to vehicle creation", () => {
        const result = isRoleAllowed(
          "/management/vehicles/create",
          UserRole.Customer
        );
        expect(result).toEqual({ path: true, role: false });
      });
    });
  });

  describe("Edge Cases", () => {
    test("should handle undefined role", () => {
      const result = isRoleAllowed("/management/vehicles");
      expect(result).toEqual({ path: true, role: false });
    });

    test("should handle empty path", () => {
      const result = isRoleAllowed("", UserRole.Admin);
      expect(result).toEqual({ path: false, role: false });
    });

    test("should handle invalid role", () => {
      const result = isRoleAllowed(
        "/management/vehicles",
        "INVALID_ROLE" as UserRole
      );
      expect(result).toEqual({ path: true, role: false });
    });

    test("should handle path with trailing slash", () => {
      const result = isRoleAllowed("/management/vehicles/", UserRole.Admin);
      expect(result).toEqual({ path: true, role: true });
    });

    test("should handle path with multiple slashes", () => {
      const result = isRoleAllowed("/management//vehicles", UserRole.Admin);
      expect(result).toEqual({ path: false, role: false });
    });
  });

  describe("Path Parameter Variations", () => {
    test("should match edit route with complex ID", () => {
      const result = isRoleAllowed(
        "/management/vehicles/edit/user-123-abc",
        UserRole.Admin
      );
      expect(result).toEqual({ path: true, role: true });
    });

    test("should match maintenance route with complex ID", () => {
      const result = isRoleAllowed(
        "/management/vehicles/maintenance/maint-456-def",
        UserRole.Employee
      );
      expect(result).toEqual({ path: true, role: true });
    });

    test("should not match malformed dynamic routes", () => {
      const result = isRoleAllowed(
        "/management/vehicles/edit/",
        UserRole.Admin
      );
      expect(result).toEqual({ path: false, role: false });
    });
  });
});

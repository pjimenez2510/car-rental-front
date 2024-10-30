import { UserRole } from "@/features/users/interfaces/user.interface";
import { routesRedirectAuth } from "@/lib/routes-redirect";

describe("Routes Redirect Authentication", () => {
  describe("Object Structure", () => {
    test("should have all required UserRole keys", () => {
      const expectedRoles = Object.values(UserRole);
      const actualRoles = Object.keys(routesRedirectAuth);

      expect(actualRoles).toHaveLength(expectedRoles.length);
      expectedRoles.forEach((role) => {
        expect(routesRedirectAuth).toHaveProperty(role);
      });
    });

    test("should have string values for all roles", () => {
      Object.values(routesRedirectAuth).forEach((path) => {
        expect(typeof path).toBe("string");
        expect(path.length).toBeGreaterThan(0);
      });
    });
  });

  describe("Admin Role Redirects", () => {
    test("should have correct redirect path for admin", () => {
      expect(routesRedirectAuth[UserRole.Admin]).toBe(
        "/management/vehicles/list"
      );
    });

    test("admin redirect path should start with /management", () => {
      expect(routesRedirectAuth[UserRole.Admin]).toMatch(/^\/management/);
    });

    test("admin redirect path should be a valid URL path", () => {
      expect(routesRedirectAuth[UserRole.Admin]).toMatch(/^\/[\w\/-]+$/);
    });
  });

  describe("Employee Role Redirects", () => {
    test("should have correct redirect path for employee", () => {
      expect(routesRedirectAuth[UserRole.Employee]).toBe(
        "/management/vehicles/list"
      );
    });

    test("employee redirect path should start with /management", () => {
      expect(routesRedirectAuth[UserRole.Employee]).toMatch(/^\/management/);
    });

    test("employee redirect path should be a valid URL path", () => {
      expect(routesRedirectAuth[UserRole.Employee]).toMatch(/^\/[\w\/-]+$/);
    });
  });

  describe("Customer Role Redirects", () => {
    test("should have correct redirect path for customer", () => {
      expect(routesRedirectAuth[UserRole.Customer]).toBe("/vehicles");
    });

    test("customer redirect path should start with /", () => {
      expect(routesRedirectAuth[UserRole.Customer]).toMatch(/^\//);
    });

    test("customer redirect path should be a valid URL path", () => {
      expect(routesRedirectAuth[UserRole.Customer]).toMatch(/^\/[\w\/-]+$/);
    });
  });

  describe("Path Comparisons", () => {
    test("admin and employee should have the same redirect path", () => {
      expect(routesRedirectAuth[UserRole.Admin]).toBe(
        routesRedirectAuth[UserRole.Employee]
      );
    });

    test("customer should have different redirect path from admin/employee", () => {
      expect(routesRedirectAuth[UserRole.Customer]).not.toBe(
        routesRedirectAuth[UserRole.Admin]
      );
      expect(routesRedirectAuth[UserRole.Customer]).not.toBe(
        routesRedirectAuth[UserRole.Employee]
      );
    });
  });

  describe("Path Format Validation", () => {
    test("all paths should start with forward slash", () => {
      Object.values(routesRedirectAuth).forEach((path) => {
        expect(path).toMatch(/^\//);
      });
    });

    test("no paths should end with forward slash", () => {
      Object.values(routesRedirectAuth).forEach((path) => {
        expect(path).not.toMatch(/\/$/);
      });
    });

    test("all paths should be lowercase", () => {
      Object.values(routesRedirectAuth).forEach((path) => {
        expect(path).toBe(path.toLowerCase());
      });
    });

    test("paths should not contain any spaces", () => {
      Object.values(routesRedirectAuth).forEach((path) => {
        expect(path).not.toMatch(/\s/);
      });
    });
  });

  describe("Type Safety", () => {
    test("should match UserRole type definition", () => {
      type ExpectedType = Record<UserRole, string>;
      const typeCheck: ExpectedType = routesRedirectAuth;
      expect(typeCheck).toBeDefined();
    });
  });
});

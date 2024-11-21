import { UserRole } from "@/features/users/interfaces/user.interface";
import { routesRedirectAuth } from "@/lib/routes-redirect";

describe("Routes Redirect Authentication", () => {
  describe("Validación de rutas por rol", () => {
    it("debería tener rutas correctas para Admin y Employee", () => {
      expect(routesRedirectAuth[UserRole.Admin]).toBe(
        "/management/vehicles/list"
      );
      expect(routesRedirectAuth[UserRole.Employee]).toBe(
        "/management/vehicles/list"
      );
    });

    it("debería tener una ruta diferente para Customer", () => {
      expect(routesRedirectAuth[UserRole.Customer]).toBe("/vehicles");
      expect(routesRedirectAuth[UserRole.Customer]).not.toBe(
        routesRedirectAuth[UserRole.Admin]
      );
    });
  });

  describe("Formato de rutas", () => {
    it("todas las rutas deberían tener formato válido", () => {
      Object.values(routesRedirectAuth).forEach((path) => {
        expect(path).toMatch(/^\/[\w/-]+$/); // Inicia con /, solo contiene caracteres válidos
        expect(path).not.toMatch(/\/$/); // No termina con /
        expect(path).toBe(path.toLowerCase()); // Es lowercase
      });
    });
  });
});

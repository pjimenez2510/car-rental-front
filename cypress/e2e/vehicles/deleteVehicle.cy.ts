describe("Delete Vehicle Flow", () => {
  beforeEach(() => {
    // Ignorar errores de hidratación si los hay
    Cypress.on("uncaught:exception", (err) => {
      if (err.message.includes("Hydration failed")) {
        return false; // Ignorar errores
      }
    });

    // Iniciar sesión como administrador
    cy.visit("/login");
    cy.loginAsAdmin();
  });

  it("should delete a vehicle successfully", () => {
    // Navegar a la lista de vehículos
    cy.visit("/management/vehicles/list");
    cy.wait(5000); // Esperar a que se cargue la página

    cy.fixture("apiUrl").then((apiUrl) => {
      cy.fixture("vehicles").then((vehicleData) => {
        // Interceptar la solicitud DELETE para eliminar un vehículo
        cy.intercept("DELETE", `${apiUrl.apiUrl}/api/v1/vehicles/48`, {
          statusCode: 200,
          body: { message: "Vehículo eliminado correctamente" }, // Respuesta simulada
        }).as("deleteVehicle");
      });

      // Abrir el menú de acciones para el vehículo específico
      cy.get("table tbody tr")
        .first()
        .within(() => {
          cy.get('button[aria-haspopup="menu"]')
            .scrollIntoView() // Asegurar que el botón esté visible
            .should("be.visible")
            .click({ force: true }); // Forzar clic si es necesario
        });

      // Hacer clic en la opción "Eliminar"
      cy.get('div[role="menuitem"]')
        .contains("Eliminar")
        .scrollIntoView()
        .should("be.visible")
        .click({ force: true });

      // Confirmar la acción en el modal
      cy.get("button")
        .contains("Eliminar")
        .scrollIntoView()
        .should("be.visible")
        .click({ force: true });

      // Verificar que la solicitud fue interceptada
      // cy.wait('@deleteVehicle').then(({ response }) => {
      //     if (response) {
      //         expect(response.statusCode).to.eq(200);
      //         expect(response.body.message).to.eq('Vehículo eliminado correctamente');
      //     }
      // });

      // Verificar que el mensaje de éxito se muestra en la interfaz
      cy.contains("Vehículo eliminado correctamente").should("be.visible");

      // Validar que el vehículo fue eliminado de la tabla
      cy.get("table tbody tr").should("have.length.lessThan", 10); // Ajusta el número según los datos iniciales
    });
  });
});

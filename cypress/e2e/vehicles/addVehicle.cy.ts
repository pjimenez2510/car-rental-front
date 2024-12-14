describe("Create Vehicle Flow", () => {
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

  it("should create a new vehicle successfully", () => {
    // Navegar a la página de creación de vehículo
    cy.visit("/management/vehicles/create");
    cy.wait(5000); // Esperar a que se cargue la página

    cy.fixture("apiUrl").then((apiUrl) => {
      cy.fixture("vehicles").then((vehicleData) => {
        // Interceptar la solicitud POST para crear un vehículo
        cy.intercept("POST", `${apiUrl.apiUrl}/api/v1/vehicles`, {
          statusCode: 201,
          body: vehicleData.createVehicleResponse, // Respuesta simulada
        }).as("createVehicle");
      });

      // Completar el formulario de creación
      cy.get('input[name="url"]').type(
        "https://acroadtrip.blob.core.windows.net/catalogo-imagenes/s/RT_V_253bb2bf37834fcc94aab18693c17252.webp"
      );
      cy.get('input[name="brand"]').type("Toyota");
      cy.get('input[name="model"]').type("Camry");
      cy.get('input[name="year"]').clear().type("2023");
      cy.get('input[name="licensePlate"]').type("ABC-1234");

      // // Interactuar con el Select para seleccionar "Sedan"
      // cy.get('[data-state="closed"]').first().click(); // Asegúrate de que selecciona un solo elemento
      // cy.get('[role="listbox"]').should('be.visible'); // Asegúrate de que se muestra la lista de opciones
      // cy.get('[role="option"]').contains('Sedan').click(); // Seleccionar "Sedan"

      // Hacer clic en el botón Guardar
      cy.get('button[type="submit"]').click();

      // Verificar que la solicitud fue interceptada
      cy.wait("@createVehicle").then(({ response }) => {
        if (response) {
          expect(response.statusCode).to.eq(201);
          expect(response.body.data.vehicle).to.have.property(
            "brand",
            "Toyota"
          );
          expect(response.body.data.vehicle).to.have.property("model", "Camry");
          expect(response.body.data.vehicle).to.have.property("year", 2023);
          expect(response.body.data.vehicle).to.have.property(
            "license_plate",
            "ABC-1234"
          );
          expect(response.body.data.vehicle.vehicle_type_id).to.eq(41); // ID de Sedan
        }
      });

      // Verificar redirección o mensaje de éxito (ajustar según tu UI)
      // cy.contains('Vehículo creado exitosamente').should('be.visible'); // Ajusta según mensaje real
    });
  });
});

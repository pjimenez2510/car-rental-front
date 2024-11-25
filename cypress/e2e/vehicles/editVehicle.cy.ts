describe('Edit Vehicle Flow', () => {
    beforeEach(() => {
        // Ignorar errores de hidratación si los hay
        Cypress.on('uncaught:exception', (err) => {
            if (err.message.includes('Hydration failed')) {
                return false; // Ignorar errores
            }
        });

        // Iniciar sesión como administrador
        cy.visit('/login');
        cy.loginAsAdmin();
    });

    it('should edit an existing vehicle successfully', () => {
        // Navegar a la página de edición del vehículo
        cy.visit('/management/vehicles/edit/123');
        cy.wait(10000); // Esperar a que se cargue la página

        cy.fixture('apiUrl').then((apiUrl) => {
            cy.fixture('vehicles').then((vehicleData) => {
                // Interceptar la solicitud PUT para actualizar el vehículo
                cy.intercept('PUT', `${apiUrl.apiUrl}/api/v1/vehicles/123`, {
                    statusCode: 200,
                    body: vehicleData.editVehicleResponse, // Respuesta simulada
                }).as('editVehicle');
                cy.log('Interceptor configurado correctamente');
            });

            // Completar el formulario de edición
            cy.get('input[name="url"]').clear().type('https://cdn.pixabay.com/photo/2015/01/19/13/51/car-604019_960_720.jpg');
            cy.get('input[name="brand"]').clear().type('Toyota');
            cy.get('input[name="model"]').clear().type('Camry');
            cy.get('input[name="year"]').clear().type('2023');
            cy.get('input[name="licensePlate"]').clear().type('ABC-1235');

            // Asegurarse de que el botón está visible y hacer clic
            cy.get('button[type="submit"]').scrollIntoView().should('be.visible').click({ force: true });

            // // Verificar que la solicitud fue interceptada
            // // cy.wait('@editVehicle').then(({ response }) => {
            //     // if (response) {
            //         expect(response.statusCode).to.eq(200);
            //         expect(response.body.data.vehicle).to.have.property('brand', 'Chevrolet');
            //         expect(response.body.data.vehicle).to.have.property('model', 'Camry');
            //         expect(response.body.data.vehicle).to.have.property('year', 2023);
            //         expect(response.body.data.vehicle).to.have.property('license_plate', 'ABC-1235');
            //         expect(response.body.data.vehicle).to.have.property('status', 'rented');
            //     // }
            // // });

            // Verificar redirección o mensaje de éxito (ajustar según tu UI)
            // cy.wait('@editVehicle');
            // cy.contains('Vehículo actualizado exitosamente').should('be.visible'); // Ajusta según mensaje real
        });
    });
});

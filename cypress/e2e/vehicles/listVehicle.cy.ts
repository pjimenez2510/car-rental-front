describe('List Vehicles Flow', () => {
    beforeEach(() => {
        // Ignorar errores de hidratación si los hay
        Cypress.on('uncaught:exception', (err) => {
            if (err.message.includes('Hydration failed')) {
                return false; // Ignorar errores
            }
        });
    });

    it('should log in as admin and verify vehicle list loads correctly', () => {
        // Visitar la página de inicio de sesión
        cy.visit('/login');
        // Usar el comando personalizado para iniciar sesión como administrador
        cy.loginAsAdmin();

        // Interceptar la solicitud para obtener la lista de vehículos
        cy.fixture('apiUrl').then((apiUrl) => {
            cy.fixture('vehicles').then((vehicleData) => {
                cy.intercept('GET', `${apiUrl.apiUrl}/api/v1/vehicles*`, {
                    statusCode: 200,
                    body: vehicleData.listVhicles, // Ajustar al JSON proporcionado
                }).as('listVehicles');
            });
        });

        // Esperar a que la solicitud de vehículos sea interceptada
        cy.wait('@listVehicles').then(({ response }) => {
            // Validar que la respuesta tenga datos
            if (response) {
                expect(response.statusCode).to.eq(200);
                expect(response.body.data.vehicles).to.have.length.greaterThan(0); // Verifica que hay vehículos en la respuesta
            } else {
                throw new Error('Response is undefined');
            }
        });

        // Validar que los vehículos se muestran en la tabla
        cy.get('table tbody tr').should('have.length.greaterThan', 0); // Asegurarse de que hay filas

        // Validar algunas columnas específicas de la tabla (marca, modelo, placa, año, estado)
        cy.get('table tbody tr').first().within(() => {
            cy.get('td').eq(1).should('contain', 'Honda'); // Marca
            cy.get('td').eq(2).should('contain', 'A5'); // Modelo
            cy.get('td').eq(3).should('contain', 'LHS-6262'); // Placa
            cy.get('td').eq(5).should('contain', '2023'); // Año
            cy.get('td').eq(6).should('contain', 'Disponible'); // Estado
        });
    });
});

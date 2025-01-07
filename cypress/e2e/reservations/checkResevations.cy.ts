describe('Reservation Duration Validation', () => {
    beforeEach(() => {
        // Using the custom login command
        Cypress.on("uncaught:exception", (err) => {
            if (err.message.includes("Hydration failed")) {
                return false; // Ignorar errores
            }
        });
        cy.visit("/login");
        cy.loginAsUser();
    });

    it('should check reservations of client', () => {

        cy.visit("/reservations");

        cy.should('have.text', 'Reservas');

        cy.get('table.w-full').should('be.visible');

        // Verificar que el cuerpo de la tabla tenga al menos una fila
        cy.get('table.w-full tbody tr').should('have.length.greaterThan', 0);
    
        // Opcional: Verificar detalles específicos de la primera reservación
        cy.get('table.w-full tbody tr:first').within(() => {
          cy.get('td').eq(0).should('contain', '2025-01-08'); // Fecha de recogida
          cy.get('td').eq(1).should('contain', '2025-01-10'); // Fecha de devolución
          cy.get('td').eq(2).should('contain', 'Pendiente');  // Estado
          cy.get('td').eq(3).should('contain', '168.0');      // Costo
        });

    });

});
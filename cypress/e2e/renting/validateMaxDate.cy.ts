// cypress/e2e/reservation/duration-validation.cy.js

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

    it('should show error message when reservation exceeds 20 days', () => {
        // Select Honda from the brand dropdown
        cy.visit('/vehicles');
        cy.get('[id="brand"]').type('Honda');

        cy.get('[id="date"]').click();

        cy.get('button[name="day"]:not(.rdp-day_selected)')
            .contains('28')
            .should('be.visible')
            .click();

        cy.get('[href="/new-reservation/128"]').click();

        // Click the reserve button
        cy.get('button').contains('Reservar ahora').click();

        // Verify the error message
        cy.contains('Reservation cannot Exceed 20 days')
            .should('be.visible');
    });

    it('should allow reservation within 20 days', () => {
        cy.get('[id="brand"]').type('Honda');

        cy.get('[id="date"]').click();

        cy.get('button[name="day"]')
            .contains('28')
            .first()
            .first()
            .click();

        cy.get('a[href="/vehicles/123"]').click();

        // Click the reserve button
        cy.get('button').contains('Reservar ahora').click();

        // Verify no error message is shown
        cy.contains('Reservation cannot Exceed 20 days')
            .should('not.exist');
    });
});
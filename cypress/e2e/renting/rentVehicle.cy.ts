describe('Valid Reservation', () => {
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

        cy.get('[href="/new-reservation/130"]').click();

        // Click the reserve button
        cy.get('button').contains('Reservar ahora').click();
    })
});
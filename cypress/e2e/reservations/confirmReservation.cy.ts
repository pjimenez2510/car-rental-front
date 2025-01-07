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

    it("should confirm a Reservation by adding card credit method", () => {
        cy.visit("/new-reservation/1");

        cy.get('button').contains('Reservar ahora').click();

        cy.wait(5000);

        cy.get('input[name="cardNumber"]').type('4242424242424242');
        cy.get('input[name="expDate"]').type('12/23');
        cy.get('input[name="cvv"]').type('123');

        cy.get('button').contains('Agregar método de pago').click();

        cy.contains('Reservación exitosa').should('be.visible');
    });

    

});
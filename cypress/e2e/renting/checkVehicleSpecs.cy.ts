describe('Valid Reservation', () => {
    beforeEach(() => {
        Cypress.on("uncaught:exception", (err) => {
            if (err.message.includes("Hydration failed")) {
                return false;
            }
        });
        cy.visit("/login");
        cy.loginAsUser();
    });

    it('Should check the specs from a vehicle', () => {
        cy.visit('/vehicles');

        cy.get('[href="/new-reservation/128"]').click();

        cy.scrollTo('bottom');

        cy.get("button").contains('Características').click();

        cy.wait(2000);

        cy.get("button").contains('Términos').click();

        cy.wait(2000);
    })
});
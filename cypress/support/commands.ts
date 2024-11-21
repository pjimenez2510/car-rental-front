/// <reference types="cypress" />

// Comando para iniciar sesión como usuario
Cypress.Commands.add('loginAsUser', () => {
    cy.fixture('auth').then((auth) => {
        cy.fixture('apiUrl').then((apiUrl) => {
            cy.intercept('POST', `${apiUrl.apiUrl}/api/v1/auth/login`, {
                statusCode: 200,
                body: auth.validCredentialsResponse,
            }).as('loginRequest');

            cy.get('input[name="email"]').type(auth.validCredentials.email);
            cy.get('input[name="password"]').type(auth.validCredentials.password);
            cy.get('button[type="submit"]').click();

            cy.wait(1000);
            cy.wait('@loginRequest').then(() => {
                cy.wait(1000);
                cy.getCookie('authjs.session-token').should('exist'); // Verificar cookie
                cy.url().should('include', '/vehicles'); // Validar redirección
            });
        });
    });
});

// Comando para iniciar sesión como administrador
Cypress.Commands.add('loginAsAdmin', () => {
    cy.fixture('auth').then((auth) => {
        cy.fixture('apiUrl').then((apiUrl) => {
            // cy.intercept('POST', `${apiUrl.apiUrl}/api/v1/auth/login`, {
            //     statusCode: 200,
            //     body: auth.validCredentialsAdminResponse, // Respuesta simulada para admin
            // }).as('loginRequest');

            cy.get('input[name="email"]').type(auth.validCredentialsAdmin.email);
            cy.get('input[name="password"]').type(auth.validCredentialsAdmin.password);
            cy.get('button[type="submit"]').click();
            
            // cy.wait(1000);
            // cy.wait('@loginRequest').then(() => {
            //     // cy.wait(500); // Espera por cualquier animación
            //     // cy.getCookie('authjs.session-token').should('exist'); // Verificar cookie
                cy.url().should('include', '/vehicles'); // Validar redirección
            // });
        });
    });
});

// Declarar los comandos personalizados para TypeScript
export { };

declare global {
    namespace Cypress {
        interface Chainable {
            /**
             * Inicia sesión como usuario
             */
            loginAsUser(): Chainable<void>;

            /**
             * Inicia sesión como administrador
             */
            loginAsAdmin(): Chainable<void>;
        }
    }
}

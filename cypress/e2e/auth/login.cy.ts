describe('template spec', () => {
  beforeEach(() => {
    Cypress.on("uncaught:exception", (err) => {
      if (err.message.includes("Hydration failed")) {
        return false; // Ignorar errores de hidratación
      }
    });

    cy.visit('/login');
  });

  it('should login correctly as a user', () => {
    cy.loginAsUser(); // Usa el comando personalizado para iniciar sesión como usuario
  });

  it('should login correctly as an admin', () => {
    cy.loginAsAdmin(); // Usa el comando personalizado para iniciar sesión como administrador
  });
  
  it('it should show an error message when invalid credentials are used', () => {
    cy.fixture('auth').then((auth) => {
      cy.fixture('apiUrl').then((apiUrl) => {
        // Configurar interceptación de la API con la respuesta de credenciales inválidas
        cy.intercept('POST', `${apiUrl.apiUrl}/api/v1/auth/login`, {
          statusCode: 401,
          body: auth.invalidCredentialsResponse, // Simula la respuesta esperada
        }).as('loginRequest');

        // Completar formulario con datos inválidos
        cy.get('input[name="email"]').type(auth.invalidCredentials.email);
        cy.get('input[name="password"]').type(auth.invalidCredentials.password);
        cy.get('button[type="submit"]').click();

        // Verificar que la solicitud fue interceptada
        cy.wait('@loginRequest').then(() => {
          // Validar que se muestra el mensaje de error
          cy.contains('Invalid email or password.').should('be.visible'); // Valida el mensaje de error
        });

        // Asegurarse de que la URL no cambia
        cy.url().should('include', '/login'); // Debe permanecer en la página de login
      });
    });
  });
});


describe('template spec', () => {
    beforeEach(() => {
        Cypress.on("uncaught:exception", (err) => {
            if (err.message.includes("Hydration failed")) {
                return false; // Ignorar errores de hidratación
            }
        });
        cy.visit('/register');
    });

    it('should register successfully with valid data', () => {
        cy.fixture('auth').then((auth) => {
            cy.fixture('apiUrl').then((apiUrl) => {
                // Mockear la API de registro
                cy.intercept('POST', `${apiUrl.apiUrl}/api/v1/auth/signup`, {
                    statusCode: 200,
                    body: auth.validRegistrationResponse,
                }).as('registerRequest');

                // Completar el formulario con datos válidos
                cy.get('input[name="firstName"]').type(auth.validRegistration.firstName);
                cy.get('input[name="lastName"]').type(auth.validRegistration.lastName);
                cy.get('input[name="username"]').type(auth.validRegistration.username);
                cy.get('input[name="email"]').type(auth.validRegistration.email);
                cy.get('input[name="password"]').type(auth.validRegistration.password);
                cy.get('button[type="submit"]').click();

                // Verificar que la solicitud fue interceptada
                cy.wait(1000);
                cy.wait('@registerRequest');
            });
        });
    });

    it('should show an error when email already exists', () => {
        cy.fixture('auth').then((auth) => {
            cy.fixture('apiUrl').then((apiUrl) => {
                // Mockear la API con error de email existente
                cy.intercept('POST', `${apiUrl.apiUrl}/api/v1/auth/signup`, {
                    statusCode: 409,
                    body: auth.existingEmailResponse,
                }).as('registerRequest');

                // Completar el formulario con un email ya existente
                cy.get('input[name="firstName"]').type(auth.existingEmailRegistration.firstName);
                cy.get('input[name="lastName"]').type(auth.existingEmailRegistration.lastName);
                cy.get('input[name="username"]').type(auth.existingEmailRegistration.username);
                cy.get('input[name="email"]').type(auth.existingEmailRegistration.email);
                cy.get('input[name="password"]').type(auth.existingEmailRegistration.password);
                cy.get('button[type="submit"]').click();

                // Verificar que la solicitud fue interceptada
                cy.wait('@registerRequest');
                cy.contains('Email already exists.').should('be.visible'); // Mensaje de error
            });
        });
    });

    // Caso 1: Validación en el frontend
    it('should show a frontend error when password is too weak', () => {
        cy.fixture('auth').then((auth) => {
            // Completar el formulario con una contraseña de 2 caracteres
            cy.get('input[name="firstName"]').type(auth.weakPasswordRegistration.firstName);
            cy.get('input[name="lastName"]').type(auth.weakPasswordRegistration.lastName);
            cy.get('input[name="username"]').type(auth.weakPasswordRegistration.username);
            cy.get('input[name="email"]').type(auth.weakPasswordRegistration.email);
            cy.get('input[name="password"]').type('12'); // Contraseña demasiado corta

            // Intentar hacer clic en el botón "Registrarse"
            cy.get('button[type="submit"]').click();

            // Validar que el mensaje de error del frontend se muestra
            cy.contains('La contraseña debe tener como mínimo 6 carácteres').should('be.visible');
        });
    });

    // Caso 2: Validación en el backend
    it('should show a backend error for weak passwords', () => {
        cy.fixture('auth').then((auth) => {
            cy.fixture('apiUrl').then((apiUrl) => {
                // Mockear la API con error de contraseña débil
                cy.intercept('POST', `${apiUrl.apiUrl}/api/v1/auth/signup`, {
                    statusCode: 422,
                    body: auth.weakPasswordResponse,
                }).as('registerRequest');

                // Completar el formulario con una contraseña de al menos 6 caracteres
                cy.get('input[name="firstName"]').type(auth.weakPasswordRegistration.firstName);
                cy.get('input[name="lastName"]').type(auth.weakPasswordRegistration.lastName);
                cy.get('input[name="username"]').type(auth.weakPasswordRegistration.username);
                cy.get('input[name="email"]').type(auth.weakPasswordRegistration.email);
                cy.get('input[name="password"]').type('123456'); // Contraseña que pasa la validación de frontend
                cy.get('button[type="submit"]').click();

                // Verificar que la solicitud fue interceptada
                cy.wait('@registerRequest');

                // Validar que el mensaje de error del backend se muestra en la interfaz
                cy.contains('Password es demasiado corto (mínimo 6 caracteres)').should('be.visible');
            });
        });
    });
    
});


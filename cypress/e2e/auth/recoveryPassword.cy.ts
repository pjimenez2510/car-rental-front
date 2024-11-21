describe('Password Recovery', () => {
    beforeEach(() => {
        // Ignorar errores de Next.js relacionados con hidratación
        Cypress.on('uncaught:exception', (err) => {
            if (err.message.includes('Hydration failed')) {
                return false; // Ignorar errores
            }
        });

        cy.visit('/forgot-password'); // Navegar a la página de recuperación
    });

    it('should send recovery email with a valid email', () => {
        cy.fixture('auth').then((auth) => {
            cy.fixture('apiUrl').then((apiUrl) => {
                // Mockear la API para enviar el correo de recuperación
                cy.intercept('POST', `${apiUrl.apiUrl}/api/v1/auth/password`, {
                    statusCode: 200,
                    body: {
                        success: true,
                        message: 'Email sent successfully.',
                    },
                }).as('sendRecoveryEmail');

                // Completar el formulario con un email válido
                cy.get('input[name="email"]').type(auth.validCredentials.email);
                cy.get('button[type="submit"]').click();

                // Verificar que la solicitud fue interceptada y el mensaje de éxito aparece
                cy.wait('@sendRecoveryEmail');
                cy.contains('Email sent successfully.').should('be.visible');
            });
        });
    });

    it('should show an error message with an invalid email', () => {
        cy.fixture('auth').then((auth) => {
            cy.fixture('apiUrl').then((apiUrl) => {
                // Mockear la API para devolver un error
                cy.intercept('POST', `${apiUrl.apiUrl}/api/v1/auth/password`, {
                    statusCode: 400,
                    body: {
                        success: false,
                        message: 'Email not found.',
                    },
                }).as('sendRecoveryEmail');

                // Completar el formulario con un email inválido
                cy.get('input[name="email"]').type(auth.invalidCredentials.email);
                cy.get('button[type="submit"]').click();

                // Verificar que el mensaje de error aparece
                cy.wait('@sendRecoveryEmail');
                cy.contains('Email not found.').should('be.visible');
            });
        });
    });

    it('should reset the password successfully when token is in the URL', () => {
        cy.fixture('apiUrl').then((apiUrl) => {
            cy.fixture('auth').then((auth) => {

                // Mockear la API para cambiar la contraseña
                cy.intercept('PUT', `${apiUrl.apiUrl}/api/v1/auth/password`, (req) => {
                    // Verificar que el cuerpo contiene el token y las contraseñas
                    expect(req.body).to.deep.equal({
                        user: auth.dataRecoveryPassword,
                    });

                    // Simular respuesta de éxito
                    req.reply({
                        statusCode: 200,
                        body: {
                            success: true,
                            message: 'Password reset successfully.',
                        },
                    });
                }).as('resetPassword');

                // Navegar al enlace de restablecimiento con el token en la URL
                cy.visit(`/reset-password?token=${auth.dataRecoveryPassword.reset_password_token}`); // Simula la URL con el token

                // Completar el formulario de nueva contraseña
                cy.get('input[name="password"]').type('newPassword123');
                cy.get('input[name="passwordConfirmation"]').type('newPassword123');
                cy.get('button[type="submit"]').click();

                // Verificar que la solicitud fue interceptada y el mensaje de éxito aparece
                cy.wait('@resetPassword');
                cy.contains('Password reset successfully.').should('be.visible');
            });
        });
    });
});

describe('Login Page', () => {
    it('should login successfully with valid credentials', () => {
        cy.visit('http://localhost:3000/login');

        cy.get('input[name="username"]').type('ahmed');
        cy.get('input[name="password"]').type('pwd');

        cy.contains('Se connecter').click();

        cy.contains('Connexion réussie').should('be.visible');
        cy.url().should('include', '/landingPage');
    });
});

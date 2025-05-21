/// <reference types="cypress" />

describe('Test du processus d\'inscription', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/register');
    });

    it('Devrait afficher la première étape du formulaire d\'inscription', () => {
        cy.get('h4').should('contain', 'Bienvenue sur SportConnect');
        cy.get('.MuiStepLabel-label').contains('Compte').should('exist');

        cy.get('input[name="email"]').should('exist');
        cy.get('input[name="username"]').should('exist');
        cy.get('input[name="password"]').should('exist');
        cy.get('input[name="confirmPassword"]').should('exist');
    });

    it('Devrait afficher des erreurs pour un formulaire incomplet', () => {
        cy.get('button[type="submit"]').click();

        cy.get('input[name="email"]:invalid').should('exist');
        cy.get('input[name="username"]:invalid').should('exist');
        cy.get('input[name="password"]:invalid').should('exist');
        cy.get('input[name="confirmPassword"]:invalid').should('exist');
    });

    it('Devrait afficher une erreur si les mots de passe ne correspondent pas', () => {
        cy.get('input[name="email"]').type('test@example.com');
        cy.get('input[name="username"]').type('testuser');
        cy.get('input[name="password"]').type('Password123!');
        cy.get('input[name="confirmPassword"]').type('Different123!');

        cy.get('button[type="submit"]').click();

        cy.get('.MuiAlert-root').should('contain', 'La confirmation du mot de passe doit être identique au mot de passe');
    });

    it('Devrait afficher un indicateur de force du mot de passe', () => {
        cy.get('input[name="password"]').type('weak');
        cy.contains('Mot de passe faible').should('exist');

        cy.get('input[name="password"]').clear().type('Medium123');
        cy.contains('Mot de passe moyen').should('exist');

        cy.get('input[name="password"]').clear().type('StrongPassword123!');
        cy.contains('Mot de passe fort').should('exist');
    });

    it('Devrait passer à l\'étape 2 avec des informations valides', () => {
        cy.get('input[name="email"]').type('test@example.com');
        cy.get('input[name="username"]').type('testuser');
        cy.get('input[name="password"]').type('Password123!');
        cy.get('input[name="confirmPassword"]').type('Password123!');

        cy.get('button[type="submit"]').click();

        cy.get('h4').should('contain', 'Informations personnelles');
        cy.get('.MuiStepLabel-label').contains('Informations personnelles').should('exist');
    });

    describe('Étape 2 - Informations personnelles', () => {
        beforeEach(() => {
            cy.get('input[name="email"]').type('test@example.com');
            cy.get('input[name="username"]').type('testuser');
            cy.get('input[name="password"]').type('Password123!');
            cy.get('input[name="confirmPassword"]').type('Password123!');
            cy.get('button[type="submit"]').click();

            cy.get('h4').should('contain', 'Informations personnelles');
        });

        it('Devrait afficher le formulaire d\'informations personnelles', () => {
            cy.get('input[name="firstname"]').should('exist');
            cy.get('input[name="familyname"]').should('exist');
            cy.get('input[name="phone"]').should('exist');
            cy.get('input[name="birthdate"]').should('exist');
            cy.get('input[name="address"]').should('exist');
            cy.get('input[name="postal_code"]').should('exist');
            cy.get('input[name="city"]').should('exist');
        });

        it('Devrait permettre de revenir à l\'étape précédente', () => {
            cy.contains('Précédent').click();
            cy.get('h4').should('contain', 'Bienvenue sur SportConnect');
        });

        it('Devrait afficher des erreurs pour un formulaire incomplet', () => {
            cy.get('input[name="firstname"]').type('Jean');
            cy.get('button[type="submit"]').click();

            cy.get('input[name="familyname"]:invalid').should('exist');
            cy.get('input[name="phone"]:invalid').should('exist');
        });

        it('Devrait permettre de soumettre le formulaire complet', () => {
            cy.intercept('POST', '**/register', {
                statusCode: 200,
                body: { success: true }
            }).as('registerRequest');

            cy.get('input[name="firstname"]').type('Jean');
            cy.get('input[name="familyname"]').type('Dupont');
            cy.get('input[name="phone"]').type('0612345678');

            // Saisie manuelle de la date du jour
            const today = new Date().toISOString().split('T')[0]; // format YYYY-MM-DD
            cy.get('input[name="birthdate"]').type(today);

            // Saisie directe de l'adresse sans autocomplétion
            cy.get('input[name="address"]').type('20 avenue de Ségur');
            cy.get('input[name="postal_code"]').type('75007');
            cy.get('input[name="city"]').type('Paris');

            cy.get('input[type="checkbox"]').click({ force: true });

            cy.get('button[type="submit"]').click();

            cy.wait('@registerRequest', { timeout: 10000 })
                .its('response.statusCode').should('eq', 200);

            cy.get('.MuiAlert-root').should('contain', 'Inscription réussie');
        });
    });
});

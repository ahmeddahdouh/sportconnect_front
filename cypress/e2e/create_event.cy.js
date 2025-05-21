// cypress/e2e/create_event.cy.js

describe('Event Creation Page', () => {
    beforeEach(() => {
        // Connexion avant chaque test
        cy.login(); // Utilise la commande personnalisée

        // Mock des réponses API nécessaires
        cy.intercept('GET', '**/sport*', {
            statusCode: 200,
            body: [
                {
                    id: 1,
                    sport_nom: "Football",
                    nbr_joueur_max: 11,
                    isValid: () => true
                },
                {
                    id: 2,
                    sport_nom: "Basketball",
                    nbr_joueur_max: 5,
                    isValid: () => true
                },
                {
                    id: 3,
                    sport_nom: "Tennis",
                    nbr_joueur_max: 2,
                    isValid: () => true
                }
            ]
        }).as('getSports');

        cy.intercept('POST', '**/events', {
            statusCode: 201,
            statusText: "CREATED",
            body: { message: "Event created successfully" }
        }).as('createEvent');

        // Visite de la page de création d'événement
        cy.visit('http://localhost:3000/');
    });

    it('should load the event creation page with all form sections', () => {
        // Vérification du titre de la page
        cy.contains('Créer un événement').should('be.visible');

        // Vérification des trois sections principales
        cy.contains('Informations générales').should('be.visible');
        cy.contains('Date et lieu').should('be.visible');
        cy.contains('Détails de participation').should('be.visible');
    });

    it('should fill general information section', () => {
        // Attente du chargement des sports
        cy.wait('@getSports');

        // Remplissage du titre
        cy.get('#event_name').type('Tournoi de football');

        // Sélection d'un sport
        cy.get('#id_sport').select(1);

        // Remplissage de la description
        cy.get('#description').type('Un tournoi amical de football ouvert à tous les niveaux');

        // Test de l'upload d'image - utiliser stub au lieu de fichier réel
        cy.get('button').contains('Sélectionner un fichier').click();

        // Stubber le fileInput pour simuler une sélection de fichier
        cy.get('input[type="file"]').then(subject => {
            // Créer un objet File de test
            const testFile = new File(['dummy content'], 'event_image.jpg', {type: 'image/jpeg'});
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(testFile);

            // Assigner le fichier à l'élément input
            subject[0].files = dataTransfer.files;
            cy.wrap(subject).trigger('change', { force: true });
        });

        // Vérification de l'affichage de l'aperçu
        cy.contains('Supprimer').should('be.visible');

        // Test du bouton de suppression d'image
        cy.contains('Supprimer').click();
        // Vérifier que l'option de sélection d'image apparaît à nouveau
        cy.contains('Sélectionner un fichier').should('be.visible');
    });

    // Les autres tests restent inchangés...
    it('should fill date and location section', () => {
        // Sélection de la date
        cy.get('.MuiDatePicker-root input').first().click();
        cy.get('.MuiDayCalendar-weekContainer button:not(.Mui-disabled)').first().click();

        // Sélection de l'heure de début
        cy.contains('Heure de début').parent().find('input').click();
        cy.get('.MuiClock-clock .MuiClock-pin').click();
        cy.contains('OK').click();

        // Sélection de l'heure de fin
        cy.contains('Heure de fin').parent().find('input').click();
        cy.get('.MuiClock-clock .MuiClock-pin').click();
        cy.contains('OK').click();

        // Test de la carte (simulé, car difficile à tester directement)
        cy.get('#map-container').should('be.visible');
        // Simuler la sélection d'un lieu sur la carte
        cy.window().then(window => {
            // Simulation d'un événement de sélection de position
            if (window.mapComponent && window.mapComponent.onLocationSelect) {
                window.mapComponent.onLocationSelect({ lat: 48.8566, lng: 2.3522 }, 'Paris, France');
            }
        });
    });

    it('should fill participation details section', () => {
        // Remplissage des nombres de participants
        cy.get('#nombre_utilisateur_min').clear().type('5');
        cy.get('#event_max_utilisateur').clear().type('10');

        // Remplissage des âges min/max
        cy.get('#event_age_min').clear().type('18');
        cy.get('#event_age_max').clear().type('45');

        // Sélection de la date limite d'inscription
        cy.contains('Date Limite d\'inscription').parent().find('input').click();
        cy.get('.MuiDayCalendar-weekContainer button:not(.Mui-disabled)').first().click();

        // Cocher la case événement payant
        cy.get('#is_paid').click();

        // Remplissage du prix (qui devrait être activé maintenant)
        cy.get('#price').should('not.be.disabled').type('15');

        // Remplissage des conditions de participation
        cy.get('#event_commande_participation').type('Certificat médical obligatoire. Équipement sportif requis.');

        // Remplissage des commodités
        cy.get('#commodites').type('Vestiaires disponibles. Parking gratuit sur place. Rafraîchissements offerts.');
    });

    it('should submit the form successfully when all required fields are filled', () => {
        // Attente du chargement des sports
        cy.wait('@getSports');

        // Remplissage du formulaire complet

        // Section 1: Informations générales
        cy.get('#event_name').type('Tournoi de football');
        cy.get('#id_sport').select(1);
        cy.get('#description').type('Un tournoi amical de football ouvert à tous les niveaux');

        // Section 2: Date et lieu
        cy.get('.MuiDatePicker-root input').first().click();
        cy.get('.MuiDayCalendar-weekContainer button:not(.Mui-disabled)').first().click();

        cy.contains('Heure de début').parent().find('input').click();
        cy.get('.MuiClock-clock .MuiClock-pin').click();
        cy.contains('OK').click();

        cy.contains('Heure de fin').parent().find('input').click();
        cy.get('.MuiClock-clock .MuiClock-pin').click();
        cy.contains('OK').click();

        // Simuler la sélection d'un lieu
        cy.window().then(window => {
            if (window.mapComponent && window.mapComponent.onLocationSelect) {
                window.mapComponent.onLocationSelect({ lat: 48.8566, lng: 2.3522 }, 'Paris, France');
            }
        });

        // Section 3: Détails de participation
        cy.get('#nombre_utilisateur_min').clear().type('5');
        cy.get('#event_max_utilisateur').clear().type('10');
        cy.get('#event_age_min').clear().type('18');
        cy.get('#event_age_max').clear().type('45');

        cy.contains('Date Limite d\'inscription').parent().find('input').click();
        cy.get('.MuiDayCalendar-weekContainer button:not(.Mui-disabled)').first().click();

        // Soumission du formulaire
        cy.contains('Créer l\'évenement').click();

        // Vérification de l'appel API
        cy.wait('@createEvent');

        // Vérification du message de succès (SweetAlert2)
        cy.contains('Votre évènement a bien été enregistré').should('be.visible');
    });

    // Autres tests...
});
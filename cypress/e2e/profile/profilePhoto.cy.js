/// <reference types="cypress" />

context('Profile profile photo', () => {
  beforeEach(() => {
    cy.visit('https://date-app-praca-inzynierska.netlify.app');

    if (cy.get('button').contains('Zaloguj się')) {
      cy.fixture('user1.json').then(({ login, password }) => {
        cy.get('input[placeholder*="E-mail"]').type(login);
        cy.get('input[placeholder*="Hasło"]').type(password);

        cy.get('button[type=submit]').click();
      });
    }
  });

  it('should change background photo functionality work correctly', () => {
    cy.get('[data-testid="add-profile-photo"]').attachFile('profilePhoto.jpg');

    cy.contains('Zapisz').click();

    cy.contains('Pomyślnie zaktualizowano zdjęcie profilowe');
  });
});

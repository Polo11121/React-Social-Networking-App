/// <reference types="cypress" />

context('Profile background photo', () => {
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

  it('should change background photo functionality work correctly ', () => {
    cy.get('[data-testid="add-background-photo"]').attachFile(
      'backgroundPhoto.jpg'
    );

    cy.contains('Zapisz').click();

    cy.wait(2000).contains('Pomyślnie zaktualizowano zdjęcie w tle');
  });
});

/// <reference types="cypress" />

context('Profile photos', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/profile');

    if (cy.get('button').contains('Zaloguj się')) {
      cy.fixture('user1.json').then(({ login, password }) => {
        cy.get('input[placeholder*="E-mail"]').type(login);
        cy.get('input[placeholder*="Hasło"]').type(password);

        cy.get('button[type=submit]').click();
      });
    }
  });

  it('should photos profile tab contain 3 sections "Zdjęcia", "Zdjęcie profilowe" and "Zdjęcia w tle"', () => {
    cy.get('[data-testid="photos-link"]').click({ force: true });

    cy.get('h1').contains('Zdjęcia');
    cy.get('h1').contains('Zdjęcia profilowe');
    cy.get('h1').contains('Zdjęcia w tle');
  });
});

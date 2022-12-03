/// <reference types="cypress" />

context('Logout', () => {
  beforeEach(() => {
    cy.visit('https://date-app-praca-inzynierska.netlify.app');
  });

  it('should logout admin functionality work correctly', () => {
    cy.fixture('admin1.json').then(({ login, password }) => {
      cy.get('input[placeholder*="E-mail"]').type(login);
      cy.get('input[placeholder*="Hasło"]').type(password);

      cy.get('button[type=submit]').click();
    });

    cy.get('[data-testid="admin-header-logout-button"]').click();

    cy.contains('Pomyślnie wylogowano');
  });
});

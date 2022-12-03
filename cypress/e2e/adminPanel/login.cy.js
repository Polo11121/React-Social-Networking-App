/// <reference types="cypress" />

context('Login', () => {
  beforeEach(() => {
    cy.visit('https://date-app-praca-inzynierska.netlify.app');
  });

  it('should login admin after submitting with correct values', () => {
    cy.fixture('admin1.json').then(({ login, password }) => {
      cy.get('input[placeholder*="E-mail"]').type(login);
      cy.get('input[placeholder*="Hasło"]').type(password);

      cy.get('button[type=submit]').click();
    });

    cy.get('[data-testid="admin-panel-header"]');
  });
});

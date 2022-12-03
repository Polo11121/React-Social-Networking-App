/// <reference types="cypress" />

context('Navigation ', () => {
  beforeEach(() => {
    cy.visit('https://date-app-praca-inzynierska.netlify.app');

    cy.fixture('admin1.json').then(({ login, password }) => {
      cy.get('input[placeholder*="E-mail"]').type(login);
      cy.get('input[placeholder*="Hasło"]').type(password);

      cy.get('button[type=submit]').click();
    });
  });

  it('should admin panel navigation work correctly', () => {
    cy.get('[data-testid="admin-panel-profile-link"]').click();
    cy.get('[data-testid="admin-panel-profile-header"]').click();

    cy.get('[data-testid="admin-panel-all-reports-link"]').click();
    cy.get('[data-testid="admin-panel-all-reports-header"]').click();

    cy.get('[data-testid="admin-panel-my-reports-link"]').click();
    cy.get('[data-testid="admin-panel-my-reports-header"]').click();

    cy.get('[data-testid="admin-panel-solved-reports-link"]').click();
    cy.get('[data-testid="admin-panel-solved-reports-header"]').click();

    cy.get('[data-testid="admin-panel-users-link"]').click();
    cy.get('[data-testid="admin-panel-users-header"]').click();

    cy.get('[data-testid="admin-panel-administrators-link"]').click();
    cy.get('[data-testid="admin-panel-administrators-header"]').click();
  });
});

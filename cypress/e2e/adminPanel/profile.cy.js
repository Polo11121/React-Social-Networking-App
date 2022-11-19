/// <reference types="cypress" />

context('Navigation ', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');

    cy.fixture('admin1.json').then(({ login, password }) => {
      cy.get('input[placeholder*="E-mail"]').type(login);
      cy.get('input[placeholder*="Hasło"]').type(password);

      cy.get('button[type=submit]').click();
    });
  });

  it('should admin profile and administrators list work correctly', () => {
    cy.get('[data-testid="admin-panel-administrators-link"]').click();
    cy.get(
      '[data-testid="admin-Mariusz-Kowalski-list-item-expand-button"]'
    ).click();
    cy.get('[data-testid="admin-Mariusz-Kowalski-profile-link"]').click();

    cy.get('[data-testid="admin-panel-profile-header"]');

    cy.get('#reports-status-select').type('Wszystkie').type('{enter}');
    cy.get('#reports-status-select').type('W trakcie').type('{enter}');
    cy.get('#reports-status-select').type('Zamknięte').type('{enter}');
  });
});

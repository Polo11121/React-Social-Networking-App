/// <reference types="cypress" />

context('report', () => {
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

  it('should report functionality work correctly', () => {
    cy.get(`[data-testid="users-header-search-input"]`)
      .type('test2 test2')
      .next()
      .click();

    cy.get(`[data-testid="users-header-search-test2-test2-hint"]`).click({
      force: true,
    });

    cy.get(`[data-testid="report-user-button"]`).click();

    cy.get(`[data-testid="report-user-modal"]`);

    cy.get(`[data-testid="submit-delete-user-button"]`).should('be.disabled');

    cy.get('#report-user-reason')
      .type('Prześladowanie lub cyberprzemoc')
      .type('{enter}');

    cy.get(`[data-testid="submit-delete-user-button"]`).should('be.enabled');

    cy.get('textarea[placeholder*="Komentarz"]').type('Testowy komentarz');

    cy.get(`[data-testid="submit-delete-user-button"]`).click();

    cy.contains('Zgłoszono użytkownika test2 test2');
  });
});

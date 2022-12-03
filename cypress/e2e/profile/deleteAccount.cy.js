/// <reference types="cypress" />

context('Profile change password', () => {
  beforeEach(() => {
    cy.visit('https://date-app-praca-inzynierska.netlify.app');

    if (cy.get('button').contains('Zaloguj się')) {
      cy.fixture('user1.json').then(({ login, password }) => {
        cy.get('input[placeholder*="E-mail"]').type(login);
        cy.get('input[placeholder*="Hasło"]').type(password);

        cy.get('button[type=submit]').click();
      });

      cy.get('[data-testid="details-link"]').click({ force: true });
    }
  });

  it('should "Usuń konto" button open modal and "Anuluj" button should hide it', () => {
    cy.get(`[data-testid="details-delete-account-link"]`).click();
    cy.get(`[data-testid="delete-account-button"]`).click();

    cy.get(`[data-testid="delete-account-modal"]`);

    cy.get(`[data-testid="delete-account-modal-cancel-button"]`).click();

    cy.get(`[data-testid="delete-account-modal"]`).should('not.exist');
  });
});

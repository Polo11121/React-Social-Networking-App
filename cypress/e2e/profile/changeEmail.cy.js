/// <reference types="cypress" />

context('Profile change email', () => {
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

  it('should display error after submitting with empty email', () => {
    cy.get(`[data-testid="details-change-email-link"]`).click();
    cy.get(`[data-testid="change-email-submit-button"]`).click();

    cy.contains('Podaj nowy adres e-mail');
  });

  it('should display error after submitting with wrong format email', () => {
    cy.get(`[data-testid="details-change-email-link"]`).click();

    cy.get(`[data-testid="change-email-input"]`).type('test');

    cy.get(`[data-testid="change-email-submit-button"]`).click();

    cy.contains('Nieprawidłowy adres e-mail');
  });

  it('should display modal and logout after submitting with correct email', () => {
    cy.get(`[data-testid="details-change-email-link"]`).click();

    cy.get(`[data-testid="change-email-input"]`).type('test23114124@wp.pl');

    cy.get(`[data-testid="change-email-submit-button"]`).click();

    cy.get(`[data-testid="change-email-modal"]`);

    cy.get(`[data-testid="change-email-logout-button"]`).click();

    cy.contains('Pomyślnie wylogowano');
  });
});

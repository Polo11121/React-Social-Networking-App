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

  it('should display error after submitting with wrong old password', () => {
    cy.get(`[data-testid="details-change-password-link"]`).click();

    cy.get(`[data-testid="change-password-old-password-input"]`).type(
      'testtest1'
    );
    cy.get(`[data-testid="change-password-new-password-input"]`).type(
      'testtest2'
    );
    cy.get(`[data-testid="change-password-confirm-password-input"]`).type(
      'testtest2'
    );

    cy.get(`[data-testid="change-password-submit-button"]`).click();

    cy.contains('Aktualne hasło jest nieprawidłowe');
  });

  it('should display error after submitting with not matching new and confirm password', () => {
    cy.get(`[data-testid="details-change-password-link"]`).click();

    cy.get(`[data-testid="change-password-old-password-input"]`).type(
      'testtest1'
    );
    cy.get(`[data-testid="change-password-new-password-input"]`).type(
      'testtest2'
    );
    cy.get(`[data-testid="change-password-confirm-password-input"]`).type(
      'testtest'
    );

    cy.get(`[data-testid="change-password-submit-button"]`).click();

    cy.contains('Nieprawidłowe powtórzenie hasła');
  });

  it('should display error after submitting with new password same as old password', () => {
    cy.get(`[data-testid="details-change-password-link"]`).click();

    cy.get(`[data-testid="change-password-old-password-input"]`).type(
      'test11121'
    );
    cy.get(`[data-testid="change-password-new-password-input"]`).type(
      'test11121'
    );
    cy.get(`[data-testid="change-password-confirm-password-input"]`).type(
      'test11121'
    );

    cy.get(`[data-testid="change-password-submit-button"]`).click();

    cy.contains('Nowe hasło powinno być inne niż obecnie ustawione');
  });

  it('should change password functionality work correctly', () => {
    cy.get(`[data-testid="details-change-password-link"]`).click();

    cy.get(`[data-testid="change-password-old-password-input"]`).type(
      'test11121'
    );
    cy.get(`[data-testid="change-password-new-password-input"]`).type(
      'test111211'
    );
    cy.get(`[data-testid="change-password-confirm-password-input"]`).type(
      'test111211'
    );

    cy.get(`[data-testid="change-password-submit-button"]`).click();

    cy.contains('Pomyślnie zmieniono hasło');

    cy.get(`[data-testid="change-password-submit-button"]`).click();

    cy.get(`[data-testid="change-password-old-password-input"]`).type(
      'test111211'
    );
    cy.get(`[data-testid="change-password-new-password-input"]`).type(
      'test11121'
    );
    cy.get(`[data-testid="change-password-confirm-password-input"]`).type(
      'test11121'
    );

    cy.get(`[data-testid="change-password-submit-button"]`).click();

    cy.contains('Pomyślnie zmieniono hasło');
  });
});

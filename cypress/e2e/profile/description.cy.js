/// <reference types="cypress" />

context('Profile description', () => {
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

  it('should "Dodaj opis" button display Textarea and "Anuluj" button should hide it', () => {
    cy.get('[data-testid="edit-description-button"]').click();

    cy.get('textarea[placeholder*="Opisz siebie"]');

    cy.get('[data-testid="cancel-description-button"]').click();

    cy.get('textarea[placeholder*="Opisz siebie"]').should('not.exist');
  });

  it('should add description functionality work correctly', () => {
    cy.get('[data-testid="edit-description-button"]').click();

    cy.get('[data-testid="submit-description-button"]').should('be.disabled');

    cy.get('textarea[placeholder*="Opisz siebie"]').type('Test description');

    cy.get('[data-testid="submit-description-button"]').click();

    cy.contains('Test description');
  });

  it('should edit description functionality work correctly', () => {
    cy.get('[data-testid="edit-description-button"]').click();

    cy.get('[data-testid="submit-description-button"]').should('be.disabled');

    cy.get('textarea[placeholder*="Opisz siebie"]').clear();

    cy.get('[data-testid="submit-description-button"]').click();

    cy.contains('Pomyślnie zaktualizowano opis');
  });
});

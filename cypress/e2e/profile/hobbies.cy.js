/// <reference types="cypress" />

context('Profile hobbies', () => {
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

  it('should "Dodaj hobby" button show modal and "Anuluj" button should hide it', () => {
    cy.get('[data-testid="edit-hobby-button"]').click();

    cy.get('[data-testid="hobbies-modal"]');

    cy.get('[data-testid="cancel-hobby-modal-button"]').click();

    cy.get('[data-testid="hobbies-modal"]').should('not.exist');
  });

  it('should add hobby functionality work correctly', () => {
    cy.get('[data-testid="edit-hobby-button"]').click();

    cy.get('[data-testid="submit-hobby-modal-button"]').should('be.disabled');

    cy.fixture('hobbies.json').then((hobby) => {
      hobby.map(({ icon, label }) => {
        if (icon) {
          cy.get('input[placeholder*="Dodaj hobby"]').type(label);

          cy.get('[data-testid="MoreVertIcon"]').click();
          cy.get(`[data-testid="${icon}"]`).click();
          cy.get('[data-testid="AddCircleOutlineIcon"]').click();
        } else {
          cy.get(`[data-testid="hobby-chip-${label}"]`).click();
        }
      });
    });

    cy.get('[data-testid="submit-hobby-modal-button"]').click();

    cy.contains('Pomyślnie zaktualizowano hobby');
  });

  it('should edit hobby functionality work correctly', () => {
    cy.get('[data-testid="edit-hobby-button"]').click();

    cy.get('[data-testid="submit-hobby-modal-button"]').should('be.disabled');

    cy.fixture('hobbies.json').then((hobby) => {
      hobby.map(({ label }) => {
        cy.get(`[data-testid="hobby-chip-${label}"]`).click();
      });
    });

    cy.get('[data-testid="submit-hobby-modal-button"]').click();

    cy.contains('Dodaj hobby');
  });
});

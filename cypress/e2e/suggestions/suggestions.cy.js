/// <reference types="cypress" />

context('Suggestions', () => {
  beforeEach(() => {
    cy.visit('https://date-app-praca-inzynierska.netlify.app');

    if (cy.get('button').contains('Zaloguj się')) {
      cy.fixture('user1.json').then(({ login, password }) => {
        cy.get('input[placeholder*="E-mail"]').type(login);
        cy.get('input[placeholder*="Hasło"]').type(password);

        cy.get('button[type=submit]').click();
      });

      cy.get('[data-testid="header-navigation-suggestions-link"]')
        .eq(0)
        .click();
    }
  });

  it('should display choose profile message at open', () => {
    cy.contains(
      'Wybierz imię i nazwisko osoby, aby wyświetlić podgląd jej profilu.'
    );
  });

  it('should display filters with empty values after clicking "Filtry" button', () => {
    cy.get('[data-testid="open-filters-modal-button"]').click();

    cy.get('[data-testid="filters-modal"]');

    cy.get('#filters-interested-genders-select').should('be.empty');
    cy.get('#filters-interested-age-select').should('be.empty');
    cy.get('#filters-interested-city-select').should('be.empty');
    cy.get('#filters-interested-city-max-distance-select').should('be.empty');
  });

  it('should change filters functionality work correctly', () => {
    cy.get('[data-testid="open-filters-modal-button"]').click();

    cy.get('[data-testid="filters-submit-button"]').should('be.disabled');

    cy.get('#filters-interested-genders-select')
      .type('Kobiety')
      .type('{enter}');

    cy.get('#filters-interested-age-select').type('18-26').type('{enter}');

    cy.get('#filters-interested-city-select')
      .type('Częstochowa')
      .wait(2000)
      .type('{enter}');

    cy.get('#filters-interested-city-max-distance-select')
      .type('0km')
      .type('{enter}');

    cy.get('[data-testid="filters-submit-button"]').click();

    cy.contains('Pomyślnie zmieniono filtry');
    cy.get('[data-testid="suggestion-test4-test4-link');
  });

  it('should display user profile after clicking link in navbar', () => {
    cy.get('[data-testid="suggestion-test4-test4-link').click();

    cy.get('[data-testid="user-test4-test4-profile');
  });

  it('should clear filters functionality work correctly', () => {
    cy.get('[data-testid="open-filters-modal-button"]').click();

    cy.get('[data-testid="filters-submit-button"]').should('be.disabled');

    cy.get('.css-8mmkcg').click({ multiple: true, force: true });
    cy.get('[data-testid="filters-submit-button"]').click({ force: true });

    cy.contains('Pomyślnie zmieniono filtry');
  });
});

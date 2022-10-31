/// <reference types="cypress" />

context('Suggestions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/suggestions');

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
      .type('Mężczyźni')
      .type('{enter}');

    cy.get('#filters-interested-age-select').type('55-64').type('{enter}');

    cy.get('#filters-interested-city-select')
      .type('Wałbrzych')
      .wait(500)
      .type('{enter}');

    cy.get('#filters-interested-city-max-distance-select')
      .type('0')
      .type('{enter}');

    cy.get('[data-testid="filters-submit-button"]').click();

    cy.get('[data-testid="suggestion-test3-test3-link');
  });

  it('should display user profile after clicking link in navbar', () => {
    cy.get('[data-testid="suggestion-test3-test3-link').click();

    cy.get('[data-testid="user-test3-test3-profile');
  });

  it('should clear filters functionality work correctly', () => {
    cy.get('[data-testid="open-filters-modal-button"]').click();

    cy.get('[data-testid="filters-submit-button"]').should('be.disabled');

    cy.get('.css-tj5bde-Svg').click({ multiple: true, force: true });
    cy.get('[data-testid="filters-submit-button"]').click({ force: true });

    cy.contains('Pomyślnie zmieniono filtry');
  });
});

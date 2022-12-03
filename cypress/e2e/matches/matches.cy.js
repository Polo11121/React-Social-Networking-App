/// <reference types="cypress" />

context('Matches', () => {
  beforeEach(() => {
    cy.visit('https://date-app-praca-inzynierska.netlify.app');

    if (cy.get('button').contains('Zaloguj się')) {
      cy.fixture('user1.json').then(({ login, password }) => {
        cy.get('input[placeholder*="E-mail"]').type(login);
        cy.get('input[placeholder*="Hasło"]').type(password);

        cy.get('button[type=submit]').click();
      });

      cy.get('[data-testid="header-navigation-matches-link"]').eq(0).click();
    }
  });

  it('should display all matches at open, and one matched user "test test"', () => {
    cy.get('[data-testid="matches-all-chip"]').should(
      'have.class',
      'matches-filters__chip--checked'
    );

    cy.get('[data-testid="matches-all-chip"]').contains('Wszyscy (1)');
    cy.get('[data-testid="matches-match-chip"]').contains('Dopasowani (1)');

    cy.get('[data-testid="matches-match-chip"]').click();

    cy.get('[data-testid="matches-match-chip"]').should(
      'have.class',
      'matches-filters__chip--checked'
    );

    cy.get('[data-testid="match-test2-test2"]');
  });

  it('should match user name navigate to user profile', () => {
    cy.get('[data-testid="match-test2-test2-link"]').click();

    cy.get('[data-testid="user-test2-test2-profile"]');
  });

  it('should match workflow work correctly', () => {
    cy.get(`[data-testid="users-header-search-input"]`)
      .type('test3 test3')
      .next()
      .click();

    cy.get(`[data-testid="users-header-search-test3-test3-hint"]`).click({
      force: true,
    });

    cy.get(`[data-testid="match-request-button"]`).click();
    cy.get(`[data-testid="match-reject-button"]`).click();
    cy.get(`[data-testid="match-request-button"]`).click();
    cy.get('[data-testid="header-navigation-matches-link"]').eq(0).click();

    cy.get('[data-testid="matches-all-chip"]').contains('Wszyscy (2)');
    cy.get('[data-testid="matches-none-chip"]').contains('Wysłane prośby (1)');

    cy.get('[data-testid="matches-none-chip"]').click();

    cy.get('[data-testid="matches-none-chip"]').should(
      'have.class',
      'matches-filters__chip--checked'
    );

    cy.get('[data-testid="match-test3-test3"]');

    cy.get('[data-testid="user-header-avatar"]').click();
    cy.get('[data-testid="user-header-logout-button"]').click();

    cy.fixture('user3.json').then(({ login, password }) => {
      cy.get('input[placeholder*="E-mail"]').type(login);
      cy.get('input[placeholder*="Hasło"]').type(password);

      cy.get('button[type=submit]').click();
    });

    cy.get('[data-testid="header-navigation-matches-badge"]').contains(1);

    cy.get('[data-testid="header-navigation-matches-link"]').eq(0).click();

    cy.get('[data-testid="header-navigation-matches-badge"]').should(
      'not.exist'
    );

    cy.get('[data-testid="matches-all-chip"]').contains('Wszyscy (1)');
    cy.get('[data-testid="matches-request-chip"]').contains(
      'Otrzymane prośby (1)'
    );

    cy.get('[data-testid="matches-request-chip"]').click();

    cy.get('[data-testid="matches-request-chip"]').should(
      'have.class',
      'matches-filters__chip--checked'
    );

    cy.get('[data-testid="match-test-test"]');

    cy.get(`[data-testid="match-accept-button"]`).click();

    cy.get('[data-testid="matches-match-chip"]').contains('Dopasowani (1)');

    cy.get('[data-testid="matches-match-chip"]').click();

    cy.get('[data-testid="matches-match-chip"]').should(
      'have.class',
      'matches-filters__chip--checked'
    );

    cy.get('[data-testid="match-test-test"]');

    cy.get('[data-testid="user-header-avatar"]').click();
    cy.get('[data-testid="user-header-logout-button"]').click();

    cy.fixture('user1.json').then(({ login, password }) => {
      cy.get('input[placeholder*="E-mail"]').type(login);
      cy.get('input[placeholder*="Hasło"]').type(password);

      cy.get('button[type=submit]').click();
    });

    cy.get('[data-testid="header-navigation-matches-badge"]').contains(1);

    cy.get('[data-testid="header-navigation-matches-link"]').eq(0).click();

    cy.get('[data-testid="header-navigation-matches-badge"]').should(
      'not.exist'
    );

    cy.get('[data-testid="matches-all-chip"]').contains('Wszyscy (2)');
    cy.get('[data-testid="matches-match-chip"]').contains('Dopasowani (2)');

    cy.get('[data-testid="match-test3-test3"]');

    cy.get('[data-testid="matches-search-input"]').type('test3 test3');

    cy.get('[data-testid="match-test2-test2"]').should('not.exist');

    cy.get(`[data-testid="match-reject-button"]`).click();

    cy.get(`[data-testid="reject-match-modal"]`);

    cy.get(`[data-testid="submit-reject-match-button"]`).click();

    cy.get('[data-testid="match-test3-test3"]').should('not.exist');

    cy.get('[data-testid="matches-search-input"]').clear();

    cy.get('[data-testid="matches-all-chip"]').contains('Wszyscy (1)');
    cy.get('[data-testid="matches-match-chip"]').contains('Dopasowani (1)');
  });
});

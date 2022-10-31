/// <reference types="cypress" />

context('Header navigation', () => {
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

  it('should header navigation links work correctly', () => {
    cy.get('[data-testid="header-navigation-swipe-link"]').eq(0).click();
    cy.get('[data-testid="header-navigation-swipe-link"]').should(
      'have.class',
      'header-navigation__link--active'
    );
    cy.location('href').should('contain', '/swipe');

    cy.get('[data-testid="header-navigation-chat-link"]').eq(0).click();
    cy.get('[data-testid="header-navigation-chat-link"]').should(
      'have.class',
      'header-navigation__link--active'
    );
    cy.location('href').should('contain', '/chat');

    cy.get('[data-testid="header-navigation-matches-link"]').eq(0).click();
    cy.get('[data-testid="header-navigation-matches-link"]').should(
      'have.class',
      'header-navigation__link--active'
    );
    cy.location('href').should('contain', '/matches');

    cy.get('[data-testid="header-navigation-suggestions-link"]').eq(0).click();
    cy.get('[data-testid="header-navigation-suggestions-link"]').should(
      'have.class',
      'header-navigation__link--active'
    );
    cy.location('href').should('contain', '/suggestions');

    cy.get('[data-testid="user-header-avatar"]').click();
    cy.get('[data-testid="user-header-profile-button"]').click();

    cy.location('href').should('contain', '/profile');
  });
});

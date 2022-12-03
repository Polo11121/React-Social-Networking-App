/// <reference types="cypress" />

context('Swipe', () => {
  beforeEach(() => {
    cy.visit('https://date-app-praca-inzynierska.netlify.app');

    if (cy.get('button').contains('Zaloguj się')) {
      cy.fixture('user1.json').then(({ login, password }) => {
        cy.get('input[placeholder*="E-mail"]').type(login);
        cy.get('input[placeholder*="Hasło"]').type(password);

        cy.get('button[type=submit]').click();
      });

      cy.get('[data-testid="header-navigation-swipe-link"]').eq(0).click();
    }
  });

  it('should display swipe  message', () => {
    cy.contains('Przesuń żeby uzyskać dopasowanie');
  });

  it('should display three swipe control buttons', () => {
    cy.contains('Przesuń żeby uzyskać dopasowanie');

    cy.get('[data-testid="swipe-left-button"]');
    cy.get('[data-testid="swipe-undo-button"]');
    cy.get('[data-testid="swipe-right-button"]');
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

    cy.get('[data-testid="swipe-card-test4"]');

    cy.get('[data-testid="open-filters-modal-button"]').click();

    cy.get('[data-testid="filters-submit-button"]').should('be.disabled');

    cy.get('.css-8mmkcg').click({ multiple: true, force: true });
    cy.get('[data-testid="filters-submit-button"]').click({
      force: true,
    });

    cy.contains('Pomyślnie zmieniono filtry');
  });
});

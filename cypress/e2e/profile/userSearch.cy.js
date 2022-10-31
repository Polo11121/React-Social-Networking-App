/// <reference types="cypress" />

context('User search', () => {
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

  it('should not find any users', () => {
    cy.get(`[data-testid="users-header-search-input"]`).type('qwertyuiop');

    cy.contains('Brak pasujących wyszukiwań');
  });

  it('should find "test2 test2" users and redirect to profile after clicking', () => {
    cy.get(`[data-testid="users-header-search-input"]`)
      .type('test2 test2')
      .next()
      .click();

    cy.get(`[data-testid="users-header-search-test2-test2-hint"]`).click({
      force: true,
    });
  });
});

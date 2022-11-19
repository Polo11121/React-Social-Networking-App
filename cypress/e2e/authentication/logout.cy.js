/// <reference types="cypress" />

context('Logout', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should logout functionality work correctly ', () => {
    if (cy.get('button').contains('Zaloguj się')) {
      cy.fixture('user1.json').then(({ login, password }) => {
        cy.get('input[placeholder*="E-mail"]').type(login);
        cy.get('input[placeholder*="Hasło"]').type(password);

        cy.get('[data-testid="login-button"]').click();
      });
    }

    cy.get('[data-testid="user-header-avatar"]').click();
    cy.get('[data-testid="user-header-logout-button"]').click();

    cy.contains('Pomyślnie wylogowano');
  });
});

/// <reference types="cypress" />

context('Profile navgation', () => {
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

  it('should profile navigation links work correctly', () => {
    cy.get('[data-testid="photos-link"]').click({ force: true });

    cy.location('href').should('contain', '/photos');

    cy.get('[data-testid="details-link"]').click({ force: true });

    cy.location('href').should('contain', '/details');

    cy.get('[data-testid="posts-link"]').click({ force: true });

    cy.location('href').should('contain', '/posts');
  });
});

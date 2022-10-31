/// <reference types="cypress" />

context('Login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('should display form with two input and submit button', () => {
    cy.get('input[placeholder*="E-mail"]');
    cy.get('input[placeholder*="Hasło"]');
    cy.get('button[type=submit]');
  });

  it('should display error after submitting with empty values', () => {
    cy.get('button[type=submit]').click();

    cy.contains('p', 'Nieprawidłowy adres e-mail');
    cy.contains('p', 'Wpisz hasło');
  });

  it('should display error after submitting with wrong email format', () => {
    cy.get('input[placeholder*="E-mail"]').type('email');
    cy.get('input[placeholder*="Hasło"]').type('maslo');

    cy.get('button[type=submit]').click();

    cy.contains('p', 'Nieprawidłowy adres e-mail');
  });

  it('should display error after submitting with wrong values', () => {
    cy.get('input[placeholder*="E-mail"]').type('testtest@wp.pl');
    cy.get('input[placeholder*="Hasło"]').type('testtest');

    cy.get('button[type=submit]').click();

    cy.contains('p', 'Błędny login lub hasło');
  });

  it('should login user after submitting with correct values', () => {
    cy.fixture('user1.json').then(({ login, password }) => {
      cy.get('input[placeholder*="E-mail"]').type(login);
      cy.get('input[placeholder*="Hasło"]').type(password);

      cy.get('button[type=submit]').click();
    });

    cy.contains('test');
  });
});

/// <reference types="cypress" />
import { v4 as uuid } from 'uuid';

context('SignUp', () => {
  beforeEach(() => {
    cy.visit('https://date-app-praca-inzynierska.netlify.app');

    cy.get('button').contains('Utwórz nowe konto').click();
  });

  it('should display signUp modal', () => {
    cy.contains('h1', 'Zarejestruj się');
  });

  it('should display errors after submitting with empty values', () => {
    cy.contains('button[type=submit]', 'Zarejestruj się').click();

    cy.get('input[placeholder*="Imię"]').focus();
    cy.contains('Wpisz imię');
    cy.get('input[placeholder*="Imię"]').blur();

    cy.get('input[placeholder*="Nazwisko"]').focus();
    cy.contains('Wpisz nazwisko');
    cy.get('input[placeholder*="Nazwisko"]').blur();

    cy.get('.register-modal  input[placeholder*="E-mail"]').focus();
    cy.contains('Nieprawidłowy adres e-mail');
    cy.get('.register-modal  input[placeholder*="E-mail"]').blur();

    cy.get('.register-modal  input[placeholder*="Hasło"]').focus();
    cy.contains('Hasło musi mieć conajmniej 8 znaków');
    cy.get('.register-modal  input[placeholder*="Hasło"]').blur();

    cy.get('input[placeholder*="Powtórz hasło"]').focus();
    cy.contains('Nieprawidłowe hasło');
    cy.get('input[placeholder*="Powtórz hasło"]').blur();
  });

  it('should display error after submitting with wrong email format', () => {
    cy.get('input[placeholder*="Imię"]').type('Michał');
    cy.get('input[placeholder*="Nazwisko"]').type('Jasiński');
    cy.get('.register-modal  input[placeholder*="E-mail"]').type('test');
    cy.get('.register-modal  input[placeholder*="Hasło"]').type('testtesttest');
    cy.get('input[placeholder*="Powtórz hasło"]').type('testtesttest');
    cy.get('input[placeholder*="dd.mm.rrrr"]').type('050220000');

    cy.contains('Mężczyzna').click();
    cy.contains('button[type=submit]', 'Zarejestruj się').click();

    cy.get('.register-modal  input[placeholder*="E-mail"]').focus();

    cy.contains('Nieprawidłowy adres e-mail');
  });

  it('should display error after submitting with different passwords', () => {
    cy.get('input[placeholder*="Imię"]').type('Michał');
    cy.get('input[placeholder*="Nazwisko"]').type('Jasiński');
    cy.get('.register-modal  input[placeholder*="E-mail"]').type('test@wp.pl');
    cy.get('.register-modal  input[placeholder*="Hasło"]').type('testtesttest');
    cy.get('input[placeholder*="Powtórz hasło"]').type('testtesttesttest');
    cy.get('input[placeholder*="dd.mm.rrrr"]').type('050220000');

    cy.contains('Mężczyzna').click();
    cy.contains('button[type=submit]', 'Zarejestruj się').click();

    cy.get('input[placeholder*="Powtórz hasło"]').focus();

    cy.contains('Nieprawidłowe hasło');
  });

  it('should display error after submitting with already used email', () => {
    cy.get('input[placeholder*="Imię"]').type('Michał');
    cy.get('input[placeholder*="Nazwisko"]').type('Jasiński');
    cy.get('.register-modal  input[placeholder*="E-mail"]').type('test1@wp.pl');
    cy.get('.register-modal  input[placeholder*="Hasło"]').type('testtesttest');
    cy.get('input[placeholder*="Powtórz hasło"]').type('testtesttest');
    cy.get('input[placeholder*="dd.mm.rrrr"]').type('050220000');

    cy.contains('Mężczyzna').click();
    cy.contains('button[type=submit]', 'Zarejestruj się').click();

    cy.get('.register-modal  input[placeholder*="E-mail"]').focus();

    cy.contains('Ten adres e-mail jest już używany');

    cy.get('.register-modal  input[placeholder*="E-mail"]').blur();
  });

  it('should display create account after submitting with correct values', () => {
    cy.get('input[placeholder*="Imię"]').type('Michał');
    cy.get('input[placeholder*="Nazwisko"]').type('Jasiński');
    cy.get('.register-modal  input[placeholder*="E-mail"]').type(
      `testtest${uuid()}@wp.pl`
    );
    cy.get('.register-modal  input[placeholder*="Hasło"]').type('testtesttest');
    cy.get('input[placeholder*="Powtórz hasło"]').type('testtesttest');
    cy.get('input[placeholder*="dd.mm.rrrr"]').type('050220000');

    cy.contains('Mężczyzna').click();
    cy.contains('button[type=submit]', 'Zarejestruj się').click();

    cy.contains('Utworzono konto');
  });
});

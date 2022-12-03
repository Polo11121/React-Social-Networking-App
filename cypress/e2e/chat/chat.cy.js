/// <reference types="cypress" />
import { truncateText } from '../../../src/shared/functions';
import { v4 as uuid } from 'uuid';

context('Chat', () => {
  beforeEach(() => {
    cy.visit('https://date-app-praca-inzynierska.netlify.app');

    if (cy.get('button').contains('Zaloguj się')) {
      cy.fixture('user1.json').then(({ login, password }) => {
        cy.get('input[placeholder*="E-mail"]').type(login);
        cy.get('input[placeholder*="Hasło"]').type(password);

        cy.get('button[type=submit]').click();
      });

      cy.get('[data-testid="header-navigation-chat-link"]').eq(0).click();
    }
  });

  it('should display choose chat message', () => {
    cy.contains('Wybierz czat lub rozpocznij nową konwersację.');
  });

  it('should open chat correctly', () => {
    cy.get('[data-testid="user-test2-test2-chat-link"]').click();

    cy.get('[data-testid="user-test2-test2-chat"]');
  });

  it('should user chat header navigate to user profile', () => {
    cy.get('[data-testid="user-test2-test2-chat-link"]').click();
    cy.get('[data-testid="user-test2-test2-chat-profile-link"]').click();

    cy.get('[data-testid="user-test2-test2-profile"]');
  });

  it.only('should send message workflow work correctly', () => {
    cy.get('[data-testid="user-test2-test2-chat-link"]').click();

    const message1 = `Test message ${uuid()}`;

    cy.get('[data-testid="chat-send-message-input"]').type(message1);

    cy.get('[data-testid="add-message-photo"]').attachFile('messagePhoto.jpg');

    cy.get('[data-testid="chat-send-message-button"]').click();

    cy.wait(500)
      .get(`[data-testid="chat-message-${message1}"]`)
      .contains(message1);
    cy.wait(500)
      .get('[data-testid="user-test2-test2-chat-last-message"]')
      .contains(truncateText(36, message1));

    cy.get('[data-testid="user-header-avatar"]').click();
    cy.get('[data-testid="user-header-logout-button"]').click();

    cy.fixture('user2.json').then(({ login, password }) => {
      cy.get('input[placeholder*="E-mail"]').type(login);
      cy.get('input[placeholder*="Hasło"]').type(password);

      cy.get('button[type=submit]').click();
    });

    cy.get('[data-testid="header-navigation-chat-badge"]').contains(1);

    cy.get('[data-testid="header-navigation-chat-link"]').eq(0).click();

    cy.wait(500)
      .get('[data-testid="user-test-test-chat-last-message"]')
      .contains(truncateText(34, message1));

    cy.get('[data-testid="user-test-test-chat-last-message"]').should(
      'have.css',
      'font-weight',
      '700'
    );

    cy.get('[data-testid="user-test-test-chat-link"]').click();

    cy.get('[data-testid="user-test-test-chat-last-message"]').should(
      'not.have.css',
      'font-weight',
      '700'
    );
    cy.get('[data-testid="header-navigation-chat-badge"]').should('not.exist');

    const message2 = `Test message ${uuid()}`;

    cy.get('[data-testid="chat-send-message-input"]').type(message2);

    cy.get('[data-testid="add-message-photo"]').attachFile('messagePhoto.jpg');

    cy.get('[data-testid="chat-send-message-button"]').click();

    cy.wait(500)
      .get(`[data-testid="chat-message-${message2}"]`)
      .contains(message2);

    cy.wait(500)
      .get('[data-testid="user-test-test-chat-last-message"]')
      .contains(truncateText(36, message2));

    cy.get('[data-testid="user-header-avatar"]').click();
    cy.get('[data-testid="user-header-logout-button"]').click();

    cy.fixture('user1.json').then(({ login, password }) => {
      cy.get('input[placeholder*="E-mail"]').type(login);
      cy.get('input[placeholder*="Hasło"]').type(password);

      cy.get('button[type=submit]').click();
    });

    cy.get('[data-testid="header-navigation-chat-badge"]').contains(1);

    cy.get('[data-testid="header-navigation-chat-link"]').eq(0).click();

    cy.get('[data-testid="user-test2-test2-chat-last-message"]')
      .wait(500)
      .contains(truncateText(33, message2));

    cy.get('[data-testid="user-test2-test2-chat-last-message"]').should(
      'have.css',
      'font-weight',
      '700'
    );

    cy.get('[data-testid="user-test2-test2-chat-link"]').click();

    cy.get('[data-testid="user-test2-test2-chat-last-message"]').should(
      'not.have.css',
      'font-weight',
      '700'
    );
    cy.get('[data-testid="header-navigation-chat-badge"]').should('not.exist');
  });
});

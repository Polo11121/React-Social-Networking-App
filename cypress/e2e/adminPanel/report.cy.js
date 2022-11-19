/// <reference types="cypress" />

context('Navigation ', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');

    cy.fixture('admin1.json').then(({ login, password }) => {
      cy.get('input[placeholder*="E-mail"]').type(login);
      cy.get('input[placeholder*="Hasło"]').type(password);

      cy.get('button[type=submit]').click();
    });
  });

  it('should report functionality work correctly', () => {
    cy.get('[data-testid="admin-panel-users-link"]').click();

    cy.get('[data-testid="users-search"]').type('test2 test2');
    cy.get('#users-status-select').type('Aktywne').type('{enter}');

    cy.get('[data-testid="user-test2-test2-list-item-expand-button"]').click();

    cy.get('[data-testid="user-test2-test2-account-status"]').contains(
      'Aktywne'
    );

    cy.get('[data-testid="user-test2-test2-profile-link"]').click();

    cy.get('[data-testid="user-test2-test2-profile"]');

    cy.get(`[data-testid="report-user-button"]`).click();

    cy.get(`[data-testid="report-user-modal"]`);

    cy.get(`[data-testid="submit-delete-user-button"]`).should('be.disabled');

    cy.get('#report-user-reason')
      .type('Prześladowanie lub cyberprzemoc')
      .type('{enter}');

    cy.get(`[data-testid="submit-delete-user-button"]`).should('be.enabled');

    cy.get('textarea[placeholder*="Komentarz"]').type('Testowy komentarz');

    cy.get(`[data-testid="submit-delete-user-button"]`).click();

    cy.contains('Zgłoszono użytkownika test2 test2');

    cy.get('[data-testid="admin-panel-my-reports-link"]').click();

    cy.get(
      `[data-testid="report-list-item-reported-user-test2-test2-expand-button"]`
    )
      .first()
      .click();

    cy.get(
      `[data-testid="report-list-item-reported-user-test2-test2-status"]`
    ).contains('W trakcie');

    cy.get(`[data-testid="unassigned-from-report-button"]`).first().click();

    cy.contains('Porzucono prace nad zgłoszeniem', { exact: false });

    cy.get('[data-testid="admin-panel-new-reports-link"]').click();

    cy.get(
      `[data-testid="report-list-item-reported-user-test2-test2-expand-button"]`
    )
      .first()
      .click();

    cy.get(
      `[data-testid="report-list-item-reported-user-test2-test2-status"]`
    ).contains('Nowe');

    cy.get(`[data-testid="assigned-from-report-button"]`).first().click();

    cy.contains('Przypisano do zgłoszenia', { exact: false });

    cy.get('[data-testid="admin-panel-my-reports-link"]').click();

    cy.get(
      `[data-testid="report-list-item-reported-user-test2-test2-expand-button"]`
    )
      .first()
      .click();

    cy.get(
      `[data-testid="report-list-item-reported-user-test2-test2-status"]`
    ).contains('W trakcie');

    cy.get(`[data-testid="solve-report-button"]`).first().click();

    cy.get(`[data-testid="solve-report-modal"]`);

    cy.get(`[data-testid="submit-solve-report-button"]`).should('be.disabled');

    cy.get('#solve-report-solution')
      .type('Zamknij zgłoszenie i zablokuj użytkownika')
      .type('{enter}');

    cy.get(`[data-testid="submit-solve-report-button"]`).should('be.enabled');

    cy.get('textarea[placeholder*="Komentarz"]').type('Testowy komentarz');

    cy.get(`[data-testid="submit-solve-report-button"]`).click();

    cy.contains('Rozwiązano zgłoszenie', { exact: false });

    cy.get('[data-testid="admin-panel-solved-reports-link"]').click();

    cy.get(
      `[data-testid="report-list-item-reported-user-test2-test2-expand-button"]`
    )
      .first()
      .click();

    cy.get(
      `[data-testid="report-list-item-reported-user-test2-test2-status"]`
    ).contains('Zamknięte');

    cy.get('[data-testid="admin-panel-users-link"]').click();

    cy.get('[data-testid="users-search"]').type('test2 test2');

    cy.get('#users-status-select').type('Zablokowane').type('{enter}');

    cy.get('[data-testid="user-test2-test2-list-item-expand-button"]').click();

    cy.get('[data-testid="user-test2-test2-account-status"]').contains(
      'Zablokowane'
    );

    cy.get('[data-testid="unblock-user-button"]').click();

    cy.get(`[data-testid="unblock-user-modal"]`);

    cy.get(`[data-testid="submit-unblock-user-button"]`).click();

    cy.contains('Pomyślnie odblokowano użytkownika');
  });
});

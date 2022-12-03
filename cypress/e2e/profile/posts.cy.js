/// <reference types="cypress" />

context('Profile posts', () => {
  beforeEach(() => {
    cy.visit('https://date-app-praca-inzynierska.netlify.app');

    if (cy.get('button').contains('Zaloguj się')) {
      cy.fixture('user1.json').then(({ login, password }) => {
        cy.get('input[placeholder*="E-mail"]').type(login);
        cy.get('input[placeholder*="Hasło"]').type(password);

        cy.get('button[type=submit]').click();
      });
    }
  });

  it('should add posts functionality work correctly', () => {
    cy.get('[data-testid="add-post-button"]').should('be.disabled');

    cy.get('textarea[placeholder*="O czym myślisz ?"]').type('Testowy post');

    cy.get('[data-testid="add-post-photo"]').attachFile('postPhoto.png');

    cy.get('[data-testid="add-post-button"]').click();

    cy.wait(500).contains('Pomyślnie dodano post');
  });

  it('should edit posts functionality work correctly', () => {
    cy.get('[data-testid="open-post-menu-button"]').eq(0).click();
    cy.get('[data-testid="edit-post-menu-button"]').click();

    cy.get('[data-testid="submit-edit-post-button"]').should('be.disabled');

    cy.get('textarea[placeholder*="O czym myślisz ?"]')
      .eq(1)
      .clear()
      .type('Zedytowany testowy post');

    cy.get('[data-testid="edit-post-photo"]').attachFile('postPhoto2.jpg');

    cy.get('[data-testid="submit-edit-post-button"]').click();

    cy.wait(500).contains('Pomyślnie zedytowano post');
  });

  it('should "X" button in edit post modal hide modal', () => {
    cy.get('[data-testid="open-post-menu-button"]').eq(0).click();
    cy.get('[data-testid="edit-post-menu-button"]').click();

    cy.get('[data-testid="edit-post-modal"]');

    cy.get('[data-testid="cancel-edit-post-button"]').click();

    cy.get('[data-testid="edit-post-modal"]').should('not.exist');
  });

  it('should delete posts functionality work correctly', () => {
    cy.get('[data-testid="open-post-menu-button"]').eq(1).click();
    cy.get('[data-testid="delete-post-menu-button"]').click();

    cy.get('[data-testid="delete-post-modal"]');

    cy.get('[data-testid="submit-delete-post-button"]').click();

    cy.wait(500).contains('Pomyślnie usunięto post');
  });

  it('should "Anuluj" button in edit post modal hide modal', () => {
    cy.get('[data-testid="open-post-menu-button"]').eq(0).click();
    cy.get('[data-testid="delete-post-menu-button"]').click();

    cy.get('[data-testid="delete-post-modal"]');

    cy.get('[data-testid="cancel-delete-post-button"]').click();

    cy.get('[data-testid="delete-post-modal"]').should('not.exist');
  });
});

/// <reference types="cypress" />

context('Profile details', () => {
  beforeEach(() => {
    cy.visit('https://date-app-praca-inzynierska.netlify.app');

    if (cy.get('button').contains('Zaloguj się')) {
      cy.fixture('user1.json').then(({ login, password }) => {
        cy.get('input[placeholder*="E-mail"]').type(login);
        cy.get('input[placeholder*="Hasło"]').type(password);

        cy.get('button[type=submit]').click();
      });

      cy.get('[data-testid="details-link"]').click({ force: true });
    }
  });

  it('should add, edit and delete details workflow work correctly', () => {
    cy.fixture('details.json').then((overViewDetails) => {
      overViewDetails.map(
        ({ name, editText, addText, type, click, editOnly }) => {
          if (type === 'select') {
            if (editOnly) {
              cy.get(`[data-testid="open-addHoc-${name}-menu-button"]`).click();
              cy.get(`[data-testid="edit-addHoc-${name}-menu-button"]`).click();

              cy.get(`[data-testid="submit-addHoc-${name}-button"]`).should(
                'be.disabled'
              );

              cy.get(`#addHoc-${name}-select`)
                .type(`{home}${addText}`)
                .wait(2000)
                .type('{enter}');

              cy.get(`[data-testid="submit-addHoc-${name}-button"]`).click();

              cy.contains('Pomyślnie zaktualizowano profil');
            } else {
              cy.get(`[data-testid="add-addHoc-${name}-button"]`).click();

              cy.get(`[data-testid="submit-addHoc-${name}-button"]`).should(
                'be.disabled'
              );

              cy.get(`#addHoc-${name}-select`)
                .type(addText)
                .wait(2000)
                .type('{enter}');

              cy.get(`[data-testid="submit-addHoc-${name}-button"]`).click();

              cy.contains('Pomyślnie zaktualizowano profil');
            }

            cy.get(`[data-testid="open-addHoc-${name}-menu-button"]`).click();
            cy.get(`[data-testid="edit-addHoc-${name}-menu-button"]`).click();

            cy.get(`[data-testid="submit-addHoc-${name}-button"]`).should(
              'be.disabled'
            );

            cy.get(`#addHoc-${name}-select`)
              .type(`{home}${editText}`)
              .wait(2000)
              .type('{enter}');

            cy.get(`[data-testid="submit-addHoc-${name}-button"]`).click();

            cy.contains('Pomyślnie zaktualizowano profil');

            if (!editOnly) {
              cy.get(`[data-testid="open-addHoc-${name}-menu-button"]`).click();
              cy.get(
                `[data-testid="delete-addHoc-${name}-menu-button"]`
              ).click();

              cy.contains('Pomyślnie zaktualizowano profil');

              cy.get(`[data-testid="add-addHoc-${name}-button"]`).click();

              cy.get(`#addHoc-${name}-select`);

              cy.get(`[data-testid="cancel-addHoc-${name}-button"]`)
                .wait(2000)
                .click();

              cy.get(`[data-testid="add-addHoc-${name}-button"]`);
            }
          } else {
            if (editOnly) {
              cy.get(`[data-testid="open-addHoc-${name}-menu-button"]`).click();
              cy.get(`[data-testid="edit-addHoc-${name}-menu-button"]`).click();

              cy.get(`[data-testid="submit-addHoc-${name}-button"]`).should(
                'be.disabled'
              );

              cy.get(`[data-testid="addHoc-${name}-input"]`)
                .clear()
                .type(addText);

              cy.get(`[data-testid="submit-addHoc-${name}-button"]`).click();

              cy.contains('Pomyślnie zaktualizowano profil');
            } else {
              cy.get(`[data-testid="add-addHoc-${name}-button"]`).click();

              cy.get(`[data-testid="submit-addHoc-${name}-button"]`).should(
                'be.disabled'
              );

              cy.get(`[data-testid="addHoc-${name}-input"]`).type(addText);

              cy.get(`[data-testid="submit-addHoc-${name}-button"]`).click();

              cy.contains('Pomyślnie zaktualizowano profil');
            }

            cy.get(`[data-testid="open-addHoc-${name}-menu-button"]`).click();
            cy.get(`[data-testid="edit-addHoc-${name}-menu-button"]`).click();

            cy.get(`[data-testid="submit-addHoc-${name}-button"]`).should(
              'be.disabled'
            );

            cy.get(`[data-testid="addHoc-${name}-input"]`)
              .clear()
              .type(editText);

            cy.get(`[data-testid="submit-addHoc-${name}-button"]`).click();

            cy.contains('Pomyślnie zaktualizowano profil');

            if (!editOnly) {
              cy.get(`[data-testid="open-addHoc-${name}-menu-button"]`).click();
              cy.get(
                `[data-testid="delete-addHoc-${name}-menu-button"]`
              ).click();

              cy.contains('Pomyślnie zaktualizowano profil');

              cy.get(`[data-testid="add-addHoc-${name}-button"]`).click();

              cy.get(`[data-testid="addHoc-${name}-input"]`);

              cy.get(`[data-testid="cancel-addHoc-${name}-button"]`)
                .wait(2000)
                .click();

              cy.get(`[data-testid="add-addHoc-${name}-button"]`);
            }
          }

          if (click) {
            cy.get(`[data-testid="${click}"]`).click();
          }
        }
      );
    });
  });
});

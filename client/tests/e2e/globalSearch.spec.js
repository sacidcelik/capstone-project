/* eslint-disable no-undef */

/// <reference types='Cypress' />

const testId = (id) => `[data-testid="${id}"]`;
const SEARCH_RESULT = testId('search-result');
const SEARCH_BAR = testId('search-bar');
const ADD_REMOVE_BUTTON = testId('add-and-remove-button');

function clickAddButton() {
  cy.visit('/home');
  cy.get(SEARCH_BAR).type('Weisen');
  cy.get(ADD_REMOVE_BUTTON).first().contains('Add').click();
}

describe('Search for books', () => {
  it('Returns no search results for terms with two or fewer characters', () => {
    cy.visit('/home');
    cy.get(SEARCH_BAR).type('We');
    cy.get(SEARCH_RESULT).should('have.length', 0);
  });
  it('Returns Search Results', () => {
    cy.visit('/home');
    cy.get(SEARCH_BAR).type('Weisen');
    cy.get(SEARCH_RESULT).should('have.length', 25).should('contain', 'Weisen');
  });
});

describe('Add Button Toggle', () => {
  it('Changes the color and text when clicking on Add', () => {
    clickAddButton();
    cy.get(ADD_REMOVE_BUTTON)
      .first()
      .should('contain', 'Remove')
      .should('have.css', 'background-color', 'rgb(204, 28, 28)');
  });
  it('Reverts to green and containing Add when clicking Remove', () => {
    clickAddButton();
    cy.get(ADD_REMOVE_BUTTON)
      .first()
      .contains('Remove')
      .click()
      .should('contain', 'Add')
      .should('have.css', 'background-color', 'rgb(56, 124, 109)');
  });
});

/* eslint-disable no-undef */

/// <reference types='Cypress' />

const testId = (id) => `[data-testid="${id}"]`;
const SEARCH_BAR = testId('search-bar');
const ADD_REMOVE_BUTTON = testId('add-and-remove-button');
const LIBRARY_BOOK = testId('library-book');

function clickAddButton() {
  cy.visit('/home');
  cy.get(SEARCH_BAR).type('Die Furcht des Weisen / Band 1');
  cy.get(ADD_REMOVE_BUTTON).first().contains('Add').click();
}

function checkForBook() {
  cy.get('[href="/mybooks"]').click();
  cy.get(LIBRARY_BOOK).should('contain', 'Weisen');
}

describe('Display added Books', () => {
  it('shows added books on /mybooks page', () => {
    clickAddButton();
    checkForBook();
  });
  it('removes book from /mybooks when clicking remove', () => {
    clickAddButton();
    checkForBook();
    cy.get('[href="/home"]').click();
    cy.get(SEARCH_BAR).type('Die Furcht des Weisen / Band 1');
    cy.get(ADD_REMOVE_BUTTON).first().contains('Remove').click();
    cy.get('[href="/mybooks"]').click();
    cy.get(LIBRARY_BOOK).should('not.exist');
  });
});
